package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.DemoCharacter;
import com.hung.pojo.DoctorAndSubject;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.DoctorAndSubjectServiceInterface;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 人口学特征表的操作
 * */
@Slf4j
@Controller
@RequestMapping
public class DemoCharacterController {
    @Autowired
    private DemoCharacterServiceInterface demoCharacterServiceInterface;
    @Autowired
    private DoctorAndSubjectServiceInterface doctorAndSubjectServiceInterface;

    /**
     * 受试者调查数据插入
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
        doctorAndSubject.setIsCheck(1);
        try {
            int rs=doctorAndSubjectServiceInterface.insertDoctorAndSubject(doctorAndSubject);
            if (rs<1){
                return Result.error("doctor_subject插入未成功");
            }
        }catch (Exception e){
            log.error("插入异常信息如下:"+e.getMessage(),e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("doctor_subject表数据插入出异常");
        }
        System.out.print(demoCharacter);
        return demoCharacterServiceInterface.insertNewDemoCharacter(demoCharacter);
    }

    /**
     * 该接口根据demo_character表中的id查询受试者某条记录的具体信息
     * */
    @RequestMapping("/queryDemoCharacterById")
    @ResponseBody
    public Result queryDemoCharacterById(@RequestParam Integer id){
        try {
            List<DemoCharacter> demoCharacters=demoCharacterServiceInterface.queryDemoCharacterById(id);
            return Result.success(demoCharacters);
        }catch (Exception e){
            log.error("查询数据出错，异常如下:"+e.getMessage(),e);
            return Result.error("查询数据出错，请联系开发人员");
        }
    }


    //以下接口用于备用
    /**
     * 该接口根据受试者的身份证号查询受试者做的所有调查记录
     * */
    @RequestMapping("/queryDemoCharacterByIdCard")
    @ResponseBody
    public Result queryDemoCharacterByIdCard(@RequestParam Long id_card){
        return demoCharacterServiceInterface.queryDemoCharacterByIdCard(id_card);
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
