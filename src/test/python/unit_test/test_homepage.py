from config import TestCase


class TestHomepage(TestCase):

    def add_new_doctor(self, exists_openid=None):
        """添加一个新医生"""
        if exists_openid is None:
            exists_openid = []

        # 生成openid
        openid = ''
        while openid in exists_openid:
            openid = ''
        return openid
