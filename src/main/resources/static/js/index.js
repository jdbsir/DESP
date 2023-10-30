(() => {
    'use strict';

    // 生成测试数据
    function getRandomSubjectId() {
        const subjectName = [String(Math.floor(Math.random() * 9) + 1)];
        for (let i = 0; i < 17; i++) {
            subjectName.push(String(Math.floor(Math.random() * 10)));
        }
        return subjectName.join('');
    }
    function getRandomSubjectName() {
        const str = [];
        for (let i = 0; i < 2; i++) {
            let r = Math.floor(Math.random() * 52);
            if (r < 26) {
                str.push(String.fromCharCode('A'.charCodeAt() + r));
            } else {
                str.push(String.fromCharCode('a'.charCodeAt() + r - 26))
            }
        }
        return '名字' + str.join('');
    }
    function getRandomTime() {
        const max = +new Date();
        const min = max - 3600 * 24 * 365 * 1000;
        const timestamp = Math.floor(Math.random() * (max - min)) + min;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return [timestamp, `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`];
    }
    const data = {};
    const subjectNumber = 4;
    const recordNumber = 6;
    const subjectIdArray = [];
    let globalId = 0;
    for (let i = 0; i < subjectNumber; i++) {
        let subjectId = getRandomSubjectId();
        let [timestamp, time] = getRandomTime();
        subjectIdArray.push(subjectId);
        data[subjectId] = [{
            'id': globalId,
            'subject_id': subjectId,
            'name': getRandomSubjectName(),
            'MOCA': Math.floor(Math.random() * 31),
            'MMSE': Math.floor(Math.random() * 31),
            'GDTOTAL': Math.floor(Math.random() * 31),
            'NPISCORE': Math.floor(Math.random() * 37),
            'ADLSCORE': Math.floor(Math.random() * 57),
            'timestamp': timestamp,
            'time': time
        }];
        globalId = globalId + 1;
    }
    for (let i = 0; i < recordNumber - subjectNumber; i++) {
        let randomSubjectId = subjectIdArray[Math.floor(Math.random() * subjectNumber)];
        let [timestamp, time] = getRandomTime();
        let recordArray = data[randomSubjectId];
        data[randomSubjectId].push({
            'id': globalId,
            'subject_id': randomSubjectId,
            'name': data[randomSubjectId][0]['name'],
            'MOCA': Math.floor(Math.random() * 31),
            'MMSE': Math.floor(Math.random() * 31),
            'GDTOTAL': Math.floor(Math.random() * 31),
            'NPISCORE': Math.floor(Math.random() * 37),
            'ADLSCORE': Math.floor(Math.random() * 57),
            'timestamp': timestamp,
            'time': time
        });
        globalId = globalId + 1;
    }
    for (let subjectId in data) {
        data[subjectId].sort((a, b) => {
            return b.timestamp - a.timestamp;
        });
    }
    console.log(data);

    // 填充到html
    const baseInfo = document.getElementById('base-info');
    baseInfo.querySelector('.subject-number .text').innerHTML = subjectNumber;
    baseInfo.querySelector('.record-number .text').innerHTML = recordNumber;
    const recordList = document.getElementById('record-list');
    for (let subjectId in data) {
        let items = [];
        data[subjectId].forEach((record) => {
            items.push(`
                <li class="item">
                    <a href="/collect-table-1.html?id=${record['id']}&mode=readonly">记录时间：${record['time']}</a>
                </li>
            `);
        });
        recordList.appendChild(htmlToNode(`
            <li class="subject-item" data-subject-id="${subjectId}">
                <details>
                    <summary>${data[subjectId][0]['name']}（${data[subjectId][0]['subject_id']}）</summary>
                    <ul class="items">${items.join('')}</ul>
                </details>
            </li>
        `));
    }
})();