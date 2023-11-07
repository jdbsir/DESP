import os
import json
import random
from datetime import datetime
from time import time as get_timestamp

# 路径相关的全局变量
root_path = os.path.dirname(os.path.realpath(__file__))
result_save_path = os.path.abspath(os.path.join(root_path, 'generate_result'))

# 生成字段相关的全局变量
A_ASCII = ord('A')
a_ASCII = ord('a')
address_list = None
optional_race_list = ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族']
race_list = None
optional_live_type_list = ['独居', '只与配偶同住', '与配偶、子女同住', '与亲戚同住', '其他']
occupation_list = [
    '机关、企事业负责人',
    '专业技术人员',
    '办事人员和有关人员',
    '商业、服务业人员',
    '农、林、牧、渔水利生产人员',
    '生产、运输设备操作及有关人员',
    '军人',
    '无业'
]
optional_incom_list = ['退休金', '儿女供给', '劳动所得', '社会救助', '其他']


# 生成字段的函数 [start]========================================================


def generate_id_card(exists=None):
    if exists is None:
        exists = []

    while True:
        char_list = ['45']
        for i in range(4):
           char_list.append(str(random.randint(0, 9)))
        random_birth_timestamp = random.randint(0, int(get_timestamp()))
        random_birth = datetime.fromtimestamp(random_birth_timestamp).strftime('%Y%m%d')
        char_list.append(random_birth)
        for i in range(4):
            char_list.append(str(random.randint(0, 9)))
        id_card = ''.join(char_list)
        if id_card not in exists:
            return id_card


def generate_name():
    word_list = []
    for i in range(random.randint(1, 3)):
        char_list = [chr(A_ASCII + random.randint(0, 25))]
        for j in range(random.randint(2, 6)):
            char_list.append(chr(a_ASCII + random.randint(0, 25)))
        word_list.append(''.join(char_list))
    return ' '.join(word_list)


def generate_gender():
    random.choice(['man', 'woman'])


def generate_born_date():
    random_birth_timestamp = random.randint(0, int(get_timestamp()))
    return datetime.fromtimestamp(random_birth_timestamp).strftime('%Y-%m')


def generate_demo_character_phone():
    char_list = ['1']
    for i in range(10):
        char_list.append(str(random.randint(0, 9)))
    return ''.join(char_list)


def generate_home_phone():
    return generate_demo_character_phone()


def generate_address():
    global address_list

    # 获取中国所有地级市列表
    if address_list is None:
        address_list_path = os.path.join(root_path, 'address_list.json')
        with open(address_list_path, 'r', encoding='UTF-8') as file:
            file_content = file.read()
            file.close()
        address_list = json.loads(file_content)

    return random.choice(address_list)


def generate_race():
    global race_list

    # 获取中国所有民族列表
    if race_list is None:
        race_list_path = os.path.join(root_path, 'race_list.json')
        with open(race_list_path, 'r', encoding='UTF-8') as file:
            file_content = file.read()
            file.close()
        race_list = json.loads(file_content)

    # 匹配字段
    race = random.choice(race_list)
    race_other = ''
    if race not in optional_race_list:
        race_other = race
        race = '其他'
    return race, race_other


def generate_fluency():
    return random.randint(0, 2)


def generate_area_type():
    return random.randint(0, 2)


def generate_live_type():
    live_type = random.choice(optional_live_type_list)
    live_type_other = ''
    if live_type == '其他':
        live_type_other = '宿舍'
    return live_type, live_type_other


def generate_education():
    return random.randint(0, 5)


def generate_marital():
    return random.randint(0, 3)


def generate_retire():
    return random.randint(0, 1)


def generate_occupation():
    return random.choice(occupation_list)


def generate_income():
    income = random.choice(optional_incom_list)
    income_other = ''
    if income == '其他':
        income_other = '亲戚供给'
    return income, income_other


def generate_income_level():
    return random.randint(0, 6)


def generate_medical_insurance():
    return ''.join([str(random.randint(0, 1)) for i in range(6)])


def generate_height():
    return random.randint(140, 200)


def generate_weight():
    return random.randint(50, 150)


def generate_systolic_pressure():
    return random.randint(90, 139)


def generate_diastolic_pressure():
    return random.randint(60, 89)


