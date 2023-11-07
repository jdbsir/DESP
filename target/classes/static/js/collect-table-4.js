(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="MoCA"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        let data = {};
        const MoCAChildren = window.collectTableComponent[3].formChildren;
        for (let i = 0; i < MoCAChildren.length; i++) {
            let obj = MoCAChildren[i];
            let valueArray = obj.getValueArray();
            for (let j = 0; j < valueArray.length; j++) {
                let v = valueArray[j];
                data[v] = Number(document.getElementById(`${obj.getName()}_${v}`).checked);
            }
        }
        
        // 初步计分
        const memoryArray = ['IMMT1W1', 'IMMT1W2', 'IMMT1W3', 'IMMT1W4', 'IMMT1W5', 'IMMT2W1', 'IMMT2W2', 'IMMT2W3', 'IMMT2W4', 'IMMT2W5'];
        const attentionArray = ['SERIAL1', 'SERIAL2', 'SERIAL3', 'SERIAL4', 'SERIAL5'];
        let mocaScore = 0;
        for (let k in data) {
            // “记忆”部分不计分、“100连续减7”暂时不计分
            if (!inArray(memoryArray, k) && !inArray(attentionArray, k)) {
                mocaScore = mocaScore + data[k];
            }
        }

        // “100连续减7”单独计分
        let trueCount = 0;
        for (let i = 0; i < attentionArray.length; i++) {
            let k = attentionArray[i];
            trueCount = trueCount + data[k];
        }
        if (trueCount >= 4) {
            mocaScore = mocaScore + 3;
        } else if (trueCount >= 2) {
            mocaScore = mocaScore + 2;
        } else if (trueCount >= 1) {
            mocaScore = mocaScore + 1;
        }
        data['MOCA'] = mocaScore;

        data = upperToLower(data);
        
        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 0) {
                alert(response.msg);
                return undefined;
            }

            if (mocaScore < 26) {
                location.href = `/collect-table-5.html${location.search}`;
            } else {
                location.href = `/collect-table-6.html${location.search}`;
            }
        });
    }
})();