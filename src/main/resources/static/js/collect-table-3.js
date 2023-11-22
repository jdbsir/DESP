(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="health-condition"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        const data = {};
        const alertMessageObject = {
            'visual': '视力情况至少要选一个！',
            'hearing': '听力情况至少要选一个！'
        };
        const healthConditionChildren = window.collectTableComponent[2].formChildren;
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

        // 发送并处理请求
        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/test/collect-table-4.html${location.search}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();
