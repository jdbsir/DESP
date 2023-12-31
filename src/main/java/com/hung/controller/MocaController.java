package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.Moca;
import com.hung.service.MocaServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
public class MocaController {
    @Autowired
    private MocaServiceInterface mocaServiceInterface;

    @RequestMapping("/collect_table_4")
    @ResponseBody
    public Result insertMoca(@RequestBody Moca moca, @RequestParam Long subject_id){
        moca.setSubjectId(subject_id);
        return mocaServiceInterface.insertMoca(moca);
    }

    @RequestMapping("/querymoca")
    @ResponseBody
    public Result queryMoca(@RequestParam Long subject_id){
        return mocaServiceInterface.queryMoca(subject_id);
    }
}
