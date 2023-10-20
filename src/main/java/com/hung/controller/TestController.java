package com.hung.controller;

import com.hung.common.SnowflakeIdWorker;
import com.hung.pojo.Test;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/")
public class TestController {
    /*
    @RequestMapping("/test")
    @ResponseBody
    public List<Test> testController(){
        SnowflakeIdWorker snowflakeIdWorker=new SnowflakeIdWorker(0);
        Test test=new Test();
        test.setId(snowflakeIdWorker.nextId());
        test.setName("admin");
        System.out.print(test.getId());
        List<Test> testList=new ArrayList<Test>();
        testList.add(test);
        return testList;
    }*/

}
