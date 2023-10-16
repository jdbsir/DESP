// region 生成HTML组件的函数
function htmlToNode(html) {
    const parent = document.createElement('div');
    parent.innerHTML = html;
    return parent.children[0];
}

function LeftRightInput(type, title, name, options) {
    let html;
    let node;
    options = options === undefined ? {} : options;
    
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
        callback && callback(node);
        return node;
    }
    
    return {
        getHtml: getHtml,
        getNode: getNode
    }
}

function BinaryRadio(title, label1, label0, name, value1, value0, options) {
    let html;
    let node;
    options = options === undefined ? {} : options;
    
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
        callback && callback(node);
        return node;
    }

    return {
        getHtml: getHtml,
        getNode: getNode
    }
}

function DropdownSelect(title, name, labelArr, valueArr, options) {
    let html;
    let node;
    options = options === undefined ? {} : options;
    
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
        callback && callback(node);
        return node;
    }

    return {
        getHtml: getHtml,
        getNode: getNode
    }
}

function MultiCheckbox(title, name, labelArr, valueArr, options) {
    let html;
    let node;
    options = options === undefined ? {} : options;
    
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
        callback && callback(node);
        return node;
    }

    return {
        getHtml: getHtml,
        getNode: getNode
    }
}
// endregion

// region 表单验证的函数
function phoneNumberCheck(num) {
    return /^1[0-9]{10}$/g.test(num);
}

function selectOtherCheck(form, name) {
    const otherName = `${name}_other`;
    return form[otherName].required ? form[otherName].value : form[name].value;
}

function multiCheckboxCheck(form, name) {
    const result = [];
    form[name].forEach((input) => {
        result.push(Number(input.checked));
    });
    return result.join('');
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
// endregion
