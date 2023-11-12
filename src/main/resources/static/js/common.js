// region 工具函数
function inArray(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

function parseQueryParam(search) {
    if (search === undefined) {
        search = location.search.slice(1);
    }
    if (search === '' || search === '?') {
        return {};
    }

    const items = search.split('&');
    const queryParam = {};
    for (let i = 0; i < items.length; i++) {
        let kv = items[i].split('=', 2);
        let key = decodeURIComponent(kv[0]);
        let value = decodeURIComponent(kv[1]);
        queryParam[key] = value;
    }

    return queryParam;
}

function unparseQueryParam(obj) {
    if (Object.keys(obj).length === 0) {
        return '';
    }

    const qp = [];
    for (let k in obj) {
        let v = obj[k];
        qp.push(`${k}=${v}`);
    }
    return qp.join('&');
}

function appendQueryParam(obj) {
    const qpObj = parseQueryParam();
    for (let k in obj) {
        qpObj[k] = obj[k];
    }
    return unparseQueryParam(qpObj);
}

function upperToLower(data) {
    const newData = {};
    for (let k in data) {
        newData[k.toLowerCase()] = data[k];
    }
    return newData;
}

function lowerToUpper(data) {
    const newData = {};
    for (let k in data) {
        newData[k.toUpperCase()] = data[k];
    }
    return newData;
}

function htmlToNode(html) {
    const parent = document.createElement('div');
    parent.innerHTML = html;
    return parent.children[0];
}

function fullCollectTable1(data) {
    const filterArray = ['id', 'subject_id', 'time', 'unix_timestamp', 'gdtotal', 'npiscore', 'adlscore'];
    const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
    const c = window.collectTableComponent[tableIndex - 1];
    const form = document.querySelector(`form[name="${c.formName}"]`);
    for (let name in data) {
        if (inArray(filterArray, name.toLowerCase())) {
            continue;
        }
        let node = form.querySelector(`[name="${name}"]`);
        try {
            node.parentElement;
        } catch (err) {
            debugger;
        }
        while (node.parentElement.self === undefined) {
            node = node.parentElement;
        }
        node.parentElement.self.setValue(name, data[name]);
    }
}

function fullCollectTable2(data) {
    const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
    const c = window.collectTableComponent[tableIndex - 1];
    const form = document.querySelector(`form[name="${c.formName}"]`);

    for (let i = 0; i < form.children.length; i++) {
        if (form.children[i].nodeName !== 'DIV') {
            continue;
        }
        let div = form.children[i];
        let prefix = '';
        for (let i = 0; i < div.classList.length; i++) {
            if (div.classList[i] !== 'checkbox') {
                prefix = div.classList[i];
                break;
            }
        }
        const prefixLength = prefix.length + 1;
        div.querySelectorAll(`input[type="checkbox"][name^="${prefix}"]`).forEach((input) => {
            const key = input.id.slice(prefixLength);
            input.checked = Boolean(data[key]);
        });
    }
}

function setReadonlyForm() {
    const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
    const c = window.collectTableComponent[tableIndex - 1];
    c.formChildren.forEach((obj) => {
        obj.readonly(true);
    });
    const nextPageButton = document.getElementById('next-page-btn');
    document.getElementById('collect-submit-btn').classList.add('hidden');
    nextPageButton.classList.remove('hidden');
    nextPageButton.addEventListener('click', (e) => {
        const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
        if (tableIndex === 8) {
            location.href = '/';
        } else if (tableIndex === 4) {
            const mocaScore = parseInt(document.querySelector('form .show-score-box .text').innerHTML);
            const nextTableIndex = mocaScore < 26 ? 5 : 6;
            location.href = `collect-table-${nextTableIndex}.html${location.search}`;
        } else {
            location.href = `collect-table-${tableIndex + 1}.html${location.search}`;
        }
    });
}

function readonlyMode() {
    const scoreKeyMapping = {
        4: 'MOCA',
        5: 'MMSE',
        6: 'GDTOTAL',
        7: 'NPISCORE',
        8: 'adlscore'
    };

    if (parseQueryParam()['readonly'] !== '1') {
        return undefined;
    }

    const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
    return queryCollectTable().then((data) => {
        // 把后端响应的字段转换为大写
        if (tableIndex >= 4 && tableIndex <= 7) {
            data = lowerToUpper(data);
        }

        // 渲染表单组件
        if (tableIndex === 4 || tableIndex === 5) {
            fullCollectTable2(data);
        } else {
            fullCollectTable1(data);
        }

        // 渲染第4-8张表的分数
        if (tableIndex >= 4) {
            document.querySelector('form .show-score-box .text').innerHTML = data[scoreKeyMapping[tableIndex]];
        }

        // 使组件不可编辑
        setReadonlyForm();
        return new Promise((resolve, reject) => { resolve(data); });
    });
}

function renderCollectTable() {
    // 生成表单组件
    const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
    const c = window.collectTableComponent[tableIndex - 1];
    const form = document.querySelector(`form[name="${c.formName}"]`);
    const submitButton = document.getElementById('collect-submit-btn');
    c.formChildren.forEach((obj) => {
        form.insertBefore(obj.getNode(), submitButton);
    });

    // 添加“返回主页”按钮
    const backHomepageButton = htmlToNode(`
        <div class="collect-table-back-homepage">
            <a href="/index.html">返回主页</a>
        </div>
    `);
    document.getElementById('app').insertBefore(backHomepageButton, form);
}
// endregion

// region 生成HTML组件的函数
function LeftRightInput(type, title, name, options) {
    let html;
    let node;
    let self;
    options = options === undefined ? {} : options;

    function getName() {
        return name;
    }
    
    function getHtml() {
        if (html === undefined) {
            // 控制id、required、hidden
            const id = options.id === undefined ? '' : options.id;
            const dataRequired = options.dataRequired === true ? 'data-required' : '';
            const hidden = options.hidden === true ? 'hidden' : '';
            
            // 控制required
            let required = 'required';
            if (hidden === 'hidden' || options.required === false) {
                required = '';
            }

            html = `<div id="${id}" class="left-right-2 ${name} ${hidden}">
                <label for="${name}" class="left">${title}</label>
                <input type="${type}" class="right" id="${name}" name="${name}" ${required} autocomplete="off" ${dataRequired} />
            </div>`;
        }
        return html;
    }
    
    function getNode(callback) {
        if (node === undefined) {
            node = htmlToNode(getHtml());
        }
        node.self = self;
        callback && callback(node);
        return node;
    }

    function check() {
        return true;
    }

    function getValue() {
        return getNode().querySelector(`input[name="${name}"]`).value;
    }

    function readonly(v) {
        const input = getNode().querySelector(`input[name="${name}"]`);
        if (v) {
            input.setAttribute('disabled', 'disabled');
        } else {
            input.removeAttribute('disabled');
        }
    }

    function setValue(k, v) {
        getNode().querySelector(`input[name="${k}"]`).value = v;
    }
    
    self = {
        className: 'LeftRightInput',
        getName: getName,
        options: options,
        getHtml: getHtml,
        getNode: getNode,
        check: check,
        getValue: getValue,
        readonly, readonly,
        setValue: setValue
    }

    return self;
}

function BinaryRadio(title, label1, label0, name, value1, value0, options) {
    let html;
    let node;
    let self;
    options = options === undefined ? {} : options;

    function getName() {
        return name;
    }
    
    function getHtml() {
        if (html === undefined) {
            // 控制选择单选框后显示、隐藏什么元素
            let target1 = '';
            let target0 = '';
            if (options.controlComponent !== undefined) {
                target1 = `data-target="${options.controlComponent}" data-target-show="1"`;
                target0 = `data-target="${options.controlComponent}" data-target-show="0"`;
            }

            html = `<div class="left-right-2 binary ${name}">
                <label class="left">${title}</label>
                <div class="right">
                    <input type="radio" id="${name}_${value1}" name="${name}" value="${value1}" required ${target1} />
                    <label for="${name}_${value1}">${label1}</label>
                    <input type="radio" id="${name}_${value0}" name="${name}" value="${value0}" required ${target0} />
                    <label for="${name}_${value0}">${label0}</label>
                </div>
            </div>`;
        }
        return html;
    }
    
    function controlShowHidden(e) {
        let showFunction;
        if (e.target.getAttribute('data-target-show') === '1') {
            showFunction = (n) => {
                n.querySelectorAll('input[data-required]').forEach((input) => {
                    input.setAttribute('required', 'required');
                });
                n.classList.remove('hidden')
            };
        } else {
            showFunction = (n) => {
                n.querySelectorAll('input[data-required]').forEach((input) => {
                    input.removeAttribute('required');
                });
                n.classList.add('hidden')
            };
        }
        e.target.getAttribute('data-target').split(' ').forEach((qs) => {
            showFunction(document.querySelector(qs));
        });
    }
    
    function getNode(callback) {
        if (node === undefined) {
            node = htmlToNode(getHtml());
            
            // 如果有单选框需要控制显示、隐藏的元素，则注册事件
            if (options.controlComponent !== undefined) {
                node.querySelectorAll('[data-target]').forEach((dt) => {
                    dt.addEventListener('click', controlShowHidden);
                });
            }
        }
        node.self = self;
        callback && callback(node);
        return node;
    }

    function check() {
        return true;
    }

    function getValue() {
        const inputArray = getNode().querySelectorAll(`input[name="${name}"]`);
        let result = null;
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i].checked) {
                result = inputArray[i].value;
                break;
            }
        }
        if (result !== null && (result === '0' || result === '1')) {
            result = parseInt(result);
        }
        return result;
    }

    function readonly(v) {
        const nodes = getNode().querySelectorAll(`input[name="${name}"]`);
        const action = v ? (n) => { n.setAttribute('disabled', 'disabled') } : (n) => { n.removeAttribute('disabled') };
        nodes.forEach((n) => {
            action(n);
        });
    }

    function setValue(k, v) {
        getNode().querySelector(`input[name="${k}"][value="${v}"]`).click();
    }

    self = {
        className: 'BinaryRadio',
        getName: getName,
        options: options,
        getHtml: getHtml,
        getNode: getNode,
        check: check,
        getValue: getValue,
        readonly, readonly,
        setValue: setValue
    }
    return self;
}

