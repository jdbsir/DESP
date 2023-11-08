package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.HealthStatu;
import com.hung.service.HealthStatusServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HealthStatusController {
    @Autowired
    private HealthStatusServiceInterface healthStatusServiceInterface;

    @RequestMapping("/collect_table_3")
    @ResponseBody
    public Result insertHealthStatus(@RequestBody HealthStatu healthStatus, @RequestParam Long subject_id){
        healthStatus.setSubjectId(subject_id);
        return healthStatusServiceInterface.insertHealthStatus(healthStatus);
    }

    @RequestMapping("queryhealth")
    @ResponseBody
    public Result queryHealth(@RequestParam Long subject_id){
        return healthStatusServiceInterface.queryHealth(subject_id);
    }
}
