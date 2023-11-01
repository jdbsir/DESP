// ==UserScript==
// @name         填充DESP收集表
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */collect-table-*.html*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        unsafeWindow
// @grant        none
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';

    const data = [
        {
            "name": "谢基悦",
            "gender": "man",
            "born_date": "1999-10",
            "phone": 13211302015,
            "home_phone": 13211302015,
            "address": "广西",
            "race": "汉族",
            "race_other": "",
            "fluency": 0,
            "area_type": 0,
            "live_type": "其他",
            "live_type_other": "宿舍",
            "education": 5,
            "marital": 3,
            "retire": 0,
            "occupation": "无业",
            "income": "劳动所得",
            "income_other": "",
            "income_level": 0,
            "medical_insurance": "000001",
            "height": 168,
            "weight": 53,
            "waistline": 60,
            "systolic_pressure": 70,
            "diastolic_pressure": 130
        },
        {
            "sleep": 0,
            "sleep_time_day": 2,
            "diet": "10100",
            "food_extra": "11110",
            "food_extra_other": "",
            "fresh_food": 0,
            "preserved_food": 1,
            "nutrient": 0,
            "smoke": 0,
            "smoke_rate": 0,
            "smoke_year": "",
            "smoke_day": "",
            "alcohol_abuse": 1,
            "alcohol_abuse_rate": 2,
            "alcohol_type": "101",
            "alcohol_type_other": "",
            "alcohol_day": 6.667,
            "drink_tea": 1,
            "drink_tea_rate": 2,
            "drink_tea_day": 1,
            "oiltea": 0,
            "oiltea_rate": 0,
            "oiltea_day": "",
            "read": 0,
            "read_rate": 0,
            "watch_tv": 0,
            "watch_tv_rate": 0,
            "radio": 0,
            "radio_rate": 0,
            "use_smartphone": 1,
            "use_smartphone_rate": 0,
            "housework": 0,
            "housework_rate": 0,
            "exercise": 1,
            "exercise_rate": 1,
            "exercise_type": "110001",
            "exercise_type_other": "",
            "hobby": "0000",
            "hobby_other": "",
            "recreational_activities": "0000",
            "recreational_activities_other": "",
            "social": "0010",
            "social_other": "",
            "personal_relationship": 1
        },
        {
            "family_his": 0,
            "visual": "0100",
            "hearing": "1000",
            "chronic_disease": 1,
            "vascular_his": "000000",
            "vascular_his_other": "",
            "other_disease": "00000000",
            "other_disease_other": "",
            "mental_performance": "100",
            "mental_performance_other": ""
        },
        {
            "TRAILS": 1,
            "CUBE": 1,
            "CLOCKCON": 1,
            "CLOCKNO": 1,
            "CLOCKHAN": 0,
            "LION": 1,
            "RHINO": 0,
            "CAMEL": 1,
            "IMMT1W1": 1,
            "IMMT1W2": 1,
            "IMMT1W3": 1,
            "IMMT1W4": 1,
            "IMMT1W5": 1,
            "IMMT2W1": 1,
            "IMMT2W2": 1,
            "IMMT2W3": 1,
            "IMMT2W4": 1,
            "IMMT2W5": 1,
            "DIGFOR": 1,
            "DIGBACK": 1,
            "LETTERS": 1,
            "SERIAL1": 1,
            "SERIAL2": 1,
            "SERIAL3": 1,
            "SERIAL4": 0,
            "SERIAL5": 0,
            "REPEAT1": 1,
            "REPEAT2": 1,
            "FFLUENCY": 1,
            "ABSTRAN": 0,
            "ABSMEAS": 1,
            "DELW1": 1,
            "DELW2": 0,
            "DELW3": 0,
            "DELW4": 1,
            "DELW5": 0,
            "DATE": 1,
            "MONTH": 1,
            "YEAR": 1,
            "DAY": 1,
            "PLACE": 1,
            "CITY": 1
        },
        {
            "MMYEAR": 1,
            "MMMONTH": 1,
            "MMDATE": 1,
            "MMDAY": 1,
            "MMSEASON": 1,
            "MMAREA": 1,
            "MMSTATE": 1,
            "MMCITY": 1,
            "MMHOSPIT": 1,
            "MMFLOOR": 1,
            "garden": 1,
            "refrigerator": 1,
            "flag": 1,
            "MMDLTR": 1,
            "MMLLTR": 1,
            "MMRLTR": 1,
            "MMOLTR": 0,
            "MMWLTR": 0,
            "garden2": 0,
            "refrigerator2": 0,
            "flag2": 1,
            "MMWATCH": 1,
            "MMPENCIL": 0,
            "MMREPEAT": 1,
            "MMHAND": 1,
            "MMFOLD": 1,
            "MMONFLR": 1,
            "MMCLEYE": 0,
            "MMWRITE": 0,
            "MMDRAW": 1
        },
        {
            "GDSATIS": 0,
            "GDDROP": 1,
            "GDEMPTY": 0,
            "GDBORED": 1,
            "GDSPIRIT": 0,
            "GDMIND": 1,
            "GDENERGY": 1,
            "GDAFRAID": 1,
            "GDHAPPY": 1,
            "GDHELP": 1,
            "GDFIDGET": 1,
            "GDHOME": 1,
            "GDFUTURE": 1,
            "GDMEMORY": 1,
            "GDALIVE": 1,
            "GDDEPRESSED": 1,
            "GDMEANINGLESS": 1,
            "GDWORRY": 1,
            "GDEXCITING": 0,
            "GDNEWJOB": 0,
            "GDVITALITY": 0,
            "GDHOPE": 0,
            "GDBETTER": 1,
            "GDSAD": 1,
            "GDCRYING": 0,
            "GDCONCENTRATE": 0,
            "GDMORNING": 0,
            "GDPARTY": 0,
            "GDDECISION": 1,
            "GDCLEAR": 0
        },
        {
            "NPIA": 1,
            "NPIASEV": 1,
            "NPIB": 1,
            "NPIBSEV": 0,
            "NPIC": 1,
            "NPICSEV": 0,
            "NPID": 0,
            "NPIDSEV": 0,
            "NPIE": 1,
            "NPIESEV": 2,
            "NPIF": 0,
            "NPIFSEV": 0,
            "NPIG": 0,
            "NPIGSEV": 0,
            "NPIH": 1,
            "NPIHSEV": 2,
            "NPII": 1,
            "NPIISEV": 0,
            "NPIJ": 1,
            "NPIJSEV": 1,
            "NPIK": 0,
            "NPIKSEV": 0,
            "NPIL": 1,
            "NPILSEV": 0
        },
        {
            "vehicles": 0,
            "walk": 1,
            "cook": 0,
            "housework": 0,
            "medicine": 2,
            "eat": 2,
            "dress": 2,
            "hair": 1,
            "laundry": 0,
            "shower": 0,
            "shopping": 0,
            "bathroom": 3,
            "phone": 3,
            "money": 0
        }
    ];

    main();

    function main() {
        const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
        if (tableIndex === 4 || tableIndex === 5) {
            fullCollectTable2(data[tableIndex - 1]);
        } else {
            fullCollectTable1(data[tableIndex - 1]);
        }
    }

    function fullCollectTable1(data) {
        const tableIndex = parseInt(location.pathname.split('-').pop().split('.')[0]);
        const c = window.collectTableComponent[tableIndex - 1];
        const form = document.querySelector(`form[name="${c.formName}"]`);
        for (let name in data) {
            let node = form.querySelector(`[name="${name}"]`);
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
})();