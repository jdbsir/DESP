(() => {
    'use strict';

    // 渲染页面
    requestDataAndRenderPage();

    // 按钮事件
    document.getElementById('unfold-all-record').addEventListener('click', unfoldAllRecord);
    document.getElementById('fold-all-record').addEventListener('click', foldAllRecord);
    document.getElementById('add-new-subject').addEventListener('click', addNewSubject);
    document.getElementById('back-homepage').addEventListener('click', backHomepage);

    // 展示搜索结果
    document.querySelector('form[name="search-record"]').addEventListener('submit', getSearchResult);

    function requestDataAndRenderPage() {
        // 连接微信
        connectWeiXin();

        const searchIdCard = parseQueryParam()['id_card'];
        let url = '/test/query_history_record';
        let searchResult = false;
        if (searchIdCard !== undefined) {
            url = `/test/queryAllRecordOfDoctorByObscure?id_card=${searchIdCard}`;
            searchResult = true;
        }
        ajaxGetJson(url).then((response) => {
            if (response.code !== 1) {
                alert(response.msg);
                return undefined;
            }

            renderHTML(response.data, searchResult);
        });
    }

    function renderHTML(data, searchResult) {
        // 记录数量
        const baseInfo = document.getElementById('base-info');
        let showQSArray = ['.subject-number .text', '.record-number .text'];
        let hiddenQSArray = ['.search-subject-number .text', '.search-record-number .text'];
        if (searchResult) {
            const tmp = showQSArray;
            showQSArray = hiddenQSArray;
            hiddenQSArray = tmp;
        }
        const subjectNumberText = baseInfo.querySelector(showQSArray[0]);
        const recordNumberText = baseInfo.querySelector(showQSArray[1]);
        subjectNumberText.innerHTML = data['subject-number'];
        recordNumberText.innerHTML = data['record-number'];
        subjectNumberText.parentElement.classList.remove('hidden');
        recordNumberText.parentElement.classList.remove('hidden');
        baseInfo.querySelector(hiddenQSArray[0]).parentElement.classList.add('hidden');
        baseInfo.querySelector(hiddenQSArray[1]).parentElement.classList.add('hidden');

        // 是否显示搜索框、返回主页按钮
        if (searchResult) {
            document.querySelector('form[name="search-record"]').classList.add('hidden');
            document.getElementById('back-homepage').classList.remove('hidden');
        }

        // 渲染记录列表
        const recordList = document.getElementById('record-list');
        data = data['doctorAndSubjects'];
        for (let i = 0; i < data.length; i++) {
            // 对一个病人的所有记录按时间从新到旧排序
            let subjectData = data[i];
            let items = [];
            let records = subjectData['dem_character_for_index_list'];
            records.sort((a, b) => {
                return b['unix_timestamp'] - a['unix_timestamp'];
            });

            // 生成HTML代码
            records.forEach((record) => {
                items.push(`
                    <li class="item">
                        <a href="/test/collect-table-1.html?id=${record['id']}&readonly=1" class="view-record">记录时间：${record['time']}</a>
                    </li>
                `);
            });

            // 将HTML渲染成元素
            const subjectItem = htmlToNode(`
                <li class="subject-item" data-subject-id="${subjectData['id_card']}">
                    <details>
                        <summary>
                            <span class="title">${records[0]['name']}（${subjectData['id_card']}）</span>
                            <a href="/test/collect-table-1.html?id_card=${subjectData['id_card']}" class="add-record">添加</a>
                        </summary>
                        <ul class="items">${items.join('')}</ul>
                    </details>
                </li>
            `);

            // 为病人的最新记录添加“继续填写”按钮
            subjectItem.querySelector('details .items > .item:first-child').appendChild(htmlToNode(`
                <a href="/test/collect-table-1.html?id_card=${subjectData['id_card']}" class="continue-fill-btn">继续填写</a>
            `));

            // 添加元素到页面
            recordList.appendChild(subjectItem);
        }
    }

    function unfoldAllRecord(e) {
        document.querySelectorAll('#record-list > .subject-item details').forEach((details) => {
            if (details.getAttribute('open') === null) {
                details.querySelector('summary').click();
            }
        });
    }

    function foldAllRecord(e) {
        document.querySelectorAll('#record-list > .subject-item details').forEach((details) => {
            if (details.getAttribute('open') !== null) {
                details.querySelector('summary').click();
            }
        });
    }

    function addNewSubject(e) {
        location.href = '/test/collect-table-1.html';
    }

    function backHomepage(e) {
        location.href = '/test/index.html';
    }

    function connectWeiXin() {
        const qp = parseQueryParam();
        if (qp['code'] === undefined || qp['state'] !== 'STATE') {
            return undefined;
        }

        ajaxGetJson('/test/weixin' + location.search).then((response) => {
            if (response.code === 0) {
                alert(response.msg);
            } else {
                location.assign('/test/index.html');
            }
        });
    }

    function getSearchResult(e) {
        e.preventDefault();

        const form = e.target;
        location.href = `/test/index.html?id_card=${form['id_card'].value}`;
    }
})();