def generate_sleep():
    return random.randint(0, 2)


def generate_sleep_time_day():
    return random.randint(0, 3)


def generate_diet():
    return ''.join([str(random.randint(0, 1)) for i in range(5)])


def generate_food_extra():
    return ''.join([str(random.randint(0, 1)) for i in range(5)])


def generate_food_extra_other():
    return random.choice(['' '海鲜'])


def generate_fresh_food():
    return random.randint(0, 2)


def generate_preserved_food():
    return random.randint(0, 1)


def generate_nutrient():
    return random.randint(0, 1)


def generate_smoke():
    smoke = random.randint(0, 1)
    smoke_rate = 0
    smoke_year = ''
    smoke_day = ''
    if smoke == 1:
        smoke_rate = random.randint(0, 2)
        smoke_year = random.randint(1, 40)
        smoke_day = random.randint(1, 6)
    return smoke, smoke_rate, smoke_year, smoke_day


def generate_alcohol_abuse():
    alcohol_abuse = random.randint(0, 1)
    alcohol_abuse_rate = 0
    alcohol_type = '000'
    alcohol_type_other = ''
    alcohol_day = ''
    if alcohol_abuse == 1:
        alcohol_abuse_rate = random.randint(0, 2)
        alcohol_type = ''.join([str(random.randint(0, 1)) for i in range(3)])
        alcohol_type_other = random.choice(['', '鸡尾酒'])
        alcohol_day = random.randint(10, 500)
    return alcohol_abuse, alcohol_abuse_rate, alcohol_type, alcohol_type_other, alcohol_day


def generate_drink_tea():
    drink_tea = random.randint(0, 1)
    drink_tea_rate = 0
    drink_tea_day = ''
    if drink_tea == 1:
        drink_tea_rate = random.randint(0, 2)
        drink_tea_day = random.randint(1, 10)
    return drink_tea, drink_tea_rate, drink_tea_day


def generate_oiltea():
    oiltea = random.randint(0, 1)
    oiltea_rate = 0
    oiltea_day = ''
    if oiltea == 1:
        oiltea_rate = random.randint(0, 2)
        oiltea_day = random.randint(1, 5)
    return oiltea, oiltea_rate, oiltea_day


def generate_read():
    read = random.randint(0, 1)
    read_rate = 0
    if read == 1:
        read_rate = random.randint(0, 2)
    return read, read_rate


def generate_watch_tv():
    watch_tv = random.randint(0, 1)
    watch_tv_rate = 0
    if watch_tv == 1:
        watch_tv_rate = random.randint(0, 2)
    return watch_tv, watch_tv_rate


def generate_radio():
    radio = random.randint(0, 1)
    radio_rate = 0
    if radio == 1:
        radio_rate = random.randint(0, 2)
    return radio, radio_rate


def generate_use_smartphone():
    use_smartphone = random.randint(0, 1)
    use_smartphone_rate = 0
    if use_smartphone == 1:
        use_smartphone_rate = random.randint(0, 2)
    return use_smartphone, use_smartphone_rate


def generate_life_style_housework():
    housework = random.randint(0, 1)
    housework_rate = 0
    if housework == 1:
        housework_rate = random.randint(0, 2)
    return housework, housework_rate


def generate_exercise():
    exercise = random.randint(0, 1)
    exercise_rate = 0
    exercise_type = '000000'
    exercise_type_other = ''
    if exercise == 1:
        exercise_rate = random.randint(0, 2)
        exercise_type = ''.join([str(random.randint(0, 1)) for i in range(6)])
        exercise_type_other = random.choice(['', '瑜伽', '八段锦', '跳绳'])
    return exercise, exercise_rate, exercise_type, exercise_type_other


def generate_hobby():
    return ''.join([str(random.randint(0, 1)) for i in range(4)])


def generate_hobby_other():
    return random.choice(['', '电子游戏', '茶艺', '国画'])


def generate_recreational_activities():
    return ''.join([str(random.randint(0, 1)) for i in range(4)])


def generate_recreational_activities_other():
    return random.choice(['', '故事会'])


def generate_social():
    return ''.join([str(random.randint(0, 1)) for i in range(4)])


def generate_social_other():
    return random.choice(['', '故事会'])


