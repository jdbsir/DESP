package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.DoctorAndSubject;
import com.hung.service.DoctorAndSubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class DoctorAndSubjectController {
    @Autowired
    private DoctorAndSubjectServiceInterface doctorAndSubjectServiceInterface;

    /**
     * 该接口根据医生的ID（也是医生通过微信登录后的微信ID）查询一个医生做了几个受试者记录
     * */
    @RequestMapping("/uerySubqjectByDoctorId")
    @ResponseBody
    public List<DoctorAndSubject> querySubjectByDoctorId(@RequestParam Integer doctor_id){
        return doctorAndSubjectServiceInterface.querySubjectByDoctorId(doctor_id);
    }

    /**
     * 该接口根据受试者的身份证号id_card查询某个受试者的记录
     * */
    @RequestMapping("/querySubjectByIdCard")
    @ResponseBody
    public List<DoctorAndSubject> querySubjectByIdCard(@RequestParam Long id_card){
        return doctorAndSubjectServiceInterface.querySubjectByIdCard(id_card);
    }

    @RequestMapping("/queryTotalSubjectByDoctorId")
    @ResponseBody
    public int queryTotalSubjectByDoctorId(@RequestParam Integer doctor_id){
        return doctorAndSubjectServiceInterface.queryTotalSubjectByDoctorId(doctor_id);
    }




}
