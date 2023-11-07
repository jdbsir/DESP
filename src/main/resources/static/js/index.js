(() => {
    'use strict';

    // 连接微信
    connectWeiXin();

    // 渲染页面
    requestDataAndRenderPage();

    // 按钮事件
    document.getElementById('unfold-all-record').addEventListener('click', unfoldAllRecord);
    document.getElementById('fold-all-record').addEventListener('click', foldAllRecord);
    document.getElementById('add-new-subject').addEventListener('click', addNewSubject);
    document.getElementById('back-homepage').addEventListener('click', backHomepage);

    function requestDataAndRenderPage() {
        const searchName = parseQueryParam()['search_subject_id'];
        let url = '/query_history_record';
        let searchResult = false;
        if (searchName !== undefined) {
            url = `${url}?search_subject_id=${searchName}`;
            searchResult = true;
        }
        ajaxGetJson(url).then((response) => {
            if (response.code !== 1) {
                alert(response.msg);
                return undefined;
            }

            console.log(response.data);
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
        subjectNumberText.innerHTML = data['subject_number'];
        recordNumberText.innerHTML = data['record_number'];
        subjectNumberText.parentElement.classList.remove('hidden');
        recordNumberText.parentElement.classList.remove('hidden');
        baseInfo.querySelector(hiddenQSArray[0]).parentElement.classList.add('hidden');
        baseInfo.querySelector(hiddenQSArray[1]).parentElement.classList.add('hidden');

        // 是否显示搜索框、返回主页按钮
        if (searchResult) {
            document.querySelector('form[name="search-record"]').classList.add('hidden');
            document.getElementById('back-homepage').classList.remove('hidden');
        }

        // 记录列表
        const recordList = document.getElementById('record-list');
        data = data['history_record'];
        for (let subjectId in data) {
            let items = [];
            data[subjectId].forEach((record) => {
                items.push(`
                    <li class="item">
                        <a href="/collect-table-1.html?id=${record['id']}&readonly=1">记录时间：${record['time']}</a>
                    </li>
                `);
            });
            recordList.appendChild(htmlToNode(`
                <li class="subject-item" data-subject-id="${subjectId}">
                    <details>
                        <summary>
                            <span class="title">${data[subjectId][0]['name']}（${data[subjectId][0]['subject_id']}）</span>
                            <a href="collect-table-1.html?subject_id=${data[subjectId][0]['subject_id']}" class="add-record">添加</a>
                        </summary>
                        <ul class="items">${items.join('')}</ul>
                    </details>
                </li>
            `));
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
        location.href = '/collect-table-1.html';
    }

    function backHomepage(e) {
        location.href = '/index.html';
    }

    function connectWeiXin() {
        ajaxGetJson(`/weixin${location.search}`).then((response) => {
            console.log(response);
        });
    }
})();