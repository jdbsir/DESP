package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.Mmse;
import com.hung.service.MmseServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MmseController {
    @Autowired
    private MmseServiceInterface mmseServiceInterface;

    @RequestMapping("/collect_table_5")
    @ResponseBody
    public Result insertMmse(@RequestBody Mmse mmse, @RequestParam Long subject_id){
        mmse.setSubject_id(subject_id);
        return mmseServiceInterface.insertMmse(mmse);
    }
}
