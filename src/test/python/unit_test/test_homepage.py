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

        data = self.generate_test_data(2)['1']

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
        for 