def generate_personal_relationship():
    return random.randint(0, 2)


def generate_family_his():
    return random.randint(0, 1)


def generate_visual():
    return ''.join([str(random.randint(0, 1)) for i in range(4)])


def generate_hearing():
    return ''.join([str(random.randint(0, 1)) for i in range(4)])


def generate_chronic_disease():
    return random.randint(0, 1)


def generate_vascular_his():
    return ''.join([str(random.randint(0, 1)) for i in range(6)])


def generate_vascular_his_other():
    return random.choice(['', '脑膜炎'])


def generate_other_disease():
    return ''.join([str(random.randint(0, 1)) for i in range(8)])


def generate_other_disease_other():
    return random.choice(['', '血栓'])


def generate_mental_performance():
    return ''.join([str(random.randint(0, 1)) for i in range(3)])


def generate_mental_performance_other():
    return random.choice(['', '自闭'])


def generate_TRAILS():
    return random.randint(0, 1)


def generate_CUBE():
    return random.randint(0, 1)


def generate_CLOCKCON():
    return random.randint(0, 1)


def generate_CLOCKNO():
    return random.randint(0, 1)


def generate_CLOCKHAN():
    return random.randint(0, 1)


def generate_LION():
    return random.randint(0, 1)


def generate_RHINO():
    return random.randint(0, 1)


def generate_CAMEL():
    return random.randint(0, 1)


def generate_IMMT1W1():
    return random.randint(0, 1)


def generate_IMMT1W2():
    return random.randint(0, 1)


def generate_IMMT1W3():
    return random.randint(0, 1)


def generate_IMMT1W4():
    return random.randint(0, 1)


def generate_IMMT1W5():
    return random.randint(0, 1)


def generate_IMMT2W1():
    return random.randint(0, 1)


def generate_IMMT2W2():
    return random.randint(0, 1)


def generate_IMMT2W3():
    return random.randint(0, 1)


def generate_IMMT2W4():
    return random.randint(0, 1)


def generate_IMMT2W5():
    return random.randint(0, 1)


def generate_DIGFOR():
    return random.randint(0, 1)


def generate_DIGBACK():
    return random.randint(0, 1)


def generate_LETTERS():
    return random.randint(0, 1)


def generate_SERIAL1():
    return random.randint(0, 1)


def generate_SERIAL2():
    return random.randint(0, 1)


def generate_SERIAL3():
    return random.randint(0, 1)


def generate_SERIAL4():
    return random.randint(0, 1)


def generate_SERIAL5():
    return random.randint(0, 1)


def generate_REPEAT1():
    return random.randint(0, 1)


def generate_REPEAT2():
    return random.randint(0, 1)


def generate_FFLUENCY():
    return random.randint(0, 1)


def generate_ABSTRAN():
    return random.randint(0, 1)


def generate_ABSMEAS():
    return random.randint(0, 1)


def generate_DELW1():
    return random.randint(0, 1)


def generate_DELW2():
    return random.randint(0, 1)


def generate_DELW3():
    return random.randint(0, 1)


def generate_DELW4():
    return random.randint(0, 1)


def generate_DELW5():
    return random.randint(0, 1)


def generate_DATE():
    return random.randint(0, 1)


def generate_MONTH():
    return random.randint(0, 1)


def generate_YEAR():
    return random.randint(0, 1)


def generate_DAY():
    return random.randint(0, 1)


def generate_PLACE():
    return random.randint(0, 1)


def generate_CITY():
    return random.randint(0, 1)


def generate_MMYEAR():
    return random.randint(0, 1)


def generate_MMMONTH():
    return random.randint(0, 1)


def generate_MMDATE():
    return random.randint(0, 1)


def generate_MMDAY():
    return random.randint(0, 1)


def generate_MMSEASON():
    return random.randint(0, 1)


def generate_MMAREA():
    return random.randint(0, 1)


def generate_MMSTATE():
    return random.randint(0, 1)


def generate_MMCITY():
    return random.randint(0, 1)


def generate_MMHOSPIT():
    return random.randint(0, 1)


def generate_MMFLOOR():
    return random.randint(0, 1)


def generate_garden():
    return random.randint(0, 1)


def generate_refrigerator():
    return random.randint(0, 1)


def generate_flag():
    return random.randint(0, 1)


