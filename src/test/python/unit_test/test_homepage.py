import pdb
import pymysql
from config import Config, TestCase


class TestHomepage(TestCase):

    def test_new_doctor_login(self):
        """新医生登录"""
        cursor = self.db.cursor()
        cursor.execute('SELECT COUNT(*) FROM `doctor`;')
        self.assertTrue(cursor.fetchone()[0] == 0)

        self.login()
        self.assertTrue(self.is_login())
        self.db.commit()

        cursor.execute('SELECT COUNT(*) FROM `doctor`;')
        self.assertTrue(cursor.fetchone()[0] == 1)
        cursor.close()

    def test_anonymous_query(self):
        """未登录状态下无法查询"""
        self.assertFalse(self.is_login())

    def test_query_history_record(self):
        """查询历史记录"""
        self.login()

        data = self.generate_test_data(3)[2]

        url = Config.get_route('query_history_record')
        response = self.client_session.get(url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(response.json().get('code', 0) == 1)

        client_data = response.json().get('data')
        self.assertTrue(client_data is not None)
        self.assertTrue(client_data.get('subject-number') == len(data))
        self.assertTrue(client_data.get('record-number') == sum([len(v) for v in data.values()]))
        client_history_record = client_data.get('doctorAndSubjects')
        self.assertTrue(client_history_record is not None)
        self.assertTrue(client_data.get('subject-number') == len(client_history_record))
        self.assertTrue(
            client_data.get('record-number') == sum([len(v['dem_character_for_index_list']) for v in client_history_record])
        )
        id_card_set1 = set(data.keys())
        id_card_set2 = set([v['id_card'] for v in client_history_record])
        self.assertTrue(id_card_set1 == id_card_set2)

    def test_anonymous_search(self):
        """未登录状态下无法搜索"""
        self.assertFalse(self.is_login())

        data = self.generate_test_data(3)[2]

        url = Config.get_route('search') + '?id_card=45'
        response = self.client_session.get(url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(response.text == '')

    def test_search(self):
        """搜索"""
        self.login()

        data = self.generate_test_data(3)[2]
        search_keyword = '19'
        filter_id_card = list(filter(lambda k: search_keyword in k, data.keys()))

        url = Config.get_route('search') + '?id_card={}'.format(search_keyword)
        response = self.client_session.get(url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(response.json().get('code', 0) == 1)
        client_data = response.json().get('data')
        self.assertTrue(client_data is not None)
        self.assertTrue(client_data.get('subject-number') == len(filter_id_card))
        self.assertTrue(client_data.get('record-number') == sum([len(data[k]) for k in filter_id_card]))
        client_history_record = client_data.get('doctorAndSubjects')
        self.assertTrue(client_history_record is not None)
        self.assertTrue(client_data.get('subject-number') == len(client_history_record))
        self.assertTrue(
            client_data.get('record-number') == sum([len(v['dem_character_for_index_list']) for v in client_history_record])
        )
        id_card_set1 = set(filter_id_card)
        id_card_set2 = set([v['id_card'] for v in client_history_record])
        self.assertTrue(id_card_set1 == id_card_set2)
