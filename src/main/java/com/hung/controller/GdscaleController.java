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
@RequestMapping("/test")
public class GdscaleController {
    @Autowired
    private GdscaleServiceInterface gdscaleServiceInterface;

    @RequestMapping("/collect_table_8")
    @ResponseBody
    public Result insertGdscale(@RequestBody Gdscale gdscale, @RequestParam Long subject_id){
        gdscale.setSubjectId(subject_id);
        return gdscaleServiceInterface.insertGdscale(gdscale);
    }

   @RequestMapping("/querygdscale")
   @ResponseBody
    public Result queryGdscale(@RequestParam Long subject_id){
        return gdscaleServiceInterface.queryGdscale(subject_id);
    }
}
