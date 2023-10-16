package com.hung.controller;

import com.hung.pojo.MES;
import com.hung.pojo.Subject;
import com.hung.service.TUserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {
    @Autowired
    private TUserServiceInterface userServiceInterface;

    @RequestMapping("/")
    public void collectTable(HttpServletResponse httpResponse) throws IOException {


        httpResponse.sendRedirect("/collect-table-1.html");
    }
    @PostMapping("/collect_table_1")
    @ResponseBody
    public List<MES> collectTable1(@RequestBody Subject subject){
        MES mes=new MES();
        mes.setCode("101");
        mes.setMes("sucess");
        System.out.print(subject);
        List<MES> l=new ArrayList<MES>();
        l.add(mes);

        return l;
    }
}
