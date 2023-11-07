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
    return random.choice(['man', 'woman'])


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


def generate_waistline():
    return int(generate_height() / 2 - 11)


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


def generate_read_book():
    read_book = random.randint(0, 1)
    read_rate = 0
    if read_book == 1:
        read_rate = random.randint(0, 2)
    return read_book, read_rate


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


def generate_time():
    current_timestamp = int(get_timestamp() * 1000)
    min_timestamp = current_timestamp - 365 * 24 * 3600 * 1000
    unix_timestamp = random.randint(min_timestamp, current_timestamp)
    time = datetime.fromtimestamp(unix_timestamp / 1000).strftime('%Y-%m-%d %H:%M:%S')
    return time, unix_timestamp


# 生成字段的函数 [end]==========================================================


# 生成表json的函数 [start]======================================================


def generate_demo_character():
    race, race_other = generate_race()
    live_type, live_type_other = generate_live_type()
    income, income_other = generate_income()

    return {
        'name': generate_name(),
        'gender': generate_gender(),
        'born_date': generate_born_date(),
        'phone': generate_demo_character_phone(),
        'home_phone': generate_home_phone(),
        'address': generate_address(),
        'race': race,
        'race_other': race_other,
        'fluency': generate_fluency(),
        'area_type': generate_area_type(),
        'live_type': live_type,
        'live_type_other': live_type_other,
        'education': generate_education(),
        'marital': generate_marital(),
        'retire': generate_retire(),
        'occupation': generate_occupation(),
        'income': income,
        'income_other': income_other,
        'income_level': generate_income_level(),
        'medical_insurance': generate_medical_insurance(),
        'height': generate_height(),
        'weight': generate_weight(),
        'waistline': generate_waistline(),
        'systolic_pressure': generate_systolic_pressure(),
        'diastolic_pressure': generate_diastolic_pressure()
    }


def generate_life_style():
    smoke, smoke_rate, smoke_year, smoke_day = generate_smoke()
    alcohol_abuse, alcohol_abuse_rate, alcohol_type, alcohol_type_other, alcohol_day = generate_alcohol_abuse()
    drink_tea, drink_tea_rate, drink_tea_day = generate_drink_tea()
    oiltea, oiltea_rate, oiltea_day = generate_oiltea()
    read_book, read_rate = generate_read_book()
    watch_tv, watch_tv_rate = generate_watch_tv()
    radio, radio_rate = generate_radio()
    use_smartphone, use_smartphone_rate = generate_use_smartphone()
    housework, housework_rate = generate_life_style_housework()
    exercise, exercise_rate, exercise_type, exercise_type_other = generate_exercise()

    return {
        'sleep': generate_sleep(),
        'sleep_time_day': generate_sleep_time_day(),
        'diet': generate_diet(),
        'food_extra': generate_food_extra(),
        'food_extra_other': generate_food_extra_other(),
        'fresh_food': generate_fresh_food(),
        'preserved_food': generate_preserved_food(),
        'nutrient': generate_nutrient(),
        'smoke': smoke,
        'smoke_rate': smoke_rate,
        'smoke_year': smoke_year,
        'smoke_day': smoke_day,
        'alcohol_abuse': alcohol_abuse,
        'alcohol_abuse_rate': alcohol_abuse_rate,
        'alcohol_type': alcohol_type,
        'alcohol_day': alcohol_day,
        'drink_tea': drink_tea,
        'drink_tea_rate': drink_tea_rate,
        'drink_tea_day': drink_tea_day,
        'oiltea': oiltea,
        'oiltea_rate': oiltea_rate,
        'oiltea_day': oiltea_day,
        'read_book': read_book,
        'read_rate': read_rate,
        'watch_tv': watch_tv,
        'watch_tv_rate': watch_tv_rate,
        'radio': radio,
        'radio_rate': radio_rate,
        'watch_tv': watch_tv,
        'watch_tv_rate': watch_tv_rate,
        'use_smartphone': use_smartphone,
        'use_smartphone_rate': use_smartphone_rate,
        'housework': housework,
        'housework_rate': housework_rate,
        'exercise': exercise,
        'exercise_rate': exercise_rate,
        'exercise_type': exercise_type,
        'exercise_type_other': exercise_type_other,
        'hobby': generate_hobby(),
        'hobby_other': generate_hobby_other(),
        'recreational_activities': generate_recreational_activities(),
        'recreational_activities_other': generate_recreational_activities_other(),
        'social': generate_social(),
        'social_other': generate_social_other(),
        'personal_relationship': generate_personal_relationship()
    }


def generate_health_statu():
    return {
        'family_his': generate_family_his(),
        'visual': generate_visual(),
        'hearing': generate_hearing(),
        'chronic_disease': generate_chronic_disease(),
        'vascular_his': generate_vascular_his(),
        'vascular_his_other': generate_vascular_his_other(),
        'other_disease': generate_other_disease(),
        'other_disease_other': generate_other_disease_other(),
        'mental_performance': generate_mental_performance(),
        'mental_performance_other': generate_mental_performance_other()
    }


