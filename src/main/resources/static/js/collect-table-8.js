(() => {
    'use strict';

    const adlForm = document.querySelector('form[name="adl"]');
    const submitButton = adlForm.querySelector('[type="submit"');
    const adlChildren = [
        DropdownSelect(
            '使用公共车辆',
            'vehicles',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '行走',
            'walk',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '做饭菜',
            'cook',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '做家务',
            'housework',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '吃药',
            'medicine',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '吃饭',
            'eat',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '穿衣',
            'dress',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '梳头、刷牙等',
            'hair',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '洗衣',
            'laundry',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '洗澡',
            'shower',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '购物',
            'shopping',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '定时上厕所',
            'bathroom',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '打电话',
            'phone',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        ),
        DropdownSelect(
            '处理自己钱物',
            'money',
            ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
            ['0', '1', '2', '3']
        )
    ];
    adlChildren.forEach((obj) => {
        adlForm.insertBefore(obj.getNode(), submitButton);
    });
    adlForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // 获取表单数据并计分
        const data = {};
        let ADLSCORE = 0;
        for (let i = 0; i < adlChildren.length; i++) {
            let obj = adlChildren[i];
            let value = obj.getValue();
            data[obj.getName()] = value;
            ADLSCORE = ADLSCORE + value + 1;
        }
        data['adlscore'] = ADLSCORE;

        // 发送并处理请求
        const subjectId = encodeURIComponent(parseQueryParam()['subject_id']);
        const postUrl = `${adlForm.action}?subject_id=${subjectId}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = '/';
            } else {
                alert(response.msg);
            }
        });
    }
})();