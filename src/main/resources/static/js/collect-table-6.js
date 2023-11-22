(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="gdscale"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    // 当勾选、取消勾选一个选项时，实时计算分数
    const showScoreBox = htmlToNode(`
        <div class="show-score-box">
            <span class="title">GD分数：</span>
            <span class="text">0</span>
        </div>
    `);
    form.insertBefore(showScoreBox, document.getElementById('collect-submit-btn'));
    form.querySelectorAll('input[type="radio"]').forEach((input) => {
        input.addEventListener('change', (e) => {
            const data = getFormData();
            const GDTOTAL = computeGDTotal(data);
            showScoreBox.querySelector('.text').innerHTML = GDTOTAL;
        });
    });

    function getFormData() {
        // 获取表单数据
        const data = {};
        const gdscaleChildren = window.collectTableComponent[5].formChildren;
        for (let i = 0; i < gdscaleChildren.length; i++) {
            let obj = gdscaleChildren[i];
            let key = obj.getName();
            let value = obj.getValue();
            data[key] = value;
        }

        return data;
    }

    function computeGDTotal(data) {
        let GDTOTAL = 0;
        for (let k in data) {
            GDTOTAL = GDTOTAL + data[k];
        }
        return GDTOTAL;
    }

    function submitForm(e) {
        e.preventDefault();

        // 获取表单数据并计分
        let data = getFormData();
        data['GDTOTAL'] = computeGDTotal(data);
        data = upperToLower(data);

        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/test/collect-table-7.html${location.search}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();
