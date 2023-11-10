package com.hung.service;

import com.hung.pojo.Doctor;

import java.util.List;

public interface DoctorServiceInterface {
    int insertDoctor(String weixin_id);

    List<Doctor> queryDoctor(String weixin_id);
}
