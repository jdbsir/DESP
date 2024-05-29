(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="MMSE"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    // 当勾选、取消勾选一个选项时，实时计算分数
    const showScoreBox = htmlToNode(`
        <div class="show-score-box">
            <span class="title">MMSE分数：</span>
            <span class="text">0</span>
        </div>
    `);
    form.insertBefore(showScoreBox, document.getElementById('collect-submit-btn'));
    form.querySelectorAll('input[type="checkbox"]').forEach((input) => {
        input.addEventListener('change', (e) => {
            const data = getFormData();
            const mmseScore = computeMMSEScore(data);
            showScoreBox.querySelector('.text').innerHTML = mmseScore;
        });
    });

    function getFormData() {
        // 获取表单值
        const data = {};
        const MMSEChildren = window.collectTableComponent[4].formChildren;
        for (let i = 0; i < MMSEChildren.length; i++) {
            let obj = MMSEChildren[i];
            let valueArray = obj.getValueArray();
            for (let j = 0; j < valueArray.length; j++) {
                let v = valueArray[j];
                data[v] = Number(document.getElementById(`${obj.getName()}_${v}`).checked);
            }
        }

        return data;
    }

    function computeMMSEScore(data) {
        // 计分
        let mmseScore = 0;
        for (let k in data) {
            mmseScore = mmseScore + data[k];
        }
        return mmseScore;
    }

    function submitForm(e) {
        e.preventDefault();

        // 整理表单数据
        let data = getFormData();
        const mmse = computeMMSEScore(data);
        data['MMSE'] = mmse;
        data = upperToLower(data);

        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 0) {
                alert(response.msg);
                return undefined;
            }

            if (mmse > 21) {
                location.href = `/test/collect-table-8.html${location.search}`;
            } else {
                location.href = `/test/collect-table-6.html${location.search}`;
            }
        });
    }
})();
