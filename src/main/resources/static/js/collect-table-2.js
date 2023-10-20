(() => {
    'use strict';

    // 生活方式
    const lifeModeForm = document.querySelector('form[name="life-mode"]');
    const submitButton = lifeModeForm.querySelector('[type="submit"]');
    const lifeModeChildren = [
        DropdownSelect(
            '您的睡眠情况是',
            'sleep',
            ['良好', '一般', '较差'],
            ['0', '1', '2']
        ),
        DropdownSelect(
            '您每天的睡眠（午间和夜间）时间',
            'sleep_time_day',
            ['小于4小时', '4-6小时', '6-8小时', '大于8小时'],
            ['0', '1', '2', '3']
        ),
        MultiCheckbox(
            '您的饮食口味是（可多选）',
            'diet',
            ['清淡', '偏油', '偏咸', '偏甜', '偏辣'],
            ['0', '1', '2', '3', '4'],
            {required: true}
        ),
        MultiCheckbox(
            '您平时除主食（米饭、面等）外，还经常吃下面哪种食物：（可多选）',
            'food_extra',
            ['肉类', '蔬菜类', '牛奶、豆制品', '水果', '坚果'],
            ['0', '1', '2', '3', '4'],
            {otherLabel: '其他食物', required: true}
        ),
        DropdownSelect(
            '您常吃新鲜的肉类、蔬菜、水果吗？',
            'fresh_food',
            ['经常', '很少', '不确定'],
            ['0', '1', '2']
        ),
        BinaryRadio('您经常吃腊肉、腊肠、泡菜、咸菜吗？', '是', '否', 'preserved_food', '1', '0'),
        BinaryRadio('您经常吃维生素或其他营养素吗？', '是', '否', 'nutrient', '1', '0'),
        BinaryRadio('您是否吸烟', '是', '否', 'smoke', '1', '0', {controlComponent: '#smoke_rate_box #smoke_year_box #smoke_day_box'}),
        DropdownSelect(
            '吸烟频率',
            'smoke_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'smoke_rate_box', hidden: true}
        ),
        LeftRightInput('text', '吸烟年数', 'smoke_year', {id: 'smoke_year_box', hidden: true, dataRequired: true}),
        LeftRightInput('text', '平均吸烟（支/天）', 'smoke_day', {id: 'smoke_day_box', hidden: true, dataRequired: true}),
        BinaryRadio('您是否饮酒', '是', '否', 'alcohol_abuse', '1', '0', {controlComponent: '#alcohol_abuse_rate_box #alcohol_type_box #alcohol_day_box'}),
        DropdownSelect(
            '饮酒频率',
            'alcohol_abuse_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'alcohol_abuse_rate_box', hidden: true}
        ),
        MultiCheckbox(
            '饮酒的种类（可多选）',
            'alcohol_type',
            ['白酒', '红酒', '啤酒'],
            ['0', '1', '2'],
            {otherLabel: '其他酒类', id: 'alcohol_type_box', required: true, hidden: true}
        ),
        LeftRightInput('text', '平均饮酒（毫升/天）', 'alcohol_day', {id: 'alcohol_day_box', hidden: true, dataRequired: true}),
        BinaryRadio('您是否喝茶', '是', '否', 'drink_tea', '1', '0', {controlComponent: '#drink_tea_rate_box #drink_tea_day_box'}),
        DropdownSelect(
            '喝茶频率',
            'drink_tea_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'drink_tea_rate_box', hidden: true}
        ),
        LeftRightInput('text', '平均喝茶（杯/天，按50毫升杯子为准）', 'drink_tea_day', {id: 'drink_tea_day_box', hidden: true, dataRequired: true}),
        BinaryRadio('您是否喝油茶', '是', '否', 'oiltea', '1', '0', {controlComponent: '#oiltea_rate_box #oiltea_day_box'}),
        DropdownSelect(
            '喝油茶频率',
            'oiltea_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'oiltea_rate_box', hidden: true}
        ),
        LeftRightInput('text', '平均喝油茶（碗/天）', 'oiltea_day', {id: 'oiltea_day_box', hidden: true, dataRequired: true}),
        BinaryRadio('您是否有阅读（读书/看报）习惯', '是', '否', 'read', '1', '0', {controlComponent: '#read_rate_box'}),
        DropdownSelect(
            '阅读频率',
            'read_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'read_rate_box', hidden: true}
        ),
        BinaryRadio('您是否看电视', '是', '否', 'watch_TV', '1', '0', {controlComponent: '#watch_TV_rate_box'}),
        DropdownSelect(
            '看电视频率',
            'watch_TV_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'watch_TV_rate_box', hidden: true}
        ),
        BinaryRadio('您是否听广播', '是', '否', 'radio', '1', '0', {controlComponent: '#radio_rate_box'}),
        DropdownSelect(
            '听广播频率',
            'radio_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'radio_rate_box', hidden: true}
        ),
        BinaryRadio('您是否使用智能手机并上网', '是', '否', 'use_smartphone', '1', '0', {controlComponent: '#use_smartphone_rate_box'}),
        DropdownSelect(
            '使用智能手机上网的频率',
            'use_smartphone_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'use_smartphone_rate_box', hidden: true}
        ),
        BinaryRadio('您是否做家务', '是', '否', 'housework', '1', '0', {controlComponent: '#housework_rate_box'}),
        DropdownSelect(
            '做家务的频率',
            'housework_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'housework_rate_box', hidden: true}
        ),
        BinaryRadio('您是否参加体育锻炼', '是', '否', 'exercise', '1', '0', {controlComponent: '#exercise_rate_box #exercise_type_box'}),
        DropdownSelect(
            '体育锻炼的频率',
            'exercise_rate',
            ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
            ['0', '1', '2'],
            {id: 'exercise_rate_box', hidden: true}
        ),
        MultiCheckbox(
            '体育锻炼项目（可多选）',
            'exercise_type',
            ['散步', '慢跑', '健身操', '太极拳', '广场舞', '球类'],
            ['0', '1', '2', '3', '4', '5'],
            {otherLabel: '其他体育锻炼项目', id: 'exercise_type_box', required: true, hidden: true}
        ),
        MultiCheckbox(
            '兴趣爱好（可多选或不选）',
            'hobby',
            ['书法绘画', '手工活动', '摄影', '演奏乐器'],
            ['0', '1', '2', '3'],
            {otherLabel: '其他兴趣爱好'}
        ),
        MultiCheckbox(
            '参与的文娱活动（可多选或不选）',
            'recreational_activities',
            ['棋牌（扑克、麻将、象棋等）', '唱歌', '跳舞', '音乐表演'],
            ['0', '1', '2', '3'],
            {otherLabel: '其他文娱活动'}
        ),
        MultiCheckbox(
            '参与的社交活动（可多选或不选）',
            'social',
            ['探亲访友', '社区活动', '聚会', '旅游'],
            ['0', '1', '2', '3'],
            {otherLabel: '其他社交活动'}
        ),
        DropdownSelect(
            '您与子女的关系',
            'personal_relationship',
            ['亲密', '一般', '不好'],
            ['0', '1', '2']
        )
    ];
    lifeModeChildren.forEach((obj) => {
        lifeModeForm.insertBefore(obj.getNode(), submitButton);
    });
    lifeModeForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        const data = {};
        const alertMessageObject = {
            'diet': '饮食口味至少选一个！',
            'food_extra': '除主食外食物至少选一个！',
            'alcohol_type': '饮酒种类至少选一个！',
            'exercise_type': '体育锻炼项目至少选一个！'
        };
        for (let i = 0; i < lifeModeChildren.length; i++) {
            let obj = lifeModeChildren[i];
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

        // 转换成正数float
        const positiveFloatCheckObject = {
            'smoke_year': '吸烟年数',
            'smoke_day': '平均吸烟（支/天）',
            'alcohol_day': '平均饮酒（毫升/天）',
            'drink_tea_day': '平均喝茶（杯/天）',
            'oiltea_day': '平均喝油茶（碗/天）'
        };
        for (let k in positiveFloatCheckObject) {
            let v = data[k];
            if (v !== '' && !positiveFloatCheck(v)) {
                alert(`${positiveFloatCheckObject[k]}不合法！`);
                return undefined;
            }
            data[k] = v === '' ? '' : parseFloat(v);
        }

        // 获取请求链接
        const subjectId = encodeURIComponent(parseQueryParam()['subject_id']);
        let postUrl = `${lifeModeForm.action}?subject_id=${subjectId}`;
        ajaxPostJson(postUrl, data).then((response) => {
            console.log(response);
        });
    }
})();