import pdb
from collections import OrderedDict
from config import Config, TestCase
from generate_sql_data import generate_json_main


class TestInsertRecord(TestCase):
    insert_route_mapping = OrderedDict({
        'insert_1': 'demo_character',
        'insert_2': 'life_style',
        'insert_3': 'health_statu',
        'insert_4': 'moca',
        'insert_5': 'mmse',
        'insert_6': 'gdscale',
        'insert_7': 'npiq',
        'insert_8': 'adl'
    })
    
    def test_anonymous_insert(self):
        """未登录无法插入记录"""
        self.assertFalse(self.is_login())

        self.generate_test_data(1)
        data = generate_json_main(2)[1]
        id_card = list(data.keys())[0]
        record = data[id_card][0]

        for route_name, table_name in self.insert_route_mapping.items():
            url = Config.get_route(route_name)
            response = self.client_session.post(url, record[table_name])
            self.assertTrue(response.status_code == 200)
            self.assertTrue(response.text == '')

    def test_insert(self):
        """插入记录"""
        cursor = self.db.cursor()
        cursor.execute('INSERT INTO `doctor`(`weixin_id`) VALUES("2");')
        self.db.commit()
        cursor.execute('SELECT COUNT(*) FROM `doctor_subject`;')
        self.assertTrue(cursor.fetchone()[0] == 0)

        self.login()

        data = generate_json_main(2)[1]
        id_card = list(data.keys())[0]
        record = data[id_card][0]
        pdb.set_trace()

        demo_character_id = None
        for route_name, table_name in self.insert_route_mapping.items():
            client_record = record[table_name]
            url = Config.get_route(route_name)
            if table_name != 'demo_character':
                url = url + '?subject_id={}'.format(demo_character_id)
            else:
                client_record['id_card'] = id_card
            response = self.client_session.post(url, client_record)
            self.assertTrue(response.status_code == 200)
            self.assertTrue(response.json().get('code', 0) == 1)

            keys = ', '.join([f'`{k}`' for k in client_record.keys()])

            if table_name == 'demo_character':
                response_data = response.json().get('data')
                self.assertTrue(response_data is not None)
                cursor.execute('SELECT COUNT(*) FROM `doctor_subject`;')
                self.assertTrue(cursor.fetchone()[0] == 1)
                cursor.execute('SELECT `id`, `id_card`, {} FROM `demo_character`;'.format(keys))
                sql_record = cursor.fetchone()
                demo_character_id = sql_record[0]
                self.assertTrue(id_card == sql_record[1])
                self.assertTrue(response_data.get('subject_id') == demo_character_id)
                for i, k in enumerate(keys):
                    self.assertTrue(client_record[k] == sql_record[i + 2])
            else:
                cursor.execute('SELECT `subject_id`, {} FROM `{}`;'.format(keys, teble_name))
                sql_record = cursor.fetchone()
                self.assertTrue(demo_character_id == sql_record[0])
                for i, k in enumerate(keys):
                    self.assertTrue(client_record[k] == sql_record[i + 1])
        cursor.close()
