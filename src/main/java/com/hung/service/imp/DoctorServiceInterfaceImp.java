package com.hung.service.imp;

import com.hung.mapper.DoctorMapper;
import com.hung.pojo.Doctor;
import com.hung.service.DoctorServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceInterfaceImp implements DoctorServiceInterface {
    @Autowired
    private DoctorMapper doctorMapper;

    @Override
    public int insertDoctor(String weixin_id) {
        Doctor doctor=new Doctor();
        doctor.setWeixinIid(weixin_id);
        return doctorMapper.insert(doctor);
    }

    @Override
    public List<Doctor> queryDoctor(String weixin_id) {
        return doctorMapper.queryDoctor(weixin_id);
    }
}
