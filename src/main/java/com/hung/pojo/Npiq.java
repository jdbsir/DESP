package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
//简明版神经网络
@Data
@TableName("npiq")
public class Npiq {

    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long subject_id;
    @TableField("NPIA")
    private Integer npia;
    @TableField("NPIASEV")
    private Integer npiasev;
    @TableField("NPIB")
    private Integer npib;
    @TableField("NPIBSEV")
    private Integer npibsev;
    @TableField("NPIC")
    private Integer npic;
    @TableField("NPICSEV")
    private Integer npicsev;
    @TableField("NPID")
    private Integer npid;
    @TableField("NPIDSEV")
    private Integer npidsev;
    @TableField("NPIE")
    private Integer npie;
    @TableField("NPIESEV")
    private Integer npiesev;
    @TableField("NPIF")
    private Integer npif;
    @TableField("NPIFSEV")
    private Integer npifsev;
    @TableField("NPIG")
    private Integer npig;
    @TableField("NPIGSEV")
    private Integer npigsev;
    @TableField("NPIH")
    private Integer npih;
    @TableField("NPIHSEV")
    private Integer npihsev;
    @TableField("NPII")
    private Integer npii;
    @TableField("NPIISEV")
    private Integer npiisev;
    @TableField("NPIJ")
    private Integer npij;
    @TableField("NPIJSEV")
    private Integer npijsev;
    @TableField("NPIK")
    private Integer npik;
    @TableField("NPIKSEV")
    private Integer npiksev;
    @TableField("NPIL")
    private Integer npil;
    @TableField("NPILSEV")
    private Integer npilsev;
    @TableField("NPISCORE")
    private Integer npiscore;
    private String time;
    private Long unix_timestamp;


}
