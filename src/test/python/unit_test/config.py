import os
import unittest
import pymysql
import requests


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
        'index': '/index.html'
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

    def add_new_doctor(self, exists_openid=None):
        """添加一个新医生"""
        if exists_openid is None:
            exists_openid = []

        # 生成openid
        optional_chars = ascii_letters + digits
        openid = ''
        while True:
            openid = ''.join([random.choice(optional_chars) for i in range(28)])
            if openid not in exists_openid:
                break

        # 插入一条新医生记录
        cursor = self.db.cursor()
        cursor.execute('INSERT INTO `doctor`(`weixin_id`) VALUES(?);', (openid, ))
        self.db.commit()
        cursor.close()
