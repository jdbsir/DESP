package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.DoctorAndSubject;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.DoctorAndSubjectServiceInterface;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/test")
public class DoctorAndSubjectController {
    @Autowired
    private DoctorAndSubjectServiceInterface doctorAndSubjectServiceInterface;
    @Autowired
    private DemoCharacterServiceInterface demoCharacterServiceInterface;

    @RequestMapping("/query_history_record")
    @ResponseBody
    public Result queryAllRecordOfDoctor(HttpServletRequest request){
        HttpSession session=request.getSession();
        String doctor_id=(String) session.getAttribute("weixin_id");
        try {
            Map<String,Object> map=new HashMap<>();
            int subjectNumber=doctorAndSubjectServiceInterface.queryTotalSubjectByDoctorId(doctor_id);
            int recordNumber=demoCharacterServiceInterface.queryDemoCharacterTotalByDoctorId(doctor_id);
            List<DoctorAndSubject> doctorAndSubjects=doctorAndSubjectServiceInterface.queryAllRecordOfDoctor(doctor_id);
            map.put("subject-number",subjectNumber);
            map.put("record-number",recordNumber);
            map.put("doctorAndSubjects",doctorAndSubjects);
            return Result.success(map);
        }catch (Exception e){
            log.error("查询数据出错:"+e.getMessage(),e);
            return Result.error("查询出错，请联系开发人员");
        }
    }

    @RequestMapping("/queryAllRecordOfDoctorByObscure")
    @ResponseBody
    public Result queryAllRecordOfDoctorByObscure(@RequestParam Long id_card,HttpServletRequest request){
        HttpSession session=request.getSession();
        String doctor_id=(String) session.getAttribute("weixin_id");
        System.out.println(id_card);
        try {
            Map<String,Object> map=new HashMap<>();
            int subjectNumber=doctorAndSubjectServiceInterface.queryTotalSubjectByIdCardObscure(doctor_id,id_card);
            int recordNumber=demoCharacterServiceInterface.queryDemoCharacterTotalByIdCardObscure(doctor_id,id_card);
            List<DoctorAndSubject> doctorAndSubjects=doctorAndSubjectServiceInterface.queryAllRecordOfDoctorByObscure(doctor_id,id_card);
            map.put("subject-number",subjectNumber);
            map.put("record-number",recordNumber);
            map.put("doctorAndSubjects",doctorAndSubjects);
            return Result.success(map);
        }catch (Exception e){
            log.error("查询数据出错:"+e.getMessage(),e);
            return Result.error("查询出错，请联系开发人员");
        }
    }



    //以下接口用于备用
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
    public int queryTotalSubjectByDoctorId(@RequestParam String doctor_id){
        return doctorAndSubjectServiceInterface.queryTotalSubjectByDoctorId(doctor_id);
    }





}