def generate_moca():
    moca_data = {
        'TRAILS': generate_TRAILS(),
        'CUBE': generate_CUBE(),
        'CLOCKCON': generate_CLOCKCON(),
        'CLOCKNO': generate_CLOCKNO(),
        'CLOCKHAN': generate_CLOCKHAN(),
        'LION': generate_LION(),
        'RHINO': generate_RHINO(),
        'CAMEL': generate_CAMEL(),
        'IMMT1W1': generate_IMMT1W1(),
        'IMMT1W2': generate_IMMT1W2(),
        'IMMT1W3': generate_IMMT1W3(),
        'IMMT1W4': generate_IMMT1W4(),
        'IMMT1W5': generate_IMMT1W5(),
        'IMMT2W1': generate_IMMT2W1(),
        'IMMT2W2': generate_IMMT2W2(),
        'IMMT2W3': generate_IMMT2W3(),
        'IMMT2W4': generate_IMMT2W4(),
        'IMMT2W5': generate_IMMT2W5(),
        'DIGFOR': generate_DIGFOR(),
        'DIGBACK': generate_DIGBACK(),
        'LETTERS': generate_LETTERS(),
        'SERIAL1': generate_SERIAL1(),
        'SERIAL2': generate_SERIAL2(),
        'SERIAL3': generate_SERIAL3(),
        'SERIAL4': generate_SERIAL4(),
        'SERIAL5': generate_SERIAL5(),
        'REPEAT1': generate_REPEAT1(),
        'REPEAT2': generate_REPEAT2(),
        'FFLUENCY': generate_FFLUENCY(),
        'ABSTRAN': generate_ABSTRAN(),
        'ABSMEAS': generate_ABSMEAS(),
        'DELW1': generate_DELW1(),
        'DELW2': generate_DELW2(),
        'DELW3': generate_DELW3(),
        'DELW4': generate_DELW4(),
        'DELW5': generate_DELW5(),
        'DATE': generate_DATE(),
        'MONTH': generate_MONTH(),
        'YEAR': generate_YEAR(),
        'DAY': generate_DAY(),
        'PLACE': generate_PLACE(),
        'CITY': generate_CITY()
    }

    # 计算MOCA分数
    memory_list = ['IMMT1W1', 'IMMT1W2', 'IMMT1W3', 'IMMT1W4', 'IMMT1W5', 'IMMT2W1', 'IMMT2W2', 'IMMT2W3', 'IMMT2W4', 'IMMT2W5']
    attention_list = ['SERIAL1', 'SERIAL2', 'SERIAL3', 'SERIAL4', 'SERIAL5']
    moca_score = 0
    for k, v in moca_data.items():
        if k not in memory_list and k not in attention_list:
            moca_score = moca_score + v
    true_count = sum([moca_data[k] for k in attention_list])
    if true_count >= 4:
        moca_score = moca_score + 3
    elif true_count >= 2:
        moca_score = moca_score + 2
    elif true_count >= 1:
        moca_score = moca_score + 1
    moca_data['MOCA'] = moca_score

    return moca_data


def generate_mmse():
    mmse_data = {
        'MMYEAR': generate_MMYEAR(),
        'MMMONTH': generate_MMMONTH(),
        'MMDATE': generate_MMDATE(),
        'MMDAY': generate_MMDAY(),
        'MMSEASON': generate_MMSEASON(),
        'MMAREA': generate_MMAREA(),
        'MMSTATE': generate_MMSTATE(),
        'MMCITY': generate_MMCITY(),
        'MMHOSPIT': generate_MMHOSPIT(),
        'MMFLOOR': generate_MMFLOOR(),
        'garden': generate_garden(),
        'refrigerator': generate_refrigerator(),
        'flag': generate_flag(),
        'MMDLTR': generate_MMDLTR(),
        'MMLLTR': generate_MMLLTR(),
        'MMRLTR': generate_MMRLTR(),
        'MMOLTR': generate_MMOLTR(),
        'MMWLTR': generate_MMWLTR(),
        'garden2': generate_garden2(),
        'refrigerator2': generate_refrigerator2(),
        'flag2': generate_flag2(),
        'MMWATCH': generate_MMWATCH(),
        'MMPENCIL': generate_MMPENCIL(),
        'MMREPEAT': generate_MMREPEAT(),
        'MMHAND': generate_MMHAND(),
        'MMFOLD': generate_MMFOLD(),
        'MMONFLR': generate_MMONFLR(),
        'MMCLEYE': generate_MMCLEYE(),
        'MMWRITE': generate_MMWRITE(),
        'MMDRAW': generate_MMDRAW()
    }

    # 计算MMSE分数
    mmse_data['MMSE'] = sum(mmse_data.values())

    return mmse_data


