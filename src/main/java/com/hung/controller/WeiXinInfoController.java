package com.hung.controller;

import com.hung.common.Result;
import com.hung.pojo.Doctor;
import com.hung.service.DoctorServiceInterface;
import com.hung.utils.GetWeiXinUserInfo;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequestMapping("/test")
public class WeiXinInfoController {
    @Autowired
    private DoctorServiceInterface doctorServiceInterface;

    @RequestMapping("/weixin")
    @ResponseBody
    public Result insertWeiXinInfoFromURL(@RequestParam String code,@RequestParam String state,HttpServletRequest request) {
        GetWeiXinUserInfo info = new GetWeiXinUserInfo();
        JSONObject json = info.getJson(code);
        String weixin_id=json.getString("openid");
//        String weixin_id = "2";

        if ( weixin_id== null) {
            return Result.error("微信授权失败");
        } else {
            List<Doctor> doctors=doctorServiceInterface.queryDoctor(weixin_id);
            if(doctors.isEmpty()){
                try {
                    int resultForInsertDoctor=doctorServiceInterface.insertDoctor(weixin_id);
                    if(resultForInsertDoctor<1){
                        return Result.error("医生数据保存未成功，请重新进入");
                    }
                }catch (Exception e){
                    log.error("插入异常信息如下:"+e.getMessage(),e);
                    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
                    return Result.error("医生注册出现异常，请联系开发人员");
                }
            }
            HttpSession session=request.getSession();
            session.setAttribute("weixin_id",weixin_id);
            return Result.success();

        }
    }
    private Map<String, String> getUrlPramNameAndValue(String url){
        String regEx="(\\?|&+)(.+?)=([^&]*)";//匹配参数名和参数值的正则表达式
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(url);
        // LinkedHashMap是有序的Map集合，遍历时会按照加入的顺序遍历输出
        Map<String, String> paramMap = new LinkedHashMap<String, String>();
        while(m.find()){
            String paramName = m.group(2);//获取参数名
            String paramVal=m.group(3);//获取参数值
            paramMap.put(paramName, paramVal);
        }
        return paramMap;
    }
}
