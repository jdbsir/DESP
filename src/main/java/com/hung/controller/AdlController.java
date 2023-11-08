package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.Adl;
import com.hung.service.AdlServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AdlController {
    @Autowired
    private AdlServiceInterface adlServiceInterface;

    @RequestMapping("/collect_table_8")
    @ResponseBody
    public Result insertAdl(@RequestBody Adl adl,@RequestParam Long subject_id,@RequestParam Long unix_timestamp){
        adl.setSubjectId(subject_id);
        adl.setUnixTimestamp(unix_timestamp);
        System.out.print(adl);
        return adlServiceInterface.insertAdl(adl);
    }

    @RequestMapping("/queryadl")
    @ResponseBody
    public  Result queryAdl(@RequestParam Long subject_id){
       return adlServiceInterface.queryAdl(subject_id);

    }
}