def generate_gdscale():
    gdscale_data = {
        'GDSATIS': generate_GDSATIS(),
        'GDDROP': generate_GDDROP(),
        'GDEMPTY': generate_GDEMPTY(),
        'GDBORED': generate_GDBORED(),
        'GDSPIRIT': generate_GDSPIRIT(),
        'GDMIND': generate_GDMIND(),
        'GDENERGY': generate_GDENERGY(),
        'GDAFRAID': generate_GDAFRAID(),
        'GDHAPPY': generate_GDHAPPY(),
        'GDHELP': generate_GDHELP(),
        'GDFIDGET': generate_GDFIDGET(),
        'GDHOME': generate_GDHOME(),
        'GDFUTURE': generate_GDFUTURE(),
        'GDMEMORY': generate_GDMEMORY(),
        'GDALIVE': generate_GDALIVE(),
        'GDDEPRESSED': generate_GDDEPRESSED(),
        'GDMEANINGLESS': generate_GDMEANINGLESS(),
        'GDWORRY': generate_GDWORRY(),
        'GDEXCITING': generate_GDEXCITING(),
        'GDNEWJOB': generate_GDNEWJOB(),
        'GDVITALITY': generate_GDVITALITY(),
        'GDHOPE': generate_GDHOPE(),
        'GDBETTER': generate_GDBETTER(),
        'GDSAD': generate_GDSAD(),
        'GDCRYING': generate_GDCRYING(),
        'GDCONCENTRATE': generate_GDCONCENTRATE(),
        'GDMORNING': generate_GDMORNING(),
        'GDPARTY': generate_GDPARTY(),
        'GDDECISION': generate_GDDECISION(),
        'GDCLEAR': generate_GDCLEAR()
    }

    # 计算GD分数
    gdscale_data['GDTOTAL'] = sum(gdscale_data.values())

    return gdscale_data


def generate_npiq():
    NPIA, NPIASEV = generate_NPIA()
    NPIB, NPIBSEV = generate_NPIB()
    NPIC, NPICSEV = generate_NPIC()
    NPID, NPIDSEV = generate_NPID()
    NPIE, NPIESEV = generate_NPIE()
    NPIF, NPIFSEV = generate_NPIF()
    NPIG, NPIGSEV = generate_NPIG()
    NPIH, NPIHSEV = generate_NPIH()
    NPII, NPIISEV = generate_NPII()
    NPIJ, NPIJSEV = generate_NPIJ()
    NPIK, NPIKSEV = generate_NPIK()
    NPIL, NPILSEV = generate_NPIL()

    npiq_data = {
        'NPIA': NPIA,
        'NPIASEV': NPIASEV,
        'NPIB': NPIB,
        'NPIBSEV': NPIBSEV,
        'NPIC': NPIC,
        'NPICSEV': NPICSEV,
        'NPID': NPID,
        'NPIDSEV': NPIDSEV,
        'NPIE': NPIE,
        'NPIESEV': NPIESEV,
        'NPIF': NPIF,
        'NPIFSEV': NPIFSEV,
        'NPIG': NPIG,
        'NPIGSEV': NPIGSEV,
        'NPIH': NPIH,
        'NPIHSEV': NPIHSEV,
        'NPII': NPII,
        'NPIISEV': NPIISEV,
        'NPIJ': NPIJ,
        'NPIJSEV': NPIJSEV,
        'NPIK': NPIK,
        'NPIKSEV': NPIKSEV,
        'NPIL': NPIL,
        'NPILSEV': NPILSEV
    }

    # 计算NPI分数
    npi_score = 0
    for k, v in npiq_data.items():
        if k.endswith('SEV') and npiq_data[k[:-3]] == 1:
            npi_score = npi_score + v + 1
    npiq_data['NPISCORE'] = npi_score

    return npiq_data


def generate_adl():
    adl_data = {
        'vehicles': generate_vehicles(),
        'walk': generate_walk(),
        'cook': generate_cook(),
        'housework': generate_adl_housework(),
        'medicine': generate_medicine(),
        'eat': generate_eat(),
        'dress': generate_dress(),
        'hair': generate_hair(),
        'laundry': generate_laundry(),
        'shower': generate_shower(),
        'shopping': generate_shopping(),
        'bathroom': generate_bathroom(),
        'phone': generate_adl_phone(),
        'money': generate_money()
    }

    # 计算ADL分数
    adl_data['ADLSCORE'] = sum([v + 1 for v in adl_data.values()])

    return adl_data


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
                    'demo_character': generate_demo_character(),
                    'life_style': generate_life_style(),
                    'health_statu': generate_health_statu(),
                    'moca': generate_moca(),
                    'mmse': generate_mmse(),
                    'gdscale': generate_gdscale(),
                    'npiq': generate_npiq(),
                    'adl': generate_adl()
                })

    # 保存生成的json数据
    json_data = json.dumps(data, indent=4, ensure_ascii=False)
    save_path = os.path.abspath(os.path.join(result_save_path, 'result.json'))
    with open(save_path, 'w', encoding='UTF-8') as file:
        file.write(json_data)
        file.close()

    return data


# 生成表json的函数 [end]========================================================


# 生成SQL语句的函数 [start]=====================================================
# 生成SQL语句的函数 [end]=======================================================


def main():
    json_data = generate_json_main()


if __name__ == '__main__':
    """
    生成顺序：
    doctor --> doctor_subject --> demo_character --> life_style --> health_statu --> moca --> mmse --> gdscale --> npiq --> adl
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
    main()
