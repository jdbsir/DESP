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
public class NpiqController {
    @Autowired
    private NpiqServiceInterface npiqServiceInterface;

    @RequestMapping("/collect_table_7")
    @ResponseBody
    public Result insertNpiq(@RequestBody Npiq npiq, @RequestParam Long subject_id,@RequestParam Long unix_timestamp){
        npiq.setSubjectId(subject_id);
        npiq.setUnixTimestamp(unix_timestamp);
        return npiqServiceInterface.insetNpiq(npiq);
    }
}
