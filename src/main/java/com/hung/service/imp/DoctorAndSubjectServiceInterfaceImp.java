package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.DoctorAndSubjectMapper;
import com.hung.pojo.DoctorAndSubject;
import com.hung.service.DoctorAndSubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;

@Service
public class DoctorAndSubjectServiceInterfaceImp implements DoctorAndSubjectServiceInterface {
    @Autowired
    private DoctorAndSubjectMapper doctorAndSubjectMapper;
    @Override
    public Result insertDoctorAndSubject(DoctorAndSubject doctorAndSubject) {
        try {
            int resultValue=doctorAndSubjectMapper.insert(doctorAndSubject);
            if(resultValue<1){
                return Result.error("数据保存失败，请重新提交保存");
            }
        }catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(doctorAndSubject.getId_card());
    }

    @Override
    public List<DoctorAndSubject> querySubjectByDoctorId(Integer doctor_id) {
        return doctorAndSubjectMapper.querySubjectByDoctorId(doctor_id);
    }

    @Override
    public int querySubjectTotalByIdCard(Long idCard) {
        return doctorAndSubjectMapper.querySubjectTotalByIdCard(idCard);
    }
}
