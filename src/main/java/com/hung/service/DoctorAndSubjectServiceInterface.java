package com.hung.service;

import com.hung.common.Result;
import com.hung.pojo.DoctorAndSubject;

import java.util.List;

public interface DoctorAndSubjectServiceInterface {
    int insertDoctorAndSubject(DoctorAndSubject doctorAndSubject);
    List<DoctorAndSubject> querySubjectByDoctorId(Integer doctor_id);

    List<DoctorAndSubject> querySubjectByIdCard(Long id_card);

    int queryTotalSubjectByDoctorId(Integer doctor_id);

    List<DoctorAndSubject> queryAllRecordOfDoctor(Integer doctorId);
}
