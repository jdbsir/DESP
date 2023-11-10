package com.hung.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.Doctor;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DoctorMapper extends BaseMapper<Doctor> {
    List<Doctor> queryDoctor(String weixin_id);
}
