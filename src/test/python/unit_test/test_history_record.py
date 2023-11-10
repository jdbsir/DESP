from config import Config, TestCase


class TestHistoryRecord(TestCase):
    route_name_list = [
        'query_demo_character',
        'query_life_style',
        'query_health_statu',
        'query_moca',
        'query_mmse',
        'query_gdscale',
        'query_npiq',
        'query_adl'
    ]

    def test_anonymous(self):
        """未登录无法查看记录"""
        self.assertFalse(self.is_login())

        data = self.generate_test_data(3)['2']
        id_card = list(data.keys())[0]
        record = data[id_card][0]
        record_id = record['id']

        for route_name in self.route_name_list:
            url = Config.get_route(route_name) + '?id={}'.format(record_id)
            response = self.client_session.get(url)
            self.assertTrue(response.status_code == 200)
            self.assertFalse(response.json.get('code', 0) == 1)

    def test_doctor(self):
        """查询每个表的具体数据"""
        self.login()

        data = self.generate_test_data(3)['2']
        id_card = list(data.keys())[0]
        record = data[id_card][0]
        record_id = record['id']

        for route_name in self.route_name_list:
            url = Config.get_route(route_name) + '?id={}'.format(record_id)
            response = self.client_session.get(url)
            self.assertTrue(response.status_code == 200)
            self.assertTrue(response.json.get('code', 0) == 1)

            client_data = response.json.get('data')
            self.assertTrue(client_data is not None)
            table_name = route_name[6:]
            for k, v in record[table_name].items():
                self.assertTrue(client_data.get(k) == v)
