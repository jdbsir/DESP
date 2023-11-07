package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.DoctorAndSubject;
import com.hung.service.DoctorAndSubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DoctorAndSubjectController {
    @Autowired
    private DoctorAndSubjectServiceInterface doctorAndSubjectServiceInterface;




}
