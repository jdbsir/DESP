package com.hung.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *用于后端向前端返回数据操作的状态
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    private Integer code;
    private String msg;
    private  Object data;

    public static  Result success(){//增删改，成功响应
        return new Result(1,"success",null);
    }
    public static  Result success(Object data){//查询成功响应
        return new Result(1,"success",data);
    }
    public static  Result error(String msg){//失败响应
        return new Result(0,msg,null);
    }
    public static  Result continueInsert(String msg,Object data){ return new Result(3,msg,data);}
}
