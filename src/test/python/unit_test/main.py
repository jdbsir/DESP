import unittest
from test_homepage import TestHomepage
from test_history_record import TestHistoryRecord
from test_insert_record import TestInsertRecord


if __name__ == '__main__':
    # 运行所有单元测试
    """
    tests = unittest.TestLoader().discover('.', pattern='test_homepage.py')
    unittest.TextTestRunner(verbosity=2).run(tests)
    """

    # 运行单个单元测试
    suite = unittest.TestSuite()
    suite.addTest(TestInsertRecord('test_insert'))
    runner = unittest.TextTestRunner()
    runner.run(suite)
