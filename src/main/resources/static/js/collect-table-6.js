(() => {
    'use strict';

    const gdscaleForm = document.querySelector('form[name="gdscale"]');
    const submitButton = gdscaleForm.querySelector('[type="submit"]');
    const gdscaleChildren = [
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
    ];
    gdscaleChildren.forEach((obj) => {
        gdscaleForm.insertBefore(obj.getNode(), submitButton);
    });
    gdscaleForm.addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // 获取表单数据并计分
        const data = {};
        let GDTOTAL = 0;
        for (let i = 0; i < gdscaleChildren.length; i++) {
            let obj = gdscaleChildren[i];
            let key = obj.getName();
            let value = obj.getValue();
            data[key] = value;
            GDTOTAL = GDTOTAL + value;
        }
        data['GDTOTAL'] = GDTOTAL;

        ajaxPostJson(gdscaleForm.action, data).then((response) => {
            console.log(response);
        });
    }
})();