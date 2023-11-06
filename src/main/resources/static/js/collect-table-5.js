(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="MMSE"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        let data = {};
        const MMSEChildren = window.collectTableComponent[4].formChildren;
        for (let i = 0; i < MMSEChildren.length; i++) {
            let obj = MMSEChildren[i];
            let valueArray = obj.getValueArray();
            for (let j = 0; j < valueArray.length; j++) {
                let v = valueArray[j];
                data[v] = Number(document.getElementById(`${obj.getName()}_${v}`).checked);
            }
        }

        // 计分
        let mmseScore = 0;
        for (let k in data) {
            mmseScore = mmseScore + data[k];
        }
        data['MMSE'] = mmseScore;

        data = upperToLower(data);

        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/collect-table-6.html${location.search}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();