(() => {
    'use strict';

    // 蒙特利尔认知评估量表
    const MoCAForm = document.querySelector('form[name="cognitive-function"] > .MoCA');
    const MoCAChildren = [
        MultiCheckbox(
            '视空间与执行功能',
            'space-function',
            ['连线：1甲2乙3丙4丁5戊', '复制立方体', '画钟表：轮廓', '画钟表：数字', '画钟表：指针'],
            ['sequence-line', 'copy-cube', 'clock-outline', 'clock-number', 'clock-pointer']
        ).getNode(),
        MultiCheckbox(
            '命名',
            'name',
            ['1', '2', '3'],
            ['lion', 'rhinoceros', 'camel']
        ).getNode(),
        MultiCheckbox(
            '注意',
            'attention',
            ['顺背数字', '倒背数字', '当数字1出现时用手敲打一下桌面', '100连续减7（1）', '100连续减7（2）', '100连续减7（3）', '100连续减7（4）', '100连续减7（5）'],
            ['sequence-recite', 'inverted-recite', 'beat', 'minus-1', 'minus-2', 'minus-3', 'minus-4', 'minus-5']
        ).getNode(),
        MultiCheckbox(
            '语言',
            'language',
            ['重复句子1', '重复句子2', '流畅性：在1分钟内尽可能多地说出动物的名字'],
            ['repeat-1', 'repeat-2', 'fluency']
        ).getNode(),
        MultiCheckbox(
            '抽象',
            'abstraction',
            ['词语相似性：火车-自行车', '词语相似性：手表-尺子'],
            ['similarity-1', 'similarity-2']
        ).getNode(),
        MultiCheckbox(
            '延迟回忆',
            'delayed-recall',
            ['1', '2', '3', '4', '5'],
            ['face', 'velvet', 'church', 'chrysanthemum', 'red']
        ).getNode(),
        MultiCheckbox(
            '定向',
            'direction',
            ['日期', '月份', '年代', '星期几', '地点', '城市'],
            ['day', 'month', 'year', 'week', 'place', 'city']
        ).getNode(),
    ];
    MoCAChildren.forEach((node) => {
        MoCAForm.appendChild(node);
    });

    // 蒙特利尔认知评估量表
    const MMSEForm = document.querySelector('form[name="cognitive-function"] > .MMSE');
    const MMSEChildren = [
        MultiCheckbox(
            '时间定向力',
            'time-direction',
            ['年', '月', '日', '星期', '季节'],
            ['year', 'month', 'day', 'week', 'season']
        ).getNode(),
        MultiCheckbox(
            '场所定向力',
            'place-direction',
            ['国家', '省、市', '街道（地址）', '什么地方（场所）', '几楼'],
            ['country', 'province', 'street', 'place', 'level']
        ).getNode(),
        MultiCheckbox(
            '记忆力',
            'memory',
            ['花园', '冰箱', '国旗'],
            ['garden', 'refrigerator', 'national-flag']
        ).getNode(),
        MultiCheckbox(
            '计算力',
            'calculation',
            ['100连续减7（1）', '100连续减7（2）', '100连续减7（3）', '100连续减7（4）', '100连续减7（5）'],
            ['minus-1', 'minus-2', 'minus-3', 'minus-4', 'minus-5']
        ).getNode(),
        MultiCheckbox(
            '回忆力',
            'recall',
            ['花园', '冰箱', '国旗'],
            ['garden', 'refrigerator', 'national-flag']
        ).getNode(),
        MultiCheckbox(
            '语言及时空间能力',
            'ability',
            ['提问物品1', '提问物品2', '重复句子', '按指示去做1', '按指示去做2', '按指示去做3', '念，并做', '写句子', '画图'],
            ['what-1', 'what-2', 'repeat', 'execute-1', 'execute-2', 'execute-3', 'speak-and-execute', 'write', 'draw']
        ).getNode(),
    ];
    MMSEChildren.forEach((node) => {
        MMSEForm.appendChild(node);
    });
})();