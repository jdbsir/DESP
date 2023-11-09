from config import Config, TestCase


class TestHomepage(TestCase):

    def test_new_doctor_login(self):
        """新医生登录"""
        cursor = self.db.cursor()
        self.assertTrue(cursor.execute('SELECT COUNT(*) FROM `doctor`;').fetchone()[0] == 0)

        self.login()
        self.assertTrue(self.is_login())

        self.assertTrue(cursor.execute('SELECT COUNT(*) FROM `doctor`;').fetchone()[0] == 1)
        cursor.close()

    def test_anonymous_query(self):
        """未登录状态下无法查询"""
        self.assertFalse(self.is_login())

    def test_query_history_record(self):
        """查询历史记录"""
        self.login()

        data = self.generate_test_data(3)['2']

        url = Config.get_route('query_history_record')
        response = self.client_session.get(url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(response.json.get('code', 0) == 1)

        client_data = response.json.get('data')
        self.assertTrue(client_data is not None)
        self.assertTrue(client_data.get('subject_number') == len(data))
        self.assertTrue(client_data.get('record_number') == sum([len(v) for v in data.values()]))
        client_history_record = client_data.get('history_record')
        self.assertTrue(client_history_record is not None)
        self.assertTrue(client_data.get('subject_number') == len(client_history_record))
        self.assertTrue(client_data.get('record_number') == sum([len(v) for v in client_history_record.values()]))
        for client_id_card, id_card in zip(client_history_record.keys(), data.keys()):
            self.assertTrue(client_id_card, id_card)

    def test_anonymous_search(self):
        """未登录状态下无法搜索"""
        self.assertFalse(self.is_login())

        data = self.generate_test_data(3)['2']

        url = Config.get_route('search') + '?search_subject_id=45'
        response = self.client_session.get(url)
        self.assertTrue(response.status_code == 200)
        self.assertFalse(response.json.get('code', 0) == 1)

    def test_search(self):
        """搜索"""
        self.login()

        data = self.generate_test_data(3)['2']
        search_subject_id = '45'
        filter_id_card = list(filter(lambda k: search_subject_id in k, data.keys()))

        url = Config.get_route('search') + '?search_subject_id={}'.format(search_subject_id)
        response = self.client_session.get(url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(response.json.get('code', 0) == 1)
        # TODO
