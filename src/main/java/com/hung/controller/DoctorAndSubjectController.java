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

import java.util.List;

@Controller
public class DoctorAndSubjectController {
    @Autowired
    private DoctorAndSubjectServiceInterface doctorAndSubjectServiceInterface;

    @RequestMapping("/querySubjectByDoctorId")
    @ResponseBody
    public List<DoctorAndSubject> querySubjectByDoctorId(@RequestParam Integer doctor_id){
        return doctorAndSubjectServiceInterface.querySubjectByDoctorId(doctor_id);
    }

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
