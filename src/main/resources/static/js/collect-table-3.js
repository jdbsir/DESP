(() => {
    'use strict';

    // 健康状况
    const healthConditionForm = document.querySelector('form[name="general-info"] > .health-condition');
    const healthConditionChildren = [
        BinaryRadio('您的父母或兄弟姐妹中，是否有人患老年痴呆？', '是', '否', 'kinsfolk-ad', '1', '0'),
        MultiCheckbox(
            '您的视力情况（可多选）',
            'eyesight',
            ['正常', '视物不清', '几乎看不见', '佩戴老花镜'],
            ['normal', 'blurry', 'invisible', 'glasses']
        ),
        MultiCheckbox(
            '您的听力情况（可多选）',
            'hearing',
            ['正常', '声音较大才能听见', '几乎听不见', '佩戴助听器'],
            ['normal', 'blurry', 'inaudibility', 'aid']
        ),
        BinaryRadio('您是否患慢性疾病', '是', '否', 'chronic-disease', '1', '0', {controlComponent: '#ccvd-box #disease-box #mental-disease-box'}),
        MultiCheckbox(
            '您是否有以下心脑血管病史（可多选或不选）',
            'ccvd',
            ['高血压', '冠心病', '心肌梗塞', '脑梗塞', '脑卒中', '脑出血'],
            ['hypertension', 'coronary-disease', 'myocardial-infarction', 'cerebral-infarction', 'stroke', 'hematencephalon'],
            {otherLabel: '其他心脑血管病', id: 'ccvd-box', hidden: true}
        ),
        MultiCheckbox(
            '您是否有以下疾病（可多选或不选）',
            'disease',
            ['糖尿病', '高脂血症', '脑外伤', '慢性支气管炎/肺气肿', '椎间盘疾病', '骨关节炎', '白内障/青光眼', '肿瘤'],
            ['diabetes', 'hyperlipemia', 'cerebral-trauma', 'chronic-bronchitis', 'IVDD', 'osteoarthritis', 'cataract', 'tumour'],
            {otherLabel: '其他疾病', id: 'disease-box', hidden: true}
        ),
        MultiCheckbox(
            '您是否有以下精神系统疾病表现（可多选或不选）',
            'mental-disease',
            ['焦虑', '抑郁', '烦躁易怒'],
            ['anxiety', 'depression', 'testiness'],
            {otherLabel: '其他精神系统疾病表现', id: 'mental-disease-box', hidden: true}
        )
    ];
    healthConditionChildren.forEach((node) => {
        healthConditionForm.appendChild(node);
    });
})();