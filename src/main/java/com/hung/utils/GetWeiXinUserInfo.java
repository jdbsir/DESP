package com.hung.utils;
import net.sf.json.JSONObject;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.Properties;
public class GetWeiXinUserInfo {
    public JSONObject getJson(String code){
        Properties properties = new Properties();
        try {
            InputStream is =GetWeiXinUserInfo.class.getClassLoader().getResourceAsStream("WeiXin.properties");
            properties.load(is);
        }catch (IOException e){
            e.printStackTrace();
        }
        //获取code后，请求以下链接获取access_token
        String url = properties.getProperty("getTokenURL")
                +"?appid=" + properties.getProperty("appid")
                + "&secret=" + properties.getProperty("secret")
                + "&code=" + code
                + "&grant_type=authorization_code";
        //通过网络请求方法来请求上面这个接口
        JSONObject jsonObject = doGetJson(url);
        try {
            String openid = jsonObject.getString("openid");
            String access_token = jsonObject.getString("access_token");
            String refresh_token = jsonObject.getString("refresh_token");
            // 验证access_token是否失效；展示都不需要
            String checkUrl = properties.getProperty("checkTokenURL")
                    +"?access_token=" + access_token
                    + "&openid=" + openid;

            JSONObject chickuserInfo = doGetJson(checkUrl);
            if (!"0".equals(chickuserInfo.getString("errcode"))) {
                String refreshTokenUrl=properties.getProperty("refreshTokenURL")
                        +"?appid=" + openid
                        + "&grant_type=refresh_token&refresh_token=" + refresh_token;

                JSONObject refreshInfo = doGetJson(refreshTokenUrl);
                access_token = refreshInfo.getString("access_token");
            }
            // 获取用户信息(需scope为 snsapi_userinfo)
            String infoUrl = properties.getProperty("getInfoURL")
                    +"?access_token=" + access_token
                    + "&openid=" + openid
                    + "&lang=zh_CN";
            JSONObject userInfo = doGetJson(infoUrl);
            return userInfo;
        }catch (Exception e) {
            System.out.println("获取微信用户信息失败,错误位置GetUserInfo.getJson");
        }
        return null;
    }
    public JSONObject doGetJson(String url){
        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";
        try {

            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // // 发送请求参数
            // out.print(param);
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
            JSONObject jsonObject = JSONObject.fromObject(result);
            return jsonObject;

        } catch (Exception e) {
            //logger.error("获取失败：" + e.getMessage());
        }
        return null;
    }
}
