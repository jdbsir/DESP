(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="adl"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    // 当勾选、取消勾选一个选项时，实时计算分数
    const showScoreBox = htmlToNode(`
        <div class="show-score-box">
            <span class="title">ADL分数：</span>
            <span class="text">14</span>
        </div>
    `);
    form.insertBefore(showScoreBox, document.getElementById('collect-submit-btn'));
    form.querySelectorAll('select').forEach((select) => {
        select.addEventListener('change', (e) => {
            showScoreBox.querySelector('.text').innerHTML = computeADLScore();
        });
    });

    function computeADLScore() {
        let ADLSCORE = 0;
        const adlChildren = window.collectTableComponent[7].formChildren;
        for (let i = 0; i < adlChildren.length; i++) {
            let obj = adlChildren[i];
            let value = obj.getValue();
            ADLSCORE = ADLSCORE + value + 1;
        }

        return ADLSCORE;
    }

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
                location.href = `/test/index.html`;
            } else {
                alert(response.msg);
            }
        });
    }
})();
