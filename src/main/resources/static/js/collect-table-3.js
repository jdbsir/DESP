(() => {
    'use strict';

    // 健康状况
    const healthConditionForm = document.querySelector('form[name="health-condition"]');
    const submitButton = healthConditionForm.querySelector('[type="submit"]');
    const healthConditionChildren = [
        BinaryRadio('您的父母或兄弟姐妹中，是否有人患老年痴呆？', '是', '否', 'family_his', '1', '0'),
        MultiCheckbox(
            '您的视力情况（可多选）',
            'visual',
            ['正常', '视物不清', '几乎看不见', '佩戴老花镜'],
            ['0', '1', '2', '3']
        ),
        MultiCheckbox(
            '您的听力情况（可多选）',
            'hearing',
            ['正常', '声音较大才能听见', '几乎听不见', '佩戴助听器'],
            ['0', '1', '2', '3']
        ),
        BinaryRadio('您是否患慢性疾病', '是', '否', 'chronic_disease', '1', '0', {controlComponent: '#vascular_his_box #other_disease_box #mental_performance_box'}),
        MultiCheckbox(
            '您是否有以下心脑血管病史（可多选或不选）',
            'vascular_his',
            ['高血压', '冠心病', '心肌梗塞', '脑梗塞', '脑卒中', '脑出血'],
            ['0', '1', '2', '3', '4', '5'],
            {otherLabel: '其他心脑血管病', id: 'vascular_his_box', hidden: true}
        ),
        MultiCheckbox(
            '您是否有以下疾病（可多选或不选）',
            'other_disease',
            ['糖尿病', '高脂血症', '脑外伤', '慢性支气管炎/肺气肿', '椎间盘疾病', '骨关节炎', '白内障/青光眼', '肿瘤'],
            ['0', '1', '2', '3', '4', '5', '6', '7'],
            {otherLabel: '其他疾病', id: 'other_disease_box', hidden: true}
        ),
        MultiCheckbox(
            '您是否有以下精神系统疾病表现（可多选或不选）',
            'mental_performance',
            ['焦虑', '抑郁', '烦躁易怒'],
            ['0', '1', '2'],
            {otherLabel: '其他精神系统疾病表现', id: 'mental_performance_box', hidden: true}
        )
    ];
    healthConditionChildren.forEach((obj) => {
        healthConditionForm.insertBefore(obj.getNode(), submitButton);
    });
    healthConditionForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        const data = {};
        const alertMessageObject = {
            'visual': '视力情况至少要选一个！',
            'hearing': '听力情况至少要选一个！'
        };
        for (let i = 0; i < healthConditionChildren.length; i++) {
            let obj = healthConditionChildren[i];
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

        console.log(data);
        ajaxPostJson(healthConditionForm.action, data).then((response) => {
            console.log(response);
        });
    }
})();