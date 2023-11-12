package com.hung.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.DoctorAndSubject;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DoctorAndSubjectMapper extends BaseMapper<DoctorAndSubject> {
    /**
     * 该方法根据医生的ID（也是医生通过微信登录后的微信ID）查询一个医生做了几个受试者记录
     * */
    List<DoctorAndSubject> querySubjectByDoctorId(Integer doctor_id);

    /**
     * 该方法根据受试者的身份证号id_card查询受试者的记录
     * */
    List<DoctorAndSubject> querySubjectByIdCard(Long id_card);

    /**
     * 该方法根据医生ID查询此医生下的受试者总数
     * */
    int queryTotalSubjectByDoctorId(String doctor_id);

    List<DoctorAndSubject> queryAllRecordOfDoctor(String doctorId);


}
