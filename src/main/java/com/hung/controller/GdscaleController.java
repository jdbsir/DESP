package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.Gdscale;
import com.hung.service.GdscaleServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GdscaleController {
    @Autowired
    private GdscaleServiceInterface gdscaleServiceInterface;

    @RequestMapping("/collect_table_6")
    @ResponseBody
    public Result insertGdscale(@RequestBody Gdscale gdscale, @RequestParam Long subject_id,@RequestParam Long unix_timestamp){
        gdscale.setSubject_id(subject_id);
        gdscale.setUnix_timestamp(unix_timestamp);
        return gdscaleServiceInterface.insertGdscale(gdscale);
    }
}
