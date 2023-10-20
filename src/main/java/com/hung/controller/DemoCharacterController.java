package com.hung.controller;

import com.hung.common.Result;
import com.hung.common.SnowflakeIdWorker;
import com.hung.pojo.DemoCharacter;
import com.hung.pojo.Subject;
import com.hung.pojo.Test;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.SubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @RequestMapping(value = "/collect_table_1",method = RequestMethod.POST)
    @ResponseBody
    public Result insertSubject(@RequestBody DemoCharacter demoCharacter){
        if(demoCharacter.getSubject_id()!=null){
            System.out.print(demoCharacter);
            return demoCharacterServiceInterface.insertDemoCharacter(demoCharacter);
        }

        System.out.print(demoCharacter);
        return demoCharacterServiceInterface.insertDemoCharacterNoSubjectId(demoCharacter);
    }
    @PostMapping ("/test")
    public void test(HttpServletRequest httpServletRequest){
        Test test=new Test();
        test.setName(httpServletRequest.getParameter("name"));
        test.setPwd(httpServletRequest.getParameter("pwd"));
        System.out.print(test);
    }
}
