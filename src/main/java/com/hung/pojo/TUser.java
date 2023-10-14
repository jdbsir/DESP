package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

@Data
@TableName("t_user")
public class TUser {
    @TableField("id")
    private int id;
    @TableField("name")
    private String name;
    @TableField("age")
    private int age;
    @TableField("sex")
    private String sex;
}