def generate_MMDLTR():
    return random.randint(0, 1)


def generate_MMLLTR():
    return random.randint(0, 1)


def generate_MMRLTR():
    return random.randint(0, 1)


def generate_MMOLTR():
    return random.randint(0, 1)


def generate_MMWLTR():
    return random.randint(0, 1)


def generate_garden2():
    return random.randint(0, 1)


def generate_refrigerator2():
    return random.randint(0, 1)


def generate_flag2():
    return random.randint(0, 1)


def generate_MMWATCH():
    return random.randint(0, 1)


def generate_MMPENCIL():
    return random.randint(0, 1)


def generate_MMREPEAT():
    return random.randint(0, 1)


def generate_MMHAND():
    return random.randint(0, 1)


def generate_MMFOLD():
    return random.randint(0, 1)


def generate_MMONFLR():
    return random.randint(0, 1)


def generate_MMCLEYE():
    return random.randint(0, 1)


def generate_MMWRITE():
    return random.randint(0, 1)


def generate_MMDRAW():
    return random.randint(0, 1)


def generate_GDSATIS():
    return random.randint(0, 1)


def generate_GDDROP():
    return random.randint(0, 1)


def generate_GDEMPTY():
    return random.randint(0, 1)


def generate_GDBORED():
    return random.randint(0, 1)


def generate_GDSPIRIT():
    return random.randint(0, 1)


def generate_GDMIND():
    return random.randint(0, 1)


def generate_GDENERGY():
    return random.randint(0, 1)


def generate_GDAFRAID():
    return random.randint(0, 1)


def generate_GDHAPPY():
    return random.randint(0, 1)


def generate_GDHELP():
    return random.randint(0, 1)


def generate_GDFIDGET():
    return random.randint(0, 1)


def generate_GDHOME():
    return random.randint(0, 1)


def generate_GDFUTURE():
    return random.randint(0, 1)


def generate_GDMEMORY():
    return random.randint(0, 1)


def generate_GDALIVE():
    return random.randint(0, 1)


def generate_GDDEPRESSED():
    return random.randint(0, 1)


def generate_GDMEANINGLESS():
    return random.randint(0, 1)


def generate_GDWORRY():
    return random.randint(0, 1)


def generate_GDEXCITING():
    return random.randint(0, 1)


def generate_GDNEWJOB():
    return random.randint(0, 1)


def generate_GDVITALITY():
    return random.randint(0, 1)


def generate_GDHOPE():
    return random.randint(0, 1)


def generate_GDBETTER():
    return random.randint(0, 1)


def generate_GDSAD():
    return random.randint(0, 1)


def generate_GDCRYING():
    return random.randint(0, 1)


def generate_GDCONCENTRATE():
    return random.randint(0, 1)


def generate_GDMORNING():
    return random.randint(0, 1)


def generate_GDPARTY():
    return random.randint(0, 1)


def generate_GDDECISION():
    return random.randint(0, 1)


def generate_GDCLEAR():
    return random.randint(0, 1)


def generate_NPIA():
    NPIA = random.randint(0, 1)
    NPIASEV = 0
    if NPIA == 1:
        NPIASEV = random.randint(0, 2)
    return NPIA, NPIASEV


def generate_NPIB():
    NPIB = random.randint(0, 1)
    NPIBSEV = 0
    if NPIB == 1:
        NPIBSEV = random.randint(0, 2)
    return NPIB, NPIBSEV


def generate_NPIC():
    NPIC = random.randint(0, 1)
    NPICSEV = 0
    if NPIC == 1:
        NPICSEV = random.randint(0, 2)
    return NPIC, NPICSEV


def generate_NPID():
    NPID = random.randint(0, 1)
    NPIDSEV = 0
    if NPID == 1:
        NPIDSEV = random.randint(0, 2)
    return NPID, NPIDSEV


def generate_NPIE():
    NPIE = random.randint(0, 1)
    NPIESEV = 0
    if NPIE == 1:
        NPIESEV = random.randint(0, 2)
    return NPIE, NPIESEV


def generate_NPIF():
    NPIF = random.randint(0, 1)
    NPIFSEV = 0
    if NPIF == 1:
        NPIFSEV = random.randint(0, 2)
    return NPIF, NPIFSEV