function DropdownSelect(title, name, labelArr, valueArr, options) {
    let html;
    let node;
    let self;
    options = options === undefined ? {} : options;

    function getName() {
        return name;
    }
    
    function getHtml() {
        if (html === undefined) {
            // 生成选项
            const optionsArr = [];
            for (let i = 0; i < labelArr.length; i++) {
                let label = labelArr[i];
                let value = valueArr[i];
                optionsArr.push(`<option value="${value}">${label}</option>`);
            }
            const optionsNode = optionsArr.join('');
            
            // 加入“其他”选项
            let includeOtherInputClass = '';
            let otherOption = '';
            let otherInputBox = '';
            if (options.otherLabel !== undefined) {
                includeOtherInputClass = 'include-other-input';
                otherOption = `<option data-other-input="1" data-target="#other_${name}_input">其他</option>`;
                otherInputBox = `<div id="other_${name}_input" class="left-right-2 hidden">
                    <label for="${name}_other" class="left">${options.otherLabel}</label>
                    <input type="text" id="${name}_other" class="right" name="${name}_other" autocomplete="off" />
                </div>`;
            }
            
            // 控制id、hidden
            const id = options.id === undefined ? '' : options.id;
            const hidden = options.hidden === true ? 'hidden' : '';

            // 生成html
            html = `<div id="${id}" class="left-right-2 ${includeOtherInputClass} ${name} ${hidden}">
                <label for="${name}" class="left">${title}</label>
                <select id="${name}" class="right" name="${name}" required>
                    ${optionsNode}
                    ${otherOption}
                </select>
                ${otherInputBox}
            </div>`;
        }
        return html;
    }

    function showSelectOtherInput(e) {
        const select = e.target;
        const selectedOption = select.selectedOptions[0];
        if (selectedOption.getAttribute('data-other-input') !== '1') {
            // 隐藏自定义输入表单项
            const targetQS = select.querySelector('option[data-target]').getAttribute('data-target');
            const otherInput = document.querySelector(targetQS);
            otherInput.querySelectorAll('input').forEach((input) => {
                input.removeAttribute('required');
            });
            otherInput.classList.add('hidden');
        } else {
            // 显示自定义输入表单项
            const targetQS = selectedOption.getAttribute('data-target');
            const otherInput = document.querySelector(targetQS);
            otherInput.querySelectorAll('input').forEach((input) => {
                input.setAttribute('required', 'required');
            });
            otherInput.classList.remove('hidden');
        }
    }

    function getNode(callback) {
        if (node === undefined) {
            node = htmlToNode(getHtml());
            
            // 如果有“其他”选项存在，则注册显示、隐藏其他选项输入框的事件
            if (options.otherLabel !== undefined) {
                node.querySelector('select').addEventListener('change', showSelectOtherInput);
            }
        }
        node.self = self;
        callback && callback(node);
        return node;
    }

    function check() {
        return true;
    }

    function getValue() {
        let value = null;
        const optionArray = getNode().querySelectorAll(`select[name="${name}"] > option[value]`);
        for (let i = 0; i < optionArray.length; i++) {
            if (optionArray[i].selected) {
                value = parseInt(optionArray[i].value);
                break;
            }
        }

        // 1. 没有“其他”输入框
        if (options.otherLabel === undefined) {
            return value;
        }

        // 2. 有“其他”输入框，但没有选择“其他”
        const result = {};
        if (value !== null) {
            result[name] = value;
            result[`${name}_other`] = '';
            return result;
        }

        // 3. 有“其他”输入框，并且选择“其他”
        result[name] = getNode().querySelector(`select[name="${name}"] > option[data-other-input="1"]`).innerHTML;
        result[`${name}_other`] = getNode().querySelector(`input[name="${name}_other"]`).value;
        return result;
    }

    function setValue(k, v) {
        let node = getNode().querySelector(`select[name="${k}"] > option[value="${v}"]`);
        if (node !== null) {
            node.selected = true;
            return undefined;
        }
        const nodes = getNode().querySelectorAll(`select[name="${k}"] > option`);
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].innerHTML === v) {
                nodes[i].selected = true;
                document.querySelector(nodes[i].getAttribute('data-target')).classList.remove('hidden');
                return undefined;
            }
        }
        node = getNode().querySelector(`input[name="${k}"]`);
        if (node !== null) {
            node.value = v;
        }
    }

    function readonly(v) {
        const nodes = [getNode().querySelector(`select[name="${name}"]`)];
        const action = v ? (n) => { n.setAttribute('disabled', 'disabled') } : (n) => { n.removeAttribute('disabled') };
        if (options.otherLabel !== undefined) {
            nodes.push(getNode().querySelector(`input[name="${name}_other"]`));
        }
        nodes.forEach((n) => {
            action(n);
        });
    }

    self = {
        className: 'DropdownSelect',
        getName: getName,
        options: options,
        getHtml: getHtml,
        getNode: getNode,
        check: check,
        getValue: getValue,
        readonly, readonly,
        setValue, setValue
    }
    return self;
}

