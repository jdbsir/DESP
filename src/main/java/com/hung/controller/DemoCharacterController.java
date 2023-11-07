package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.DemoCharacter;
import com.hung.pojo.DoctorAndSubject;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.DoctorAndSubjectServiceInterface;
import com.hung.service.SubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

/**
 * 人口学特征表的操作
 * */
@Controller
@RequestMapping
public class DemoCharacterController {
    @Autowired
    private DemoCharacterServiceInterface demoCharacterServiceInterface;
    @Autowired
    private DoctorAndSubjectServiceInterface doctorAndSubjectServiceInterface;
    @RequestMapping("/home")
    public void toCollect(HttpServletResponse httpServletResponse)throws Exception{
        httpServletResponse.sendRedirect("/collect-table-1.html");
    }

    /**
     * 数据插入
     * */
    @RequestMapping(value = "/collect_table_1",method = RequestMethod.POST)
    @ResponseBody
    public Result insertDemoCharacter(@RequestBody DemoCharacter demoCharacter){
        /**
        if(doctorAndSubjectServiceInterface.querySubjectTotalByIdCard(demoCharacter.getId_card())!=0){
            return demoCharacterServiceInterface.insertNewDemoCharacter(demoCharacter);
        }
        DoctorAndSubject doctorAndSubject=new DoctorAndSubject();
        doctorAndSubject.setDoctor_id(doctor_id);
        doctorAndSubject.setId_card(demoCharacter.getId_card());
        doctorAndSubject.setSubject_name(demoCharacter.getName());
        doctorAndSubject.setIs_check(1);
        doctorAndSubjectServiceInterface.insertDoctorAndSubject(doctorAndSubject);
         */
        System.out.print(demoCharacter);
        return demoCharacterServiceInterface.insertNewDemoCharacter(demoCharacter);
    }
}