def generate_NPIG():
    NPIG = random.randint(0, 1)
    NPIGSEV = 0
    if NPIG == 1:
        NPIGSEV = random.randint(0, 2)
    return NPIG, NPIGSEV


def generate_NPIH():
    NPIH = random.randint(0, 1)
    NPIHSEV = 0
    if NPIH == 1:
        NPIHSEV = random.randint(0, 2)
    return NPIH, NPIHSEV


def generate_NPII():
    NPII = random.randint(0, 1)
    NPIISEV = 0
    if NPII == 1:
        NPIISEV = random.randint(0, 2)
    return NPII, NPIISEV


def generate_NPIJ():
    NPIJ = random.randint(0, 1)
    NPIJSEV = 0
    if NPIJ == 1:
        NPIJSEV = random.randint(0, 2)
    return NPIJ, NPIJSEV


def generate_NPIK():
    NPIK = random.randint(0, 1)
    NPIKSEV = 0
    if NPIK == 1:
        NPIKSEV = random.randint(0, 2)
    return NPIK, NPIKSEV


def generate_NPIL():
    NPIL = random.randint(0, 1)
    NPILSEV = 0
    if NPIL == 1:
        NPILSEV = random.randint(0, 2)
    return NPIL, NPILSEV


def generate_vehicles():
    return random.randint(0, 3)


def generate_walk():
    return random.randint(0, 3)


def generate_cook():
    return random.randint(0, 3)


def generate_adl_housework():
    return random.randint(0, 3)


def generate_medicine():
    return random.randint(0, 3)


def generate_eat():
    return random.randint(0, 3)


def generate_dress():
    return random.randint(0, 3)


def generate_hair():
    return random.randint(0, 3)


def generate_laundry():
    return random.randint(0, 3)


def generate_shower():
    return random.randint(0, 3)


def generate_shopping():
    return random.randint(0, 3)


def generate_bathroom():
    return random.randint(0, 3)


def generate_adl_phone():
    return random.randint(0, 3)


def generate_money():
    return random.randint(0, 3)


# 生成字段的函数 [end]==========================================================


# 生成表json的函数 [start]======================================================


def generate_demo_character():
    pass


def generate_json_main(doctor_number=4):
    data = {}
    exists_id_card = []
    for doctor_id in range(doctor_number):
        # 生成医生，只需填入id
        subject_dict = {}
        data[doctor_id] = subject_dict

        # 生成此医生录入的病人个数
        if doctor_id < 2:
            subject_number = doctor_id
        else:
            subject_number = random.randint(2, 15)

        # 生成每个病人的数据
        for subject_id in range(subject_number):
            # 生成此病人的唯一标识符（身份证号）
            subject_id_card = generate_id_card(exists_id_card)
            exists_id_card.append(subject_id_card)
            record_list = []
            subject_dict[subject_id_card] = record_list

            # 生成此病人拥有的记录条数
            record_number = random.randint(1, 4)

            # 生成每一条记录
            for record_index in range(record_number):
                record_list.append({
                    'demo_character': {},
                    'life_style': {},
                    'health_statu': {},
                    'moca': {},
                    'mmse': {},
                    'gdscale': {},
                    'npiq': {},
                    'adl': {}
                })

    # 保存生成的json数据
    json_data = json.dumps(data, indent=4, ensure_ascii=False)
    save_path = os.path.abspath(os.path.join(result_save_path, 'result.json'))
    with open(save_path, 'w', encoding='UTF-8') as file:
        file.write(json_data)
        file.close()

    return data


# 生成表json的函数 [end]========================================================


if __name__ == '__main__':
    """
    doctor
    doctor_subject
    demo_character
    life_style
    health_statu
    moca
    mmse
    gdscale
    npiq
    adl
    """

    # 检查是否有函数名冲突
    import re
    from collections import Counter
    with open('./test.py', 'r', encoding='UTF-8') as file:
        file_content = file.read()
        file.close()
    funcname_list = re.findall('\ndef (.+?)\(', file_content)
    counter = Counter(funcname_list)
    for funcname, count in counter.items():
        if count > 1:
            raise Exception('函数定义名称冲突：{}。定义次数：{}'.format(funcname, count))

    # 测试
    generate_json_main()
