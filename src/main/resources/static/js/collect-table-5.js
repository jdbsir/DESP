(() => {
    'use strict';

    // 简易智力状态检查量表
    const MMSEForm = document.querySelector('form[name="MMSE"]');
    const submitButton = MMSEForm.querySelector('[type="submit"]');
    const MMSEChildren = [
        MultiCheckbox(
            '时间定向力',
            'time_direction',
            ['年', '月', '日', '星期', '季节'],
            ['MMYEAR', 'MMMONTH', 'MMDATE', 'MMDAY', 'MMSEASON']
        ),
        MultiCheckbox(
            '场所定向力',
            'place_direction',
            ['国家', '省、市', '街道（地址）', '什么地方（场所）', '几楼'],
            ['MMAREA', 'MMSTATE', 'MMCITY', 'MMHOSPIT', 'MMFLOOR']
        ),
        MultiCheckbox(
            '记忆力',
            'memory',
            ['花园', '冰箱', '国旗'],
            ['garden', 'refrigerator', 'flag']
        ),
        MultiCheckbox(
            '计算力',
            'calculation',
            ['100连续减7（1）', '100连续减7（2）', '100连续减7（3）', '100连续减7（4）', '100连续减7（5）'],
            ['MMDLTR', 'MMLLTR', 'MMRLTR', 'MMOLTR', 'MMWLTR']
        ),
        MultiCheckbox(
            '回忆力',
            'recall',
            ['花园', '冰箱', '国旗'],
            ['garden2', 'refrigerator2', 'flag2']
        ),
        MultiCheckbox(
            '语言及时空间能力',
            'ability',
            ['提问物品1', '提问物品2', '重复句子', '按指示去做1', '按指示去做2', '按指示去做3', '念，并做', '写句子', '画图'],
            ['MMWATCH', 'MMPENCIL', 'MMREPEAT', 'MMHAND', 'MMFOLD', 'MMONFLR', 'MMCLEYE', 'MMWRITE', 'MMDRAW']
        ),
    ];
    MMSEChildren.forEach((obj) => {
        MMSEForm.insertBefore(obj.getNode(), submitButton);
    });
    MMSEForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        let data = {};
        for (let i = 0; i < MMSEChildren.length; i++) {
            let obj = MMSEChildren[i];
            let valueArray = obj.getValueArray();
            for (let j = 0; j < valueArray.length; j++) {
                let v = valueArray[j];
                data[v] = Number(document.getElementById(`${obj.getName()}_${v}`).checked);
            }
        }

        // 计分
        let mmseScore = 0;
        for (let k in data) {
            mmseScore = mmseScore + data[k];
        }
        data['MMSE'] = mmseScore;

        data = upperToLower(data);

        // 发送并处理请求
        const subjectId = encodeURIComponent(parseQueryParam()['subject_id']);
        const postUrl = `${MMSEForm.action}?subject_id=${subjectId}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/collect_table_6?${appendQueryParam({'subject_id': subjectId})}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();