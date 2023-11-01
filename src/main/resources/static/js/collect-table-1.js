(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="demo-character"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        const data = {};
        const alertMessageObject = {
            'medical_insurance': '医疗保险至少选一个！'
        };
        const demoCharacterChildren = window.collectTableComponent[0].formChildren;
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
        ajaxPostJson(form.action, data).then((response) => {
            if (response.code === 1) {
                const subjectId = encodeURIComponent(response.data.subject_id);
                location.href = `/collect-table-2.html?${appendQueryParam({'subject_id': subjectId})}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();