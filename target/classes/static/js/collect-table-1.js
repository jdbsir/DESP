(() => {
    'use strict';

    // 人口学特征
    const demoCharacterForm = document.querySelector('form[name="general-info"] > .demo-character');
    const demoCharacterChildren = [
        LeftRightInput('text', '姓名', 'name').getNode(),
        BinaryRadio('性别', '男', '女', 'gender', 'man', 'woman').getNode(),
        LeftRightInput('month', '出生年月', 'born_date').getNode(),
        LeftRightInput('tel', '电话', 'phone').getNode(),
        LeftRightInput('tel', '家属电话', 'home_phone').getNode(),
        LeftRightInput('text', '住址', 'address').getNode(),
        DropdownSelect(
            '民族',
            'race',
            ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族'],
            ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族'],
            {otherLabel: '其他民族'}
        ).getNode(),
        DropdownSelect(
            '汉语交流',
            'fluency',
            ['无困难', '有困难', '无法交流'],
            ['0', '1', '2']
        ).getNode(),
        DropdownSelect(
            '居住地',
            'area_type',
            ['城市', '乡镇', '农村'],
            ['0', '1', '2']
        ).getNode(),
        DropdownSelect(
            '居住方式',
            'live_type',
            ['独居', '只与配偶同住', '与配偶、子女同住', '与亲戚同住'],
            ['独居', '只与配偶同住', '与配偶、子女同住', '与亲戚同住'],
            {otherLabel: '其他居住方式'}
        ).getNode(),
        DropdownSelect(
            '文化程度',
            'education',
            ['不识字/识字少', '小学', '初中', '高中/职高', '大专', '本科及以上'],
            ['0', '1', '2', '3', '4', '5']
        ).getNode(),
        DropdownSelect(
            '婚姻',
            'marital',
            ['已婚', '离异', '配偶过世', '未婚'],
            ['0', '1', '2', '3', '4']
        ).getNode(),
        BinaryRadio('是否离退休', '是', '否', 'retire', '1', '0').getNode(),
        DropdownSelect(
            '职业（在职/离退休前）',
            'occupation',
            ['机关、企事业负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔水利生产人员', '生产、运输设备操作及有关人员', '军人', '无业'],
            ['机关、企事业负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔水利生产人员', '生产、运输设备操作及有关人员', '军人', '无业']
        ).getNode(),
        DropdownSelect(
            '经济收入来源',
            'income',
            ['退休金', '儿女供给', '劳动所得', '社会救助'],
            ['退休金', '儿女供给', '劳动所得', '社会救助'],
            {otherLabel: '其他收入来源'}
        ).getNode(),
        DropdownSelect(
            '收入情况',
            'income_level',
            ['1000元以下', '1001-2000', '2001-3000', '3001-4000', '4001-5000', '5001-6000', '6001元以上'],
            ['0', '1', '2', '3', '4', '5', '6']
        ).getNode(),
        MultiCheckbox(
            '医疗保险（可多选）',
            'medical_insurance',
            ['城镇职工医疗保险', '城镇居民基本保险', '新型农村合作医疗保险', '城乡医疗救助', '商业医疗险', '自费'],
            ['0', '1', '2', '3', '4', '5'],
            {required: true}
        ).getNode(),
        LeftRightInput('text', '身高（厘米）', 'height').getNode(),
        LeftRightInput('text', '体重（公斤）', 'weight').getNode(),
        LeftRightInput('text', '腰围（厘米）', 'waistline').getNode(),
        LeftRightInput('text', '收缩压（mmHg）', 'systolic_pressure').getNode(),
        LeftRightInput('text', '舒张压（mmHg）', 'diastolic_pressure').getNode(),
    ];
    demoCharacterChildren.forEach((node) => {
        demoCharacterForm.appendChild(node);
    });
    
    // 生活方式
    const lifeModeForm = document.querySelector('form[name="general-info"] > .life-mode');
    const lifeModeChildren = [
        DropdownSelect(
            '您的睡眠情况是',
            'sleep',
            ['良好', '一般', '较差'],
            ['0', '1', '2']
        ).getNode(),
        DropdownSelect(
            '您每天的睡眠（午间和夜间）时间',
            'sleep_time_day',
            ['小于4小时', '4-6小时', '6-8小时', '大于8小时'],
            ['0', '1', '2', '3']
        ).getNode(),
        MultiCheckbox(
            '您的饮食口味是（可多选）',
            'diet',
            ['清淡', '偏油', '偏咸', '偏甜', '偏辣'],
            ['0', '1', '2', '3', '4'],
            {required: true}
        ).getNode(),
        MultiCheckbox(
            '您平时除主食（米饭、面等）外，还经常吃下面哪种食物：（可多选）',
            'food_extra',
            ['肉类', '蔬菜类', '牛奶、豆制品', '水果', '坚果'],
            ['0', '1', '2', '3', '4'],
            {otherLabel: '其他食物', required: true}
        ).getNode(),
        DropdownSelect(
            '您常吃新鲜的肉类、蔬菜、水果吗？',
            'fresh_food',
            ['经常', '很少', '不确定'],
            ['0', '1', '2']
        ).getNode(),
        BinaryRadio('您经常吃腊肉、腊肠、泡菜、咸菜吗？', '是', '否', 'preserved_food', '1', '0').getNode(),
        BinaryRadio('您经常吃维生素或其他营养素吗？', '是', '否', 'nutrient', '1', '0').getNode(),
        BinaryRadio('您是否吸烟', '是', '否', 'smoke', '1', '0', {controlComponent: '#smoke_rate_box #smoke_year_box #smoke_day_box'}).getNode(),
        DropdownSelect(
            '吸烟频率',
            'smoke_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'smoke_rate_box', hidden: true}
        ).getNode(),
        LeftRightInput('number', '吸烟年数', 'smoke_year', {id: 'smoke_year_box', hidden: true, dataRequired: true}).getNode(),
        LeftRightInput('number', '平均吸烟（支/天）', 'smoke_day', {id: 'smoke_day_box', hidden: true, dataRequired: true}).getNode(),
        BinaryRadio('您是否饮酒', '是', '否', 'alcohol_abuse', '1', '0', {controlComponent: '#alcohol_abuse_rate_box #alcohol_type_box #alcohol_day_box'}).getNode(),
        DropdownSelect(
            '饮酒频率',
            'alcohol_abuse_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'alcohol_abuse_rate_box', hidden: true}
        ).getNode(),
        MultiCheckbox(
            '饮酒的种类（可多选）',
            'alcohol_type',
            ['白酒', '红酒', '啤酒'],
            ['0', '1', '2'],
            {otherLabel: '其他酒类', id: 'alcohol_type_box', required: true, hidden: true}
        ).getNode(),
        LeftRightInput('number', '平均饮酒（毫升/天）', 'alcohol_day', {id: 'alcohol_day_box', hidden: true, dataRequired: true}).getNode(),
        BinaryRadio('您是否喝茶', '是', '否', 'drink_tea', '1', '0', {controlComponent: '#drink_tea_rate_box #drink_tea_day_box'}).getNode(),
        DropdownSelect(
            '喝茶频率',
            'drink_tea_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'drink_tea_rate_box', hidden: true}
        ).getNode(),
        LeftRightInput('number', '平均喝茶（杯/天，按50毫升杯子为准）', 'drink_tea_day', {id: 'drink_tea_day_box', hidden: true, dataRequired: true}).getNode(),
        BinaryRadio('您是否喝油茶', '是', '否', 'oiltea', '1', '0', {controlComponent: '#oiltea_rate_box #oiltea_day_box'}).getNode(),
        DropdownSelect(
            '喝油茶频率',
            'oiltea_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'oiltea_rate_box', hidden: true}
        ).getNode(),
        LeftRightInput('number', '平均喝油茶（碗/天）', 'oiltea_day', {id: 'oiltea_day_box', hidden: true, dataRequired: true}).getNode(),
        BinaryRadio('您是否有阅读（读书/看报）习惯', '是', '否', 'read', '1', '0', {controlComponent: '#read_rate_box'}).getNode(),
        DropdownSelect(
            '阅读频率',
            'read_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'read_rate_box', hidden: true}
        ).getNode(),
        BinaryRadio('您是否看电视', '是', '否', 'wacth_TV', '1', '0', {controlComponent: '#wacth_TV_rate_box'}).getNode(),
        DropdownSelect(
            '看电视频率',
            'wacth_TV_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'wacth_TV_rate_box', hidden: true}
        ).getNode(),
        BinaryRadio('您是否听广播', '是', '否', 'radio', '1', '0', {controlComponent: '#radio_rate_box'}).getNode(),
        DropdownSelect(
            '听广播频率',
            'radio_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'radio_rate_box', hidden: true}
        ).getNode(),
        BinaryRadio('您是否使用智能手机并上网', '是', '否', 'use_smartphone', '1', '0', {controlComponent: '#use_smartphone_rate_box'}).getNode(),
        DropdownSelect(
            '使用智能手机上网的频率',
            'use_smartphone_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'use_smartphone_rate_box', hidden: true}
        ).getNode(),
        BinaryRadio('您是否做家务', '是', '否', 'housework', '1', '0', {controlComponent: '#housework_rate_box'}).getNode(),
        DropdownSelect(
            '做家务的频率',
            'housework_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'housework_rate_box', hidden: true}
        ).getNode(),
        BinaryRadio('您是否参加体育锻炼', '是', '否', 'exercise', '1', '0', {controlComponent: '#exercise_rate_box #exercise_type_box'}).getNode(),
        DropdownSelect(
            '体育锻炼的频率',
            'exercise_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'exercise_rate_box', hidden: true}
        ).getNode(),
        MultiCheckbox(
            '体育锻炼项目（可多选）',
            'exercise_type',
            ['散步', '慢跑', '健身操', '太极拳', '广场舞', '球类'],
            ['0', '1', '2', '3', '4', '5'],
            {otherLabel: '其他体育锻炼项目', id: 'exercise_type_box', required: true, hidden: true}
        ).getNode(),
        MultiCheckbox(
            '兴趣爱好（可多选或不选）',
            'hobby',
            ['书法绘画', '手工活动', '摄影', '演奏乐器'],
            ['0', '1', '2', '3'],
            {otherLabel: '其他兴趣爱好'}
        ).getNode(),
        MultiCheckbox(
            '参与的文娱活动（可多选或不选）',
            'recreational_activities',
            ['棋牌（扑克、麻将、象棋等）', '唱歌', '跳舞', '音乐表演'],
            ['0', '1', '2', '3'],
            {otherLabel: '其他文娱活动'}
        ).getNode(),
        MultiCheckbox(
            '参与的社交活动（可多选或不选）',
            'social',
            ['探亲访友', '社区活动', '聚会', '旅游'],
            ['0', '1', '2', '3'],
            {otherLabel: '其他社交活动'}
        ).getNode(),
        DropdownSelect(
            '您与子女的关系',
            'personal_relationship',
            ['亲密', '一般', '不好'],
            ['0', '1', '2']
        ).getNode()
    ];
    // lifeModeChildren.forEach((node) => {
    //     lifeModeForm.appendChild(node);
    // });

    // 健康状况
    const healthConditionForm = document.querySelector('form[name="general-info"] > .health-condition');
    const healthConditionChildren = [
        BinaryRadio('您的父母或兄弟姐妹中，是否有人患老年痴呆？', '是', '否', 'kinsfolk-ad', '1', '0').getNode(),
        MultiCheckbox(
            '您的视力情况（可多选）',
            'eyesight',
            ['正常', '视物不清', '几乎看不见', '佩戴老花镜'],
            ['normal', 'blurry', 'invisible', 'glasses']
        ).getNode(),
        MultiCheckbox(
            '您的听力情况（可多选）',
            'hearing',
            ['正常', '声音较大才能听见', '几乎听不见', '佩戴助听器'],
            ['normal', 'blurry', 'inaudibility', 'aid']
        ).getNode(),
        BinaryRadio('您是否患慢性疾病', '是', '否', 'chronic-disease', '1', '0', {controlComponent: '#ccvd-box #disease-box #mental-disease-box'}).getNode(),
        MultiCheckbox(
            '您是否有以下心脑血管病史（可多选或不选）',
            'ccvd',
            ['高血压', '冠心病', '心肌梗塞', '脑梗塞', '脑卒中', '脑出血'],
            ['hypertension', 'coronary-disease', 'myocardial-infarction', 'cerebral-infarction', 'stroke', 'hematencephalon'],
            {otherLabel: '其他心脑血管病', id: 'ccvd-box', hidden: true}
        ).getNode(),
        MultiCheckbox(
            '您是否有以下疾病（可多选或不选）',
            'disease',
            ['糖尿病', '高脂血症', '脑外伤', '慢性支气管炎/肺气肿', '椎间盘疾病', '骨关节炎', '白内障/青光眼', '肿瘤'],
            ['diabetes', 'hyperlipemia', 'cerebral-trauma', 'chronic-bronchitis', 'IVDD', 'osteoarthritis', 'cataract', 'tumour'],
            {otherLabel: '其他疾病', id: 'disease-box', hidden: true}
        ).getNode(),
        MultiCheckbox(
            '您是否有以下精神系统疾病表现（可多选或不选）',
            'mental-disease',
            ['焦虑', '抑郁', '烦躁易怒'],
            ['anxiety', 'depression', 'testiness'],
            {otherLabel: '其他精神系统疾病表现', id: 'mental-disease-box', hidden: true}
        ).getNode()
    ];
    // healthConditionChildren.forEach((node) => {
    //     healthConditionForm.appendChild(node);
    // });

    // 提交表单前验证、转换
    document.querySelector('form[name="general-info"]').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        const form = e.target;
        const formKeys = [
            'name', 'gender', 'born_date', 'phone', 'home_phone', 'address', 'race', 'fluency', 'area_type', 'live_type',
            'education', 'marital', 'retire', 'occupation', 'income', 'income_level', 'medical_insurance', 'height',
            'weight', 'waistline', 'systolic_pressure', 'diastolic_pressure',
            // 'sleep', 'sleep_time_day'
        ];
        const data = {};
        formKeys.forEach((k) => {
            data[k] = form[k].value;
        });
        
        // 电话、家属电话
        const phoneNumberCheckObject = {
            'phone': '电话',
            'home_phone': '家属电话'
        };
        for (let k in phoneNumberCheckObject) {
            let num = form[k].value;
            if (!phoneNumberCheck(num)) {
                alert(`${phoneNumberCheckObject[k]}不合法！`);
                return undefined;
            }
            data[k] = parseInt(num);
        }

        // 民族、居住方式、经济收入来源
        ['race', 'live_type', 'income'].forEach((name) => {
            data[name] = selectOtherCheck(form, name);
        });

        // 汉语交流、居住地、文化程度、婚姻、是否离退休、收入情况、睡眠情况
        const transformInt = [
            'fluency', 'area_type', 'education', 'marital', 'retire', 'income_level',
            // 'sleep', 'sleep_time_day'
        ];
        transformInt.forEach((name) => {
            data[name] = parseInt(form[name].value);
        });

        // 医疗保险
        data['medical_insurance'] = multiCheckboxCheck(form, 'medical_insurance');

        // 身高、体重、腰围、收缩压、舒张压
        const positiveFloatCheckObject = {
            'height': '身高',
            'weight': '体重',
            'waistline': '腰围',
            'systolic_pressure': '收缩压',
            'diastolic_pressure': '舒张压'
        };
        for (let k in positiveFloatCheckObject) {
            let num = form[k].value;
            if (!positiveFloatCheck(num)) {
                alert(`${positiveFloatCheckObject[k]}不合法！`);
                return undefined;
            }
            data[k] = parseFloat(num);
        }

        console.log(data);
        ajaxPostJson('/collect_table_1', data).then((response) => {
            console.log(response);
        });
    }
})();