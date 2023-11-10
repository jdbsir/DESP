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
        data = generate_json_main(2)['1']
        id_card = list(data.keys())[0]
        record = data[id_card][0]

        for route_name, table_name in self.insert_route_mapping.items():
            url = Config.get_route(route_name)
            response = self.client_session.post(url, record[table_name])
            self.assertTrue(response.status_code == 200)
            self.assertFalse(response.json.get('code', 0) == 1)

    def test_insert(self):
        """插入记录"""
        cursor = self.db.cursor()
        cursor.execute('INSERT INTO `doctor`(`weixin_id`) VALUES(?);', ('2', ))
        self.db.commit()
        self.assertTrue(cursor.execute('SELECT COUNT(*) FROM `doctor_subject`;').fetchonoe()[0] == 0)

        self.login()

        data = generate_json_main(2)['1']
        id_card = list(data.keys())[0]
        record = data[id_card][0]

        demo_character_id = None
        unix_timestamp = None
        for route_name, table_name in self.insert_route_mapping.items():
            client_record = record[table_name]
            url = Config.get_route(route_name) + '?subject_id={}&unix_timestamp={}'.format(demo_character_id, unix_timestamp)
            response = self.client_session.post(url, client_record)
            self.assertTrue(response.status_code == 200)
            self.assertTrue(response.json.get('code', 0) == 1)

            keys = ', '.join([f'`{k}`' for k in client_record.keys()])

            if table_name == 'demo_character':
                response_data = response.json.get('data')
                self.assertTrue(response_data is not None)
                self.assertTrue(cursor.execute('SELECT COUNT(*) FROM `doctor_subject`;').fetchone()[0] == 1)
                sql_record = cursor.execute(
                    'SELECT `id`, `id_card`, `unix_timestamp`, {} FROM `demo_character`;'.format(keys)
                ).fetchone()
                demo_character_id = sql_record[0]
                self.assertTrue(id_card == sql_record[1])
                unix_timestamp = sql_record[2]
                self.assertTrue(response_data.get('subject_id') == demo_character_id)
                self.assertTrue(response_data.get('unix_timestamp') == unix_timestamp)
                for i, k in enumerate(keys):
                    self.assertTrue(client_record[k] == sql_record[i + 3])
            else:
                sql_record = cursor.execute(
                    'SELECT `subject_id`, `unix_timestamp`, {} FROM `{}`;'.format(keys, teble_name)
                ).fetchone()
                self.assertTrue(demo_character_id == sql_record[0])
                self.assertTrue(unix_timestamp == sql_record[1])
                for i, k in enumerate(keys):
                    self.assertTrue(client_record[k] == sql_record[i + 2])

        cursor.close()
