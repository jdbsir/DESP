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
        const scoreMap = [0, 5, 10, 15];
        for (let i = 0; i < adlChildren.length; i++) {
            let obj = adlChildren[i];
            let value = obj.getValue();
            data[obj.getName()] = value;
            ADLSCORE = ADLSCORE + scoreMap[value];
        }
        data['ADLSCORE'] = ADLSCORE;

        ajaxPostJson(adlForm.action, data).then((response) => {
            console.log(response);
        });
    }
})();