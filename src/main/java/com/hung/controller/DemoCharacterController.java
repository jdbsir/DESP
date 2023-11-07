package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.DemoCharacter;
import com.hung.pojo.DoctorAndSubject;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.DoctorAndSubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

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
    @RequestMapping(value = "/collect_table_1")
    @ResponseBody
    public Result insertDemoCharacter(@RequestBody DemoCharacter demoCharacter,@RequestParam Integer doctor_id){

        if(doctorAndSubjectServiceInterface.querySubjectByIdCard(demoCharacter.getIdCard())!=null){
            return demoCharacterServiceInterface.insertNewDemoCharacter(demoCharacter);
        }
        DoctorAndSubject doctorAndSubject=new DoctorAndSubject();
        doctorAndSubject.setDoctorId(doctor_id);
        doctorAndSubject.setIdCard(demoCharacter.getIdCard());
        doctorAndSubject.setSubjectName(demoCharacter.getName());
        doctorAndSubject.setIsCheck(1);
        doctorAndSubjectServiceInterface.insertDoctorAndSubject(doctorAndSubject);
        System.out.print(demoCharacter);
        return demoCharacterServiceInterface.insertNewDemoCharacter(demoCharacter);
    }

    /**
     * 该接口根据受试者的身份证号查询受试者做的所有调查记录
     * */
    @RequestMapping("/queryDemoCharacterByIdCard")
    @ResponseBody
    public List<DemoCharacter> queryDemoCharacterByIdCard(@RequestParam Long id_card){
        return demoCharacterServiceInterface.queryDemoCharacterByIdCard(id_card);
    }

    /**
     * 该接口根据demo_character表中的id查询受试者某条记录的具体信息
     * */
    @RequestMapping("/queryDemoCharacterById")
    @ResponseBody
    public List<DemoCharacter> queryDemoCharacterById(@RequestParam Integer id){
        return demoCharacterServiceInterface.queryDemoCharacterById(id);
    }

    /**
     * 该接口根据医生ID查询某医生给受试者所做的调查记录的总数
     * */
    @RequestMapping("/queryDemoCharacterTotalByDoctorId")
    @ResponseBody
    public int queryDemoCharacterTotalByDoctorId(@RequestParam Integer doctor_id){
        return demoCharacterServiceInterface.queryDemoCharacterTotalByDoctorId(doctor_id);
    }
}
