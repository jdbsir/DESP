(() => {
    'use strict';

    // 渲染html
    renderCollectTable();
    const form = document.querySelector('form[name="life-mode"]');
    form.addEventListener('submit', submitForm);

    // readonly模式
    readonlyMode();

    function submitForm(e) {
        e.preventDefault();

        // 获取表单值
        const data = {};
        const alertMessageObject = {
            'diet': '饮食口味至少选一个！',
            'food_extra': '除主食外食物至少选一个！',
            'alcohol_type': '饮酒种类至少选一个！',
            'exercise_type': '体育锻炼项目至少选一个！'
        };
        const lifeModeChildren = window.collectTableComponent[1].formChildren;
        for (let i = 0; i < lifeModeChildren.length; i++) {
            let obj = lifeModeChildren[i];
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

        // 转换成正数int
        const positiveIntCheckObject = {
            'smoke_year': '吸烟年数',
            'smoke_day': '平均吸烟（支/天）',
            'alcohol_day': '平均饮酒（毫升/天）',
            'drink_tea_day': '平均喝茶（杯/天）',
            'oiltea_day': '平均喝油茶（碗/天）'
        };
        for (let k in positiveIntCheckObject) {
            let v = data[k];
            if (v !== '' && !positiveFloatCheck(v)) {
                alert(`${positiveIntCheckObject[k]}不合法！`);
                return undefined;
            }
            data[k] = v === '' ? 0 : parseInt(v);
        }

        // 发送并处理请求
        const postUrl = `${form.action}${location.search}`;
        ajaxPostJson(postUrl, data).then((response) => {
            if (response.code === 1) {
                location.href = `/test/collect-table-3.html${location.search}`;
            } else {
                alert(response.msg);
            }
        });
    }
})();
