import pdb
from config import Config, TestCase


class TestHistoryRecord(TestCase):
    route_name_list = {
        'query_demo_character',
        'query_life_style',
        'query_health_statu',
        'query_moca',
        'query_mmse',
        'query_gdscale',
        'query_npiq',
        'query_adl'
    }

    def test_anonymous(self):
        """未登录无法查看记录"""
        self.assertFalse(self.is_login())

        data = self.generate_test_data(3)[2]
        id_card = list(data.keys())[0]
        record = data[id_card][0]

        cursor = self.db.cursor()
        cursor.execute('SELECT `id` FROM `demo_character` WHERE `id_card`="{}" LIMIT 1;'.format(id_card))
        record_id = cursor.fetchone()[0]
        cursor.close()

        for route_name in self.route_name_list:
            url = Config.get_route(route_name) + '?id={}'.format(record_id)
            response = self.client_session.get(url)
            self.assertTrue(response.status_code == 200)
            self.assertTrue(response.text == '')

    def test_doctor(self):
        """查询每个表的具体数据"""
        self.login()

        data = self.generate_test_data(3)[2]
        id_card = list(data.keys())[0]
        record = data[id_card][0]

        cursor = self.db.cursor()
        cursor.execute('SELECT `id` FROM `demo_character` WHERE `id_card`="{}" LIMIT 1;'.format(id_card))
        record_id = cursor.fetchone()[0]
        cursor.close()

        for route_name in self.route_name_list:
            if table_name not in ['demo_character', 'npiq']:
                pdb.set_trace()
            query_string_name = 'id' if route_name == 'demo_character' else 'subject_id'
            url = Config.get_route(route_name) + '?{}={}'.format(query_string_name, record_id)
            response = self.client_session.get(url)
            self.assertTrue(response.status_code == 200)
            self.assertTrue(response.json().get('code', 0) == 1)

            client_data = response.json().get('data')
            self.assertTrue(client_data is not None)
            table_name = route_name[6:]

            if table_name == 'demo_character':
                client_data = client_data[0]
            elif table_name == 'npiq':
                client_data = {k.upper():v for k, v in client_data.items()}
            for k, v in record[table_name].items():
                self.assertTrue(client_data.get(k) == v)
