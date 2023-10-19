package com.hung.controller;

import com.hung.common.Result;
import com.hung.common.SnowflakeIdWorker;
import com.hung.pojo.DemoCharacter;
import com.hung.pojo.Subject;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.SubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping
public class DemoCharacterController {
    @Autowired
    private DemoCharacterServiceInterface demoCharacterServiceInterface;
    @Autowired
    private SubjectServiceInterface subjectServiceInterface;
    @RequestMapping("/home")
    public void toCollect(HttpServletResponse httpServletResponse)throws Exception{
        httpServletResponse.sendRedirect("/collect-table-1.html");
    }
    @PostMapping("/collect_table_1")
    @ResponseBody
    public Result insertSubject(@RequestBody DemoCharacter demoCharacter){
        if(demoCharacter.getSubject_id()!=null){
            System.out.print(demoCharacter);
            return demoCharacterServiceInterface.insertDemoCharacter(demoCharacter);
        }
        System.out.print(demoCharacter);
        return demoCharacterServiceInterface.insertDemoCharacterNoSubjectId(demoCharacter);
    }
}
