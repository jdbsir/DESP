package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.LifeStyle;
import com.hung.service.LifeStyleServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
public class LifeStyleController {
    @Autowired
    private LifeStyleServiceInterface lifeStyleServiceInterface;

    @RequestMapping("/collect_table_2")
    @ResponseBody
    public Result insertLifeStyle(@RequestBody LifeStyle lifeStyle,@RequestParam Long subject_id){
        lifeStyle.setSubjectId(subject_id);
        return lifeStyleServiceInterface.insertLifeStyle(lifeStyle);
    }

    @RequestMapping("/querylifestyle")
    @ResponseBody
    public Result queryLifeStyle(@RequestParam Long subject_id){
        return lifeStyleServiceInterface.queryLife(subject_id);
    }
}
