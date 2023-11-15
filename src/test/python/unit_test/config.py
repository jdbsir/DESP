import os
import pdb
import unittest
import pymysql
import requests
from generate_sql_data import generate_json_main, generate_sql_main


class Config(object):
    SERVER_HOST = os.environ['SERVER_HOST']
    SERVER_PORT = os.environ['SERVER_PORT']
    SERVER_DATABASE_HOST = os.environ['SERVER_DATABASE_HOST']
    SERVER_DATABASE_PORT = int(os.environ['SERVER_DATABASE_PORT'])
    SERVER_DATABASE_USERNAME = os.environ['SERVER_DATABASE_USERNAME']
    SERVER_DATABASE_PASSWORD = os.environ['SERVER_DATABASE_PASSWORD']
    SERVER_DATABASE_NAME = os.environ['SERVER_DATABASE_NAME']
    TABLE_NAME_LIST = ['doctor', 'doctor_subject', 'demo_character', 'life_style',
                       'health_statu', 'moca', 'mmse', 'gdscale', 'npiq', 'adl']
    ROUTE_MAPPING = {
        'index': '/index.html',
        'login': '/weixin',
        'query_history_record': '/query_history_record',
        'search': '/queryAllRecordOfDoctorByObscure',
        'query_demo_character': '/query_demo_character',
        'query_life_style': '/query_life_style',
        'query_health_statu': '/query_health_statu',
        'query_moca': '/query_moca',
        'query_mmse': '/query_mmse',
        'query_gdscale': '/query_gdscale',
        'query_npiq': '/query_npiq',
        'query_adl': '/query_adl',
        'insert_1': '/collect_table_1',
        'insert_2': '/collect_table_2',
        'insert_3': '/collect_table_3',
        'insert_4': '/collect_table_4',
        'insert_5': '/collect_table_5',
        'insert_6': '/collect_table_6',
        'insert_7': '/collect_table_7',
        'insert_8': '/collect_table_8'
    }

    @staticmethod
    def get_route(name):
        route = Config.ROUTE_MAPPING[name]
        url = 'http://{}:{}{}'.format(Config.SERVER_HOST, Config.SERVER_PORT, route)
        return url


class TestCase(unittest.TestCase):

    def setUp(self):
        # 建立会话
        self.client_session = requests.session()

        # 检查应用是否已启动
        response = self.client_session.get(Config.get_route('index'))
        self.assertTrue(response.status_code == 200)

        # 连接数据库，并删除所有相关表的记录
        self.db = pymysql.connect(
            host=Config.SERVER_DATABASE_HOST,
            port=Config.SERVER_DATABASE_PORT,
            user=Config.SERVER_DATABASE_USERNAME,
            password=Config.SERVER_DATABASE_PASSWORD,
            database=Config.SERVER_DATABASE_NAME
        )
        self.delete_table_data()

    def tearDown(self):
        # 删除所有相关表的记录，然后关闭数据库连接
        self.delete_table_data()
        self.db.close()

    def delete_table_data(self, table_name_list=None):
        if table_name_list is None:
            table_name_list = Config.TABLE_NAME_LIST

        cursor = self.db.cursor()
        for table_name in table_name_list:
            cursor.execute('DELETE FROM `{}`;'.format(table_name))
        self.db.commit()
        cursor.close()

    def generate_test_data(self, doctor_number=4):
        json_data = generate_json_main(doctor_number)
        sql_list = generate_sql_main(json_data)
        cursor = self.db.cursor()
        for sql in sql_list:
            cursor.execute(sql)
        self.db.commit()
        cursor.close()
        return json_data
    
    def login(self):
        url = Config.get_route('login') + '?code=123456&state=STATE'
        response = self.client_session.get(url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(response.json().get('code', 0) == 1)

    def is_login(self):
        url = Config.get_route('query_history_record')
        response = self.client_session.get(url)
        self.assertTrue(response.status_code == 200)
        try:
            response_json = response.json()
        except requests.exceptions.JSONDecodeError:
            return False
        return response_json.get('code', 0) == 1