function MultiCheckbox(title, name, labelArr, valueArr, options) {
    let html;
    let node;
    let self;
    options = options === undefined ? {} : options;

    function getName() {
        return name;
    }
    
    function getHtml() {
        if (html === undefined) {
            // 生成选项
            const optionsArr = [];
            for (let i = 0; i < labelArr.length; i++) {
                let label = labelArr[i];
                let value = valueArr[i];
                optionsArr.push(`<label for="${name}_${value}">
                    <input type="checkbox" id="${name}_${value}" name="${name}" />
                    ${label}
                </label>`);
            }
            const optionsNode = optionsArr.join('');
            
            // 加入“其他”选项
            let otherInputBox = '';
            if (options.otherLabel !== undefined) {
                otherInputBox = `<div class="left-right-2">
                    <label for="${name}_other" class="left">${options.otherLabel}</label>
                    <input type="text" id="${name}_other" class="right" name="${name}_other" autocomplete="off" />
                </div>`;
            }
            
            // 控制id、required、hidden
            const id = options.id === undefined ? '' : options.id;
            const required = options.required === true ? 'required' : '';
            const hidden = options.hidden === true ? 'hidden' : '';
        
            // 生成html
            html = `<div id="${id}" class="checkbox ${name} ${hidden}">
                <fieldset ${required}>
                    <legend>${title}</legend>
                    ${optionsNode}
                </fieldset>
                ${otherInputBox}
            </div>`;
        }
        return html;
    }

    function getNode(callback) {
        if (node === undefined) {
            node = htmlToNode(getHtml());
        }
        node.self = self;
        callback && callback(node);
        return node;
    }

    function check() {
        if (!options.required || inArray(getNode().classList, 'hidden')) {
            return true;
        }
        const inputArray = getNode().querySelectorAll(`input[name="${name}"]`);
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i].checked) {
                return true;
            }
        }
        const otherValue = getNode().querySelector(`input[name="${name}_other"]`).value;
        return options.otherLabel !== undefined && otherValue !== '';
    }

    function getValue() {
        let values = [];
        getNode().querySelectorAll(`input[name="${name}"]`).forEach((input) => {
            values.push(Number(input.checked));
        });
        values = values.join('');
        if (options.otherLabel === undefined) {
            return values;
        }
        const result = {};
        result[name] = values;
        result[`${name}_other`] = getNode().querySelector(`input[name="${name}_other"]`).value;
        return result;
    }

    function getValueArray() {
        return valueArr;
    }

    function readonly(v) {
        const nodes = Array.from(getNode().querySelectorAll(`input[name="${name}"]`));
        const action = v ? (n) => { n.setAttribute('disabled', 'disabled') } : (n) => { n.removeAttribute('disabled') };
        if (options.otherLabel !== undefined) {
            nodes.push(getNode().querySelector(`input[name="${name}_other"]`));
        }
        nodes.forEach((n) => {
            action(n);
        });
    }

    function setValue(k, v) {
        const inputArray = getNode().querySelectorAll(`[name="${k}"]`);
        if (inputArray.length === 1) {
            inputArray[0].value = v;
            return undefined;
        }
        for (let i = 0; i < inputArray.length; i++) {
            inputArray[i].checked = Boolean(parseInt(v.charAt(i)));
        }
    }

    self = {
        className: 'MultiCheckbox',
        getName: getName,
        options: options,
        getHtml: getHtml,
        getNode: getNode,
        check: check,
        getValue: getValue,
        getValueArray: getValueArray,
        readonly, readonly,
        setValue: setValue
    }
    return self;
}
// endregion

