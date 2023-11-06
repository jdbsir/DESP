(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="gdscale"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    function submitForm(e) {
        e.preventDefault();

        // 获取表单数据并计分
        let data = {};
        let GDTOTAL = 0;
        const gdscaleChildren = window.collectTableComponent[5].formChildren;
        for (let i = 0; i < gdscaleChildren.length; i++) {
            let obj = gdscaleChildren[i];
            let key = obj.getName();
            let value = obj.getValue();
            data[key] = value;
            GDTOTAL = GDTOTAL + value;
        }
        data['GDTOTAL'] = GDTOTAL;

        data = upperToLower(data);

        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/collect-table-7.html${location.search}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();