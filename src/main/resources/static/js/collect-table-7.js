(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="npiq"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    function submitForm(e) {
        e.preventDefault();

        // 获取表单数据并计分
        let data = {};
        let NPISCORE = 0;
        const npiqChildren = window.collectTableComponent[6].formChildren;
        for (let i = 0; i < npiqChildren.length; i = i + 3) {
            let name = npiqChildren[i].getName();
            let answer = npiqChildren[i].getValue();
            let sev = answer === 0 ? 0 : npiqChildren[i + 1].getValue();
            data[name] = answer;
            data[`${name}SEV`] = sev;
            NPISCORE = NPISCORE + Number(answer === 0 ? 0 : sev + 1);
        }
        data['NPISCORE'] = NPISCORE;

        data = upperToLower(data);

        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/collect-table-8.html${location.search}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();