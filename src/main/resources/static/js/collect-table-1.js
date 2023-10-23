(() => {
    'use strict';

    // 人口学特征
    const demoCharacterForm = document.querySelector('form[name="demo-character"]');
    const submitButton = demoCharacterForm.querySelector('[type="submit"]');
    const demoCharacterChildren = [
        LeftRightInput('text', '姓名', 'name'),
        BinaryRadio('性别', '男', '女', 'gender', 'man', 'woman'),
        LeftRightInput('month', '出生年月', 'born_date'),
        LeftRightInput('tel', '电话', 'phone'),
        LeftRightInput('tel', '家属电话', 'home_phone'),
        LeftRightInput('text', '住址', 'address'),
        DropdownSelect(
            '民族',
            'race',
            ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族'],
            ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族'],
            {otherLabel: '其他民族'}
        ),
        DropdownSelect(
            '汉语交流',
            'fluency',
            ['无困难', '有困难', '无法交流'],
            ['0', '1', '2']
        ),
        DropdownSelect(
            '居住地',
            'area_type',
            ['城市', '乡镇', '农村'],
            ['0', '1', '2']
        ),
        DropdownSelect(
            '居住方式',
            'live_type',
            ['独居', '只与配偶同住', '与配偶、子女同住', '与亲戚同住'],
            ['独居', '只与配偶同住', '与配偶、子女同住', '与亲戚同住'],
            {otherLabel: '其他居住方式'}
        ),
        DropdownSelect(
            '文化程度',
            'education',
            ['不识字/识字少', '小学', '初中', '高中/职高', '大专', '本科及以上'],
            ['0', '1', '2', '3', '4', '5']
        ),
        DropdownSelect(
            '婚姻',
            'marital',
            ['已婚', '离异', '配偶过世', '未婚'],
            ['0', '1', '2', '3', '4']
        ),
        BinaryRadio('是否离退休', '是', '否', 'retire', '1', '0'),
        DropdownSelect(
            '职业（在职/离退休前）',
            'occupation',
            ['机关、企事业负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔水利生产人员', '生产、运输设备操作及有关人员', '军人', '无业'],
            ['机关、企事业负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔水利生产人员', '生产、运输设备操作及有关人员', '军人', '无业']
        ),
        DropdownSelect(
            '经济收入来源',
            'income',
            ['退休金', '儿女供给', '劳动所得', '社会救助'],
            ['退休金', '儿女供给', '劳动所得', '社会救助'],
            {otherLabel: '其他收入来源'}
        ),
        DropdownSelect(
            '收入情况',
            'income_level',
            ['1000元以下', '1001-2000', '2001-3000', '3001-4000', '4001-5000', '5001-6000', '6001元以上'],
            ['0', '1', '2', '3', '4', '5', '6']
        ),
        MultiCheckbox(
            '医疗保险（可多选）',
            'medical_insurance',
            ['城镇职工医疗保险', '城镇居民基本保险', '新型农村合作医疗保险', '城乡医疗救助', '商业医疗险', '自费'],
            ['0', '1', '2', '3', '4', '5'],
            {required: true}
        ),
        LeftRightInput('text', '身高（厘米）', 'height'),
        LeftRightInput('text', '体重（公斤）', 'weight'),
        LeftRightInput('text', '腰围（厘米）', 'waistline'),
        LeftRightInput('text', '收缩压（mmHg）', 'systolic_pressure'),
        LeftRightInput('text', '舒张压（mmHg）', 'diastolic_pressure'),
    ];
    demoCharacterChildren.forEach((obj) => {
        demoCharacterForm.insertBefore(obj.getNode(), submitButton);
    });
    demoCharacterForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        const data = {};
        const alertMessageObject = {
            'medical_insurance': '医疗保险至少选一个！'
        };
        for (let i = 0; i < demoCharacterChildren.length; i++) {
            let obj = demoCharacterChildren[i];
            let name = obj.getName();

            // 自动的表单验证
            if (!obj.check()) {
                if (alertMessageObject[name] !== undefined) {
                    alert(alertMessageObject[name]);
                }
                return undefined;
            }

            // 将表单值转换成json
            let value = obj.getValue();
            if (typeof(value) !== 'object') {
                data[name] = value;
                continue;
            }
            for (let k in value) {
                data[k] = value[k];
            }
        }

        // 电话
        const phoneNumberCheckObject = {
            'phone': '电话',
            'home_phone': '家庭电话'
        };
        for (let k in phoneNumberCheckObject) {
            if (!phoneNumberCheck(data[k])) {
                alert(`${phoneNumberCheckObject[k]}不合法！`);
                return undefined;
            }
            data[k] = parseInt(data[k]);
        }

        // 转换成正数float
        const positiveFloatCheckObject = {
            'height': '身高',
            'weight': '体重',
            'waistline': '腰围',
            'systolic_pressure': '收缩压',
            'diastolic_pressure': '舒张压'
        };
        for (let k in positiveFloatCheckObject) {
            if (!positiveFloatCheck(data[k])) {
                alert(`${positiveFloatCheckObject[k]}不合法！`);
                return undefined;
            }
            data[k] = parseFloat(data[k]);
        }

        // 发送并处理请求
        ajaxPostJson(demoCharacterForm.action, data).then((response) => {
            if (response.code === 1) {
                const subjectId = encodeURIComponent(response.data.subject_id);
                location.href = `/collect-table-2.html?${appendQueryParam({'subject_id': subjectId})}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();