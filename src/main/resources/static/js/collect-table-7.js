(() => {
    'use strict';

    const npiqForm = document.querySelector('form[name="npiq"]');
    const submitButton = npiqForm.querySelector('[type="submit"');
    const npiqChildren = [
        BinaryRadio(
            '老人家有什么你不知道是不真实的信念吗，如坚持认为有人要伤害自己或偷自己的东西？',
            '是',
            '否',
            'NPIA',
            '1',
            '0',
            {controlComponent: '#NPIASEV_box #NPIAPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIASEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIASEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIAPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIAPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家有错误的视觉或声音等幻觉吗？病人似乎看见、听见或感觉到并不存在的东西吗？',
            '是',
            '否',
            'NPIB',
            '1',
            '0',
            {controlComponent: '#NPIBSEV_box #NPIBPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIBSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIBSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIBPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIBPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家有时候拒绝他人帮助自己，或难于相处吗？',
            '是',
            '否',
            'NPIC',
            '1',
            '0',
            {controlComponent: '#NPICSEV_box #NPICPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPICSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPICSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPICPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPICPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家看起来悲伤或说自己感到抑郁吗？',
            '是',
            '否',
            'NPID',
            '1',
            '0',
            {controlComponent: '#NPIDSEV_box #NPIDPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIDSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIDSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIDPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIDPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家与您分开时是否感到不安？是否有其他紧张不安的迹象，如气短、叹息、无法放松或感到过度紧张？',
            '是',
            '否',
            'NPIE',
            '1',
            '0',
            {controlComponent: '#NPIESEV_box #NPIEPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIESEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIESEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIEPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIEPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家看起来是否感觉太好或表现得过度愉快？',
            '是',
            '否',
            'NPIF',
            '1',
            '0',
            {controlComponent: '#NPIFSEV_box #NPIFPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIFSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIFSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIFPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIFPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家是否好像对日常活动或别人的活动和计划不太感兴趣？',
            '是',
            '否',
            'NPIG',
            '1',
            '0',
            {controlComponent: '#NPIGSEV_box #NPIGPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIGSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIGSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIGPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIGPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家是否好像表现得很冲动，如对陌生人说话仿佛自己认识对方，或说一些可能伤害别人感情的话？',
            '是',
            '否',
            'NPIH',
            '1',
            '0',
            {controlComponent: '#NPIHSEV_box #NPIHPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIHSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIHSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIHPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIHPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家是否不耐心或脾气暴躁？病人是否在应付时间延误或等待计划好的活动方面都有困难？',
            '是',
            '否',
            'NPII',
            '1',
            '0',
            {controlComponent: '#NPIISEV_box #NPIIPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIISEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIISEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIIPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIIPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家是否专注于反复动作，如来回踱步、扣纽扣、绕绳子，或反复地做一些事情？',
            '是',
            '否',
            'NPIJ',
            '1',
            '0',
            {controlComponent: '#NPIJSEV_box #NPIJPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIJSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIJSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIJPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIJPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家夜间醒来、早上起得特别早、或白天过度地打瞌睡吗？',
            '是',
            '否',
            'NPIK',
            '1',
            '0',
            {controlComponent: '#NPIKSEV_box #NPIKPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPIKSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPIKSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPIKPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPIKPAIN_box', hidden: true}
        ),
        BinaryRadio(
            '老人家有无体重减轻或体重增加，或喜好食物的类型有变化吗？',
            '是',
            '否',
            'NPIL',
            '1',
            '0',
            {controlComponent: '#NPILSEV_box #NPILPAIN_box'}
        ),
        DropdownSelect(
            '严重程度',
            'NPILSEV',
            ['1', '2', '3'],
            ['0', '1', '2'],
            {id: 'NPILSEV_box', hidden: true}
        ),
        DropdownSelect(
            '痛苦',
            'NPILPAIN',
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2', '3', '4', '5'],
            {id: 'NPILPAIN_box', hidden: true}
        )
    ];
    npiqChildren.forEach((obj) => {
        npiqForm.insertBefore(obj.getNode(), submitButton);
    });
    npiqForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // 获取表单数据并计分
        let data = {};
        let NPISCORE = 0;
        for (let i = 0; i < npiqChildren.length; i = i + 3) {
            let name = npiqChildren[i].getName();
            let answer = npiqChildren[i].getValue();
            let sev = answer === 0 ? 0 : npiqChildren[i + 1].getValue();
            data[name] = answer;
            data[`${name}SEV`] = sev;
            NPISCORE = NPISCORE + answer + sev;
        }
        data['NPISCORE'] = NPISCORE;

        data = upperToLower(data);

        // 发送并处理请求
        const subjectId = encodeURIComponent(parseQueryParam()['subject_id']);
        const postUrl = `${npiqForm.action}?subject_id=${subjectId}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/collect_table_8?${appendQueryParam({'subject_id': subjectId})}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();