// region 表单验证的函数
function phoneNumberCheck(num) {
    return /^1[0-9]{10}$/g.test(num);
}

function positiveFloatCheck(num) {
    return /^[0-9]+.?[0-9]*$/g.test(num);
}
// endregion

// region AJAX
function ajaxPostJson(url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('readystatechange', (e) => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            }
        });
        xhr.send(JSON.stringify(data));
    });
}

function ajaxGetJson(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('readystatechange', (e) => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            }
        });
        xhr.send();
    });
}

function queryCollectTable() {
    const routeMapping = [
        'queryDemoCharacterById',
        'querylifestyle',
        'queryhealth',
        'querymoca',
        'querymmse',
        'querygdscale',
        'querynpiq',
        'queryadl'
    ];
    const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
    const subjectId = tableIndex === 1 ? 'id' : 'subject_id';
    const url = `/${routeMapping[tableIndex - 1]}?${subjectId}=${parseQueryParam()['id']}`;
    return ajaxGetJson(url).then((response) => {
        let data = {};
        if (response.code === 1) {
            data = tableIndex === 1 ? response.data[0] : response.data;
        } else {
            alert(response.msg);
        }
        return new Promise((resolve, reject) => { resolve(data) });
    });
}
// endregion

// region 收集表组件
window.collectTableComponent = [
    {
        formName: 'demo-character',
        formChildren: [
            LeftRightInput('text', '身份证号', 'id_card'),
            LeftRightInput('text', '姓名', 'name'),
            BinaryRadio('性别', '男', '女', 'gender', 'man', 'woman'),
            LeftRightInput('month', '出生年月', 'born_date'),
            LeftRightInput('tel', '电话', 'phone'),
            LeftRightInput('tel', '家属电话', 'home_phone'),
            LeftRightInput('text', '住址', 'address'),
            DropdownSelect(
                '民族',
                'race',
                ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族'],
                ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族'],
                {otherLabel: '其他民族'}
            ),
            DropdownSelect(
                '汉语交流',
                'fluency',
                ['无困难', '有困难', '无法交流'],
                ['0', '1', '2']
            ),
            DropdownSelect(
                '居住地',
                'area_type',
                ['城市', '乡镇', '农村'],
                ['0', '1', '2']
            ),
            DropdownSelect(
                '居住方式',
                'live_type',
                ['独居', '只与配偶同住', '与配偶、子女同住', '与亲戚同住'],
                ['独居', '只与配偶同住', '与配偶、子女同住', '与亲戚同住'],
                {otherLabel: '其他居住方式'}
            ),
            DropdownSelect(
                '文化程度',
                'education',
                ['不识字/识字少', '小学', '初中', '高中/职高', '大专', '本科及以上'],
                ['0', '1', '2', '3', '4', '5']
            ),
            DropdownSelect(
                '婚姻',
                'marital',
                ['已婚', '离异', '配偶过世', '未婚'],
                ['0', '1', '2', '3', '4']
            ),
            BinaryRadio('是否离退休', '是', '否', 'retire', '1', '0'),
            DropdownSelect(
                '职业（在职/离退休前）',
                'occupation',
                ['机关、企事业负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔水利生产人员', '生产、运输设备操作及有关人员', '军人', '无业'],
                ['机关、企事业负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔水利生产人员', '生产、运输设备操作及有关人员', '军人', '无业']
            ),
            DropdownSelect(
                '经济收入来源',
                'income',
                ['退休金', '儿女供给', '劳动所得', '社会救助'],
                ['退休金', '儿女供给', '劳动所得', '社会救助'],
                {otherLabel: '其他收入来源'}
            ),
            DropdownSelect(
                '收入情况',
                'income_level',
                ['1000元以下', '1001-2000', '2001-3000', '3001-4000', '4001-5000', '5001-6000', '6001元以上'],
                ['0', '1', '2', '3', '4', '5', '6']
            ),
            MultiCheckbox(
                '医疗保险（可多选）',
                'medical_insurance',
                ['城镇职工医疗保险', '城镇居民基本保险', '新型农村合作医疗保险', '城乡医疗救助', '商业医疗险', '自费'],
                ['0', '1', '2', '3', '4', '5'],
                {required: true}
            ),
            LeftRightInput('text', '身高（厘米）', 'height'),
            LeftRightInput('text', '体重（公斤）', 'weight'),
            LeftRightInput('text', '腰围（厘米）', 'waistline'),
            LeftRightInput('text', '收缩压（mmHg）', 'systolic_pressure'),
            LeftRightInput('text', '舒张压（mmHg）', 'diastolic_pressure')
        ]
    },
    {
        formName: 'life-mode',
        formChildren: [
            DropdownSelect(
                '您的睡眠情况是',
                'sleep',
                ['良好', '一般', '较差'],
                ['0', '1', '2']
            ),
            DropdownSelect(
                '您每天的睡眠（午间和夜间）时间',
                'sleep_time_day',
                ['小于4小时', '4-6小时', '6-8小时', '大于8小时'],
                ['0', '1', '2', '3']
            ),
            MultiCheckbox(
                '您的饮食口味是（可多选）',
                'diet',
                ['清淡', '偏油', '偏咸', '偏甜', '偏辣'],
                ['0', '1', '2', '3', '4'],
                {required: true}
            ),
            MultiCheckbox(
                '您平时除主食（米饭、面等）外，还经常吃下面哪种食物：（可多选）',
                'food_extra',
                ['肉类', '蔬菜类', '牛奶、豆制品', '水果', '坚果'],
                ['0', '1', '2', '3', '4'],
                {otherLabel: '其他食物', required: true}
            ),
            DropdownSelect(
                '您常吃新鲜的肉类、蔬菜、水果吗？',
                'fresh_food',
                ['经常', '很少', '不确定'],
                ['0', '1', '2']
            ),
            BinaryRadio('您经常吃腊肉、腊肠、泡菜、咸菜吗？', '是', '否', 'preserved_food', '1', '0'),
            BinaryRadio('您经常吃维生素或其他营养素吗？', '是', '否', 'nutrient', '1', '0'),
            BinaryRadio('您是否吸烟', '是', '否', 'smoke', '1', '0', {controlComponent: '#smoke_rate_box #smoke_year_box #smoke_day_box'}),
            DropdownSelect(
                '吸烟频率',
                'smoke_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'smoke_rate_box', hidden: true}
            ),
            LeftRightInput('number', '吸烟年数', 'smoke_year', {id: 'smoke_year_box', hidden: true, dataRequired: true}),
            LeftRightInput('number', '平均吸烟（支/天）', 'smoke_day', {id: 'smoke_day_box', hidden: true, dataRequired: true}),
            BinaryRadio('您是否饮酒', '是', '否', 'alcohol_abuse', '1', '0', {controlComponent: '#alcohol_abuse_rate_box #alcohol_type_box #alcohol_day_box'}),
            DropdownSelect(
                '饮酒频率',
                'alcohol_abuse_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'alcohol_abuse_rate_box', hidden: true}
            ),
            MultiCheckbox(
                '饮酒的种类（可多选）',
                'alcohol_type',
                ['白酒', '红酒', '啤酒'],
                ['0', '1', '2'],
                {otherLabel: '其他酒类', id: 'alcohol_type_box', required: true, hidden: true}
            ),
            LeftRightInput('number', '平均饮酒（毫升/天）', 'alcohol_day', {id: 'alcohol_day_box', hidden: true, dataRequired: true}),
            BinaryRadio('您是否喝茶', '是', '否', 'drink_tea', '1', '0', {controlComponent: '#drink_tea_rate_box #drink_tea_day_box'}),
            DropdownSelect(
                '喝茶频率',
                'drink_tea_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'drink_tea_rate_box', hidden: true}
            ),
            LeftRightInput('number', '平均喝茶（杯/天，按50毫升杯子为准）', 'drink_tea_day', {id: 'drink_tea_day_box', hidden: true, dataRequired: true}),
            BinaryRadio('您是否喝油茶', '是', '否', 'oiltea', '1', '0', {controlComponent: '#oiltea_rate_box #oiltea_day_box'}),
            DropdownSelect(
                '喝油茶频率',
                'oiltea_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'oiltea_rate_box', hidden: true}
            ),
            LeftRightInput('number', '平均喝油茶（碗/天）', 'oiltea_day', {id: 'oiltea_day_box', hidden: true, dataRequired: true}),
            BinaryRadio('您是否有阅读（读书/看报）习惯', '是', '否', 'read_book', '1', '0', {controlComponent: '#read_rate_box'}),
            DropdownSelect(
                '阅读频率',
                'read_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'read_rate_box', hidden: true}
            ),
            BinaryRadio('您是否看电视', '是', '否', 'watch_tv', '1', '0', {controlComponent: '#watch_tv_rate_box'}),
            DropdownSelect(
                '看电视频率',
                'watch_tv_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'watch_tv_rate_box', hidden: true}
            ),
            BinaryRadio('您是否听广播', '是', '否', 'radio', '1', '0', {controlComponent: '#radio_rate_box'}),
            DropdownSelect(
                '听广播频率',
                'radio_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'radio_rate_box', hidden: true}
            ),
            BinaryRadio('您是否使用智能手机并上网', '是', '否', 'use_smartphone', '1', '0', {controlComponent: '#use_smartphone_rate_box'}),
            DropdownSelect(
                '使用智能手机上网的频率',
                'use_smartphone_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'use_smartphone_rate_box', hidden: true}
            ),
            BinaryRadio('您是否做家务', '是', '否', 'housework', '1', '0', {controlComponent: '#housework_rate_box'}),
            DropdownSelect(
                '做家务的频率',
                'housework_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'housework_rate_box', hidden: true}
            ),
            BinaryRadio('您是否参加体育锻炼', '是', '否', 'exercise', '1', '0', {controlComponent: '#exercise_rate_box #exercise_type_box'}),
            DropdownSelect(
                '体育锻炼的频率',
                'exercise_rate',
                ['每天', '经常（3-6天/周）', '偶尔（1-2天/周）'],
                ['0', '1', '2'],
                {id: 'exercise_rate_box', hidden: true}
            ),
            MultiCheckbox(
                '体育锻炼项目（可多选）',
                'exercise_type',
                ['散步', '慢跑', '健身操', '太极拳', '广场舞', '球类'],
                ['0', '1', '2', '3', '4', '5'],
                {otherLabel: '其他体育锻炼项目', id: 'exercise_type_box', required: true, hidden: true}
            ),
            MultiCheckbox(
                '兴趣爱好（可多选或不选）',
                'hobby',
                ['书法绘画', '手工活动', '摄影', '演奏乐器'],
                ['0', '1', '2', '3'],
                {otherLabel: '其他兴趣爱好'}
            ),
            MultiCheckbox(
                '参与的文娱活动（可多选或不选）',
                'recreational_activities',
                ['棋牌（扑克、麻将、象棋等）', '唱歌', '跳舞', '音乐表演'],
                ['0', '1', '2', '3'],
                {otherLabel: '其他文娱活动'}
            ),
            MultiCheckbox(
                '参与的社交活动（可多选或不选）',
                'social',
                ['探亲访友', '社区活动', '聚会', '旅游'],
                ['0', '1', '2', '3'],
                {otherLabel: '其他社交活动'}
            ),
            DropdownSelect(
                '您与子女的关系',
                'personal_relationship',
                ['亲密', '一般', '不好'],
                ['0', '1', '2']
            )
        ]
    },
    {
        formName: 'health-condition',
        formChildren: [
            BinaryRadio('您的父母或兄弟姐妹中，是否有人患老年痴呆？', '是', '否', 'family_his', '1', '0'),
            MultiCheckbox(
                '您的视力情况（可多选）',
                'visual',
                ['正常', '视物不清', '几乎看不见', '佩戴老花镜'],
                ['0', '1', '2', '3']
            ),
            MultiCheckbox(
                '您的听力情况（可多选）',
                'hearing',
                ['正常', '声音较大才能听见', '几乎听不见', '佩戴助听器'],
                ['0', '1', '2', '3']
            ),
            BinaryRadio('您是否患慢性疾病', '是', '否', 'chronic_disease', '1', '0', {controlComponent: '#vascular_his_box #other_disease_box #mental_performance_box'}),
            MultiCheckbox(
                '您是否有以下心脑血管病史（可多选或不选）',
                'vascular_his',
                ['高血压', '冠心病', '心肌梗塞', '脑梗塞', '脑卒中', '脑出血'],
                ['0', '1', '2', '3', '4', '5'],
                {otherLabel: '其他心脑血管病', id: 'vascular_his_box', hidden: true}
            ),
            MultiCheckbox(
                '您是否有以下疾病（可多选或不选）',
                'other_disease',
                ['糖尿病', '高脂血症', '脑外伤', '慢性支气管炎/肺气肿', '椎间盘疾病', '骨关节炎', '白内障/青光眼', '肿瘤'],
                ['0', '1', '2', '3', '4', '5', '6', '7'],
                {otherLabel: '其他疾病', id: 'other_disease_box', hidden: true}
            ),
            MultiCheckbox(
                '您是否有以下精神系统疾病表现（可多选或不选）',
                'mental_performance',
                ['焦虑', '抑郁', '烦躁易怒'],
                ['0', '1', '2'],
                {otherLabel: '其他精神系统疾病表现', id: 'mental_performance_box', hidden: true}
            )
        ]
    },
    {
        formName: 'MoCA',
        formChildren: [
            MultiCheckbox(
                '视空间与执行功能',
                'space_function',
                ['连线：1甲2乙3丙4丁5戊', '复制立方体', '画钟表：轮廓', '画钟表：数字', '画钟表：指针'],
                ['TRAILS', 'CUBE', 'CLOCKCON', 'CLOCKNO', 'CLOCKHAN']
            ),
            MultiCheckbox(
                '命名',
                'name',
                ['1', '2', '3'],
                ['LION', 'RHINO', 'CAMEL']
            ),
            MultiCheckbox(
                '记忆',
                'memory',
                ['第一次：面孔', '第一次：天鹅绒', '第一次：教堂', '第一次：菊花', '第一次：红色', '第二次：面孔', '第二次：天鹅绒', '第二次：教堂', '第二次：菊花', '第二次：红色'],
                ['IMMT1W1', 'IMMT1W2', 'IMMT1W3', 'IMMT1W4', 'IMMT1W5', 'IMMT2W1', 'IMMT2W2', 'IMMT2W3', 'IMMT2W4', 'IMMT2W5']
            ),
            MultiCheckbox(
                '注意',
                'attention',
                ['顺背数字', '倒背数字', '当数字1出现时用手敲打一下桌面', '100连续减7（1）', '100连续减7（2）', '100连续减7（3）', '100连续减7（4）', '100连续减7（5）'],
                ['DIGFOR', 'DIGBACK', 'LETTERS', 'SERIAL1', 'SERIAL2', 'SERIAL3', 'SERIAL4', 'SERIAL5']
            ),
            MultiCheckbox(
                '语言',
                'language',
                ['重复句子1', '重复句子2', '流畅性：在1分钟内尽可能多地说出动物的名字'],
                ['REPEAT1', 'REPEAT2', 'FFLUENCY']
            ),
            MultiCheckbox(
                '抽象',
                'abstraction',
                ['词语相似性：火车-自行车', '词语相似性：手表-尺子'],
                ['ABSTRAN', 'ABSMEAS']
            ),
            MultiCheckbox(
                '延迟回忆',
                'delayed_recall',
                ['1', '2', '3', '4', '5'],
                ['DELW1', 'DELW2', 'DELW3', 'DELW4', 'DELW5']
            ),
            MultiCheckbox(
                '定向',
                'direction',
                ['日期', '月份', '年代', '星期几', '地点', '城市'],
                ['DATE', 'MONTH', 'YEAR', 'DAY', 'PLACE', 'CITY']
            ),
        ]
    },
    {
        formName: 'MMSE',
        formChildren: [
            MultiCheckbox(
                '时间定向力',
                'time_direction',
                ['年', '月', '日', '星期', '季节'],
                ['MMYEAR', 'MMMONTH', 'MMDATE', 'MMDAY', 'MMSEASON']
            ),
            MultiCheckbox(
                '场所定向力',
                'place_direction',
                ['国家', '省、市', '街道（地址）', '什么地方（场所）', '几楼'],
                ['MMAREA', 'MMSTATE', 'MMCITY', 'MMHOSPIT', 'MMFLOOR']
            ),
            MultiCheckbox(
                '记忆力',
                'memory',
                ['花园', '冰箱', '国旗'],
                ['garden', 'refrigerator', 'flag']
            ),
            MultiCheckbox(
                '计算力',
                'calculation',
                ['100连续减7（1）', '100连续减7（2）', '100连续减7（3）', '100连续减7（4）', '100连续减7（5）'],
                ['MMDLTR', 'MMLLTR', 'MMRLTR', 'MMOLTR', 'MMWLTR']
            ),
            MultiCheckbox(
                '回忆力',
                'recall',
                ['花园', '冰箱', '国旗'],
                ['garden2', 'refrigerator2', 'flag2']
            ),
            MultiCheckbox(
                '语言及时空间能力',
                'ability',
                ['提问物品1', '提问物品2', '重复句子', '按指示去做1', '按指示去做2', '按指示去做3', '念，并做', '写句子', '画图'],
                ['MMWATCH', 'MMPENCIL', 'MMREPEAT', 'MMHAND', 'MMFOLD', 'MMONFLR', 'MMCLEYE', 'MMWRITE', 'MMDRAW']
            ),
        ]
    },
    {
        formName: 'gdscale',
        formChildren: [
            BinaryRadio('你对生活基本上满意吗？', '是', '否', 'GDSATIS', '1', '0'),
            BinaryRadio('你是否已放弃了许多活动与兴趣？', '是', '否', 'GDDROP', '1', '0'),
            BinaryRadio('你是否觉得生活空虚？', '是', '否', 'GDEMPTY', '1', '0'),
            BinaryRadio('你是否常感到厌倦？', '是', '否', 'GDBORED', '1', '0'),
            BinaryRadio('你觉得未来有希望吗？', '是', '否', 'GDSPIRIT', '1', '0'),
            BinaryRadio('你是否因为脑子里一些想法摆脱不掉而烦恼？', '是', '否', 'GDMIND', '1', '0'),
            BinaryRadio('你是否大部分时间精力充沛？', '是', '否', 'GDENERGY', '1', '0'),
            BinaryRadio('你是否害怕有不幸的事落到你头上？', '是', '否', 'GDAFRAID', '1', '0'),
            BinaryRadio('你是否大部分时间感到幸福？', '是', '否', 'GDHAPPY', '1', '0'),
            BinaryRadio('你是否感到孤立无援？', '是', '否', 'GDHELP', '1', '0'),
            BinaryRadio('你是否经常坐立不安，心烦意乱？', '是', '否', 'GDFIDGET', '1', '0'),
            BinaryRadio('你是否希望待在家里而不愿去做些新鲜事？', '是', '否', 'GDHOME', '1', '0'),
            BinaryRadio('你是否常常担心将来？', '是', '否', 'GDFUTURE', '1', '0'),
            BinaryRadio('你是否觉得记忆力比以前差？', '是', '否', 'GDMEMORY', '1', '0'),
            BinaryRadio('你觉得现在活着很惬意吗？', '是', '否', 'GDALIVE', '1', '0'),
            BinaryRadio('你是否常感到心情沉重、郁闷？', '是', '否', 'GDDEPRESSED', '1', '0'),
            BinaryRadio('你是否觉得像现在这样活着毫无意义？', '是', '否', 'GDMEANINGLESS', '1', '0'),
            BinaryRadio('你是否总为过去的事忧愁？', '是', '否', 'GDWORRY', '1', '0'),
            BinaryRadio('你觉得生活很令人兴奋吗？', '是', '否', 'GDEXCITING', '1', '0'),
            BinaryRadio('你开始一件新的工作很困难吗？', '是', '否', 'GDNEWJOB', '1', '0'),
            BinaryRadio('你觉得生活充满活力吗？', '是', '否', 'GDVITALITY', '1', '0'),
            BinaryRadio('你是否觉得你的处境已毫无希望？', '是', '否', 'GDHOPE', '1', '0'),
            BinaryRadio('你是否觉得大多数人比你强得多？', '是', '否', 'GDBETTER', '1', '0'),
            BinaryRadio('你是否常为些小事伤心？', '是', '否', 'GDSAD', '1', '0'),
            BinaryRadio('你是否常觉得想哭？', '是', '否', 'GDCRYING', '1', '0'),
            BinaryRadio('你集中精力有困难吗？', '是', '否', 'GDCONCENTRATE', '1', '0'),
            BinaryRadio('你早晨起来很快活吗？', '是', '否', 'GDMORNING', '1', '0'),
            BinaryRadio('你希望避开聚会吗？', '是', '否', 'GDPARTY', '1', '0'),
            BinaryRadio('你做决定很容易吗？', '是', '否', 'GDDECISION', '1', '0'),
            BinaryRadio('你的头脑像往常一样清晰吗？', '是', '否', 'GDCLEAR', '1', '0'),
        ]
    },
    {
        formName: 'npiq',
        formChildren: [
            BinaryRadio(
                '老人家有什么你不知道是不真实的信念吗，如坚持认为有人要伤害自己或偷自己的东西？',
                '是',
                '否',
                'NPIA',
                '1',
                '0',
                {controlComponent: '#NPIASEV_box #NPIAPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIASEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIASEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIAPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIAPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家有错误的视觉或声音等幻觉吗？病人似乎看见、听见或感觉到并不存在的东西吗？',
                '是',
                '否',
                'NPIB',
                '1',
                '0',
                {controlComponent: '#NPIBSEV_box #NPIBPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIBSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIBSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIBPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIBPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家有时候拒绝他人帮助自己，或难于相处吗？',
                '是',
                '否',
                'NPIC',
                '1',
                '0',
                {controlComponent: '#NPICSEV_box #NPICPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPICSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPICSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPICPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPICPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家看起来悲伤或说自己感到抑郁吗？',
                '是',
                '否',
                'NPID',
                '1',
                '0',
                {controlComponent: '#NPIDSEV_box #NPIDPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIDSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIDSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIDPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIDPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家与您分开时是否感到不安？是否有其他紧张不安的迹象，如气短、叹息、无法放松或感到过度紧张？',
                '是',
                '否',
                'NPIE',
                '1',
                '0',
                {controlComponent: '#NPIESEV_box #NPIEPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIESEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIESEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIEPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIEPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家看起来是否感觉太好或表现得过度愉快？',
                '是',
                '否',
                'NPIF',
                '1',
                '0',
                {controlComponent: '#NPIFSEV_box #NPIFPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIFSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIFSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIFPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIFPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家是否好像对日常活动或别人的活动和计划不太感兴趣？',
                '是',
                '否',
                'NPIG',
                '1',
                '0',
                {controlComponent: '#NPIGSEV_box #NPIGPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIGSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIGSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIGPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIGPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家是否好像表现得很冲动，如对陌生人说话仿佛自己认识对方，或说一些可能伤害别人感情的话？',
                '是',
                '否',
                'NPIH',
                '1',
                '0',
                {controlComponent: '#NPIHSEV_box #NPIHPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIHSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIHSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIHPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIHPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家是否不耐心或脾气暴躁？病人是否在应付时间延误或等待计划好的活动方面都有困难？',
                '是',
                '否',
                'NPII',
                '1',
                '0',
                {controlComponent: '#NPIISEV_box #NPIIPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIISEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIISEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIIPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIIPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家是否专注于反复动作，如来回踱步、扣纽扣、绕绳子，或反复地做一些事情？',
                '是',
                '否',
                'NPIJ',
                '1',
                '0',
                {controlComponent: '#NPIJSEV_box #NPIJPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIJSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIJSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIJPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIJPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家夜间醒来、早上起得特别早、或白天过度地打瞌睡吗？',
                '是',
                '否',
                'NPIK',
                '1',
                '0',
                {controlComponent: '#NPIKSEV_box #NPIKPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPIKSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPIKSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPIKPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPIKPAIN_box', hidden: true}
            ),
            BinaryRadio(
                '老人家有无体重减轻或体重增加，或喜好食物的类型有变化吗？',
                '是',
                '否',
                'NPIL',
                '1',
                '0',
                {controlComponent: '#NPILSEV_box #NPILPAIN_box'}
            ),
            DropdownSelect(
                '严重程度',
                'NPILSEV',
                ['1', '2', '3'],
                ['0', '1', '2'],
                {id: 'NPILSEV_box', hidden: true}
            ),
            DropdownSelect(
                '痛苦',
                'NPILPAIN',
                ['0', '1', '2', '3', '4', '5'],
                ['0', '1', '2', '3', '4', '5'],
                {id: 'NPILPAIN_box', hidden: true}
            )
        ]
    },
    {
        formName: 'adl',
        formChildren: [
            DropdownSelect(
                '使用公共车辆',
                'vehicles',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '行走',
                'walk',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '做饭菜',
                'cook',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '做家务',
                'housework',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '吃药',
                'medicine',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '吃饭',
                'eat',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '穿衣',
                'dress',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '梳头、刷牙等',
                'hair',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '洗衣',
                'laundry',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '洗澡',
                'shower',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '购物',
                'shopping',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '定时上厕所',
                'bathroom',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '打电话',
                'phone',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            ),
            DropdownSelect(
                '处理自己钱物',
                'money',
                ['根本无法做', '需要帮助', '有些困难', '自己完全可以做'],
                ['0', '1', '2', '3']
            )
        ]
    }
];
// endregion