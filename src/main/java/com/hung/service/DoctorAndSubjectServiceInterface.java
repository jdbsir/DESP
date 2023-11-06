package com.hung.service;

import com.hung.common.Result;
import com.hung.pojo.DoctorAndSubject;

import java.util.List;

public interface DoctorAndSubjectServiceInterface {
    Result insertDoctorAndSubject(DoctorAndSubject doctorAndSubject);
    List<DoctorAndSubject> querySubjectByDoctorId(Integer doctor_id);

    int querySubjectTotalByIdCard(Long idCard);
}
