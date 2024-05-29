package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.Npiq;
import com.hung.service.NpiqServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
public class NpiqController {
    @Autowired
    private NpiqServiceInterface npiqServiceInterface;

    @RequestMapping("/collect_table_6")
    @ResponseBody
    public Result insertNpiq(@RequestBody Npiq npiq, @RequestParam Long subject_id){
        npiq.setSubjectId(subject_id);
        return npiqServiceInterface.insetNpiq(npiq);
    }

    @RequestMapping("/querynpiq")
    @ResponseBody
    public Result queryNpiq(@RequestParam Long subject_id){
        return npiqServiceInterface.queryNpiq(subject_id);
    }
}
