package com.hung.controller;

import com.hung.utils.GetWeiXinUserInfo;
import net.sf.json.JSONObject;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class WeiXinInfoController {
    @RequestMapping("/weixin")
    @ResponseBody
    public String insertWeiXinInfoFromURL(String url) {
        if (url.isEmpty()) {
            return null;
        }
        String code = getUrlPramNameAndValue(url).get("code");
        GetWeiXinUserInfo info = new GetWeiXinUserInfo();
        JSONObject json = info.getJson(code);
        if (json.getString("openid") == null) {
            return null;
        } else {
            return json;
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
