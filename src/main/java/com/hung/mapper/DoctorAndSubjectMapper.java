package com.hung.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.DoctorAndSubject;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DoctorAndSubjectMapper extends BaseMapper<DoctorAndSubject> {
    List<DoctorAndSubject> querySubjectByDoctorId(Integer doctor_id);
    List<DoctorAndSubject> querySubjectByIdCard(Long id_card);
    int queryTotalSubjectByDoctorId(Integer doctor_id);

    int querySubjectTotalByIdCard(Long idCard);
}
