(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="adl"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    function submitForm(e) {
        e.preventDefault();

        // 获取表单数据并计分
        const data = {};
        let ADLSCORE = 0;
        const adlChildren = window.collectTableComponent[7].formChildren;
        for (let i = 0; i < adlChildren.length; i++) {
            let obj = adlChildren[i];
            let value = obj.getValue();
            data[obj.getName()] = value;
            ADLSCORE = ADLSCORE + value + 1;
        }
        data['adlscore'] = ADLSCORE;

        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/`;
            } else {
                alert(response.msg);
            }
        });
    }
})();