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
    public int insertDoctorAndSubject(DoctorAndSubject doctorAndSubject) {
        return doctorAndSubjectMapper.insert(doctorAndSubject);
    }

    @Override
    public List<DoctorAndSubject> querySubjectByDoctorId(Integer doctor_id) {
        return doctorAndSubjectMapper.querySubjectByDoctorId(doctor_id);
    }

    @Override
    public List<DoctorAndSubject> querySubjectByIdCard(Long id_card) {
        return doctorAndSubjectMapper.querySubjectByIdCard(id_card);
    }

    @Override
    public int queryTotalSubjectByDoctorId(String doctor_id) {
        return doctorAndSubjectMapper.queryTotalSubjectByDoctorId(doctor_id);
    }

    @Override
    public List<DoctorAndSubject> queryAllRecordOfDoctor(String doctorId) {
        return doctorAndSubjectMapper.queryAllRecordOfDoctor(doctorId);
    }
}
