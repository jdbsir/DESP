package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@TableName("doctor")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Doctor {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    @TableField("weixin_id")
    private String weixinIid;
}
