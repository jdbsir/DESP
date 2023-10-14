package com.hung.controller;

import com.hung.pojo.TUser;
import com.hung.service.TUserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/test")
public class HomeController {
    @Autowired
    private TUserServiceInterface userServiceInterface;

    @RequestMapping("/users")
    @ResponseBody
    public List<TUser> Hello(){
        return userServiceInterface.GetAllUsers();
    }
}
