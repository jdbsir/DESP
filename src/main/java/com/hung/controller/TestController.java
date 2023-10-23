package com.hung.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
