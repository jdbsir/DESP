(() => {
    'use strict';

    // 蒙特利尔认知评估量表
    const MoCAForm = document.querySelector('form[name="MoCA"]');
    const submitButton = MoCAForm.querySelector('[type="submit"]');
    const MoCAChildren = [
        MultiCheckbox(
            '视空间与执行功能',
            'space_function',
            ['连线：1甲2乙3丙4丁5戊', '复制立方体', '画钟表：轮廓', '画钟表：数字', '画钟表：指针'],
            ['TRAILS', 'CUBE', 'CLOCKCON', 'CLOCKNO', 'CLOCKHAN']
        ),
        MultiCheckbox(
            '命名',
            'name',
            ['1', '2', '3'],
            ['LION', 'RHINO', 'CAMEL']
        ),
        MultiCheckbox(
            '记忆',
            'memory',
            ['第一次：面孔', '第一次：天鹅绒', '第一次：教堂', '第一次：菊花', '第一次：红色', '第二次：面孔', '第二次：天鹅绒', '第二次：教堂', '第二次：菊花', '第二次：红色'],
            ['IMMT1W1', 'IMMT1W2', 'IMMT1W3', 'IMMT1W4', 'IMMT1W5', 'IMMT2W1', 'IMMT2W2', 'IMMT2W3', 'IMMT2W4', 'IMMT2W5']
        ),
        MultiCheckbox(
            '注意',
            'attention',
            ['顺背数字', '倒背数字', '当数字1出现时用手敲打一下桌面', '100连续减7（1）', '100连续减7（2）', '100连续减7（3）', '100连续减7（4）', '100连续减7（5）'],
            ['DIGFOR', 'DIGBACK', 'LETTERS', 'SERIAL1', 'SERIAL2', 'SERIAL3', 'SERIAL4', 'SERIAL5']
        ),
        MultiCheckbox(
            '语言',
            'language',
            ['重复句子1', '重复句子2', '流畅性：在1分钟内尽可能多地说出动物的名字'],
            ['REPEAT1', 'REPEAT2', 'FFLUENCY']
        ),
        MultiCheckbox(
            '抽象',
            'abstraction',
            ['词语相似性：火车-自行车', '词语相似性：手表-尺子'],
            ['ABSTRAN', 'ABSMEAS']
        ),
        MultiCheckbox(
            '延迟回忆',
            'delayed_recall',
            ['1', '2', '3', '4', '5'],
            ['DELW1', 'DELW2', 'DELW3', 'DELW4', 'DELW5']
        ),
        MultiCheckbox(
            '定向',
            'direction',
            ['日期', '月份', '年代', '星期几', '地点', '城市'],
            ['DATE', 'MONTH', 'YEAR', 'DAY', 'PLACE', 'CITY']
        ),
    ];
    MoCAChildren.forEach((obj) => {
        MoCAForm.insertBefore(obj.getNode(), submitButton);
    });
    MoCAForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        let data = {};
        for (let i = 0; i < MoCAChildren.length; i++) {
            let obj = MoCAChildren[i];
            let valueArray = obj.getValueArray();
            for (let j = 0; j < valueArray.length; j++) {
                let v = valueArray[j];
                data[v] = Number(document.getElementById(`${obj.getName()}_${v}`).checked);
            }
        }
        
        // 初步计分
        const memoryArray = ['IMMT1W1', 'IMMT1W2', 'IMMT1W3', 'IMMT1W4', 'IMMT1W5', 'IMMT2W1', 'IMMT2W2', 'IMMT2W3', 'IMMT2W4', 'IMMT2W5'];
        const attentionArray = ['SERIAL1', 'SERIAL2', 'SERIAL3', 'SERIAL4', 'SERIAL5'];
        let mocaScore = 0;
        for (let k in data) {
            // “记忆”部分不计分、“100连续减7”暂时不计分
            if (!inArray(memoryArray, k) && !inArray(attentionArray, k)) {
                mocaScore = mocaScore + data[k];
            }
        }

        // “100连续减7”单独计分
        let trueCount = 0;
        for (let i = 0; i < attentionArray.length; i++) {
            let k = attentionArray[i];
            trueCount = trueCount + data[k];
        }
        if (trueCount >= 4) {
            mocaScore = mocaScore + 3;
        } else if (trueCount >= 2) {
            mocaScore = mocaScore + 2;
        } else if (trueCount >= 1) {
            mocaScore = mocaScore + 1;
        }
        data['MOCA'] = mocaScore;

        data = upperToLower(data);
        
        // 发送并处理请求
        const subjectId = encodeURIComponent(parseQueryParam()['subject_id']);
        const postUrl = `${MoCAForm.action}?subject_id=${subjectId}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 0) {
                alert(response.msg);
                return undefined;
            }

            if (mocaScore < 26) {
                location.href = `/collect-table-5.html?${appendQueryParam({'subject_id': subjectId})}`;
            } else {
                location.href = `/collect-table-6.html?${appendQueryParam({'subject_id': subjectId})}`;
            }
        });
    }
})();