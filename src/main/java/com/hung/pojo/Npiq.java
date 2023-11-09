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
    @TableField("subject_id")
    private Long subjectId;//数据ID编号
    @TableField("NPIA")
    private Integer npia;//妄想
    @TableField("NPIASEV")
    private Integer npiasev;//妄想严重程度
    @TableField("NPIB")
    private Integer npib;//幻觉
    @TableField("NPIBSEV")
    private Integer npibsev;//幻觉严重程度
    @TableField("NPIC")
    private Integer npic;//激越/攻击行为
    @TableField("NPICSEV")
    private Integer npicsev;//激越/攻击行为严重程度
    @TableField("NPID")
    private Integer npid;//抑郁/心境恶劣
    @TableField("NPIDSEV")
    private Integer npidsev;//抑郁/心境恶劣严重程度
    @TableField("NPIE")
    private Integer npie;//焦虑
    @TableField("NPIESEV")
    private Integer npiesev;//焦虑严重程度
    @TableField("NPIF")
    private Integer npif;//情感高涨/欣快
    @TableField("NPIFSEV")
    private Integer npifsev;//情感高涨/欣快严重程度
    @TableField("NPIG")
    private Integer npig;//感淡漠/漠不关心
    @TableField("NPIGSEV")
    private Integer npigsev;//情感淡漠/漠不关心严重程度
    @TableField("NPIH")
    private Integer npih;//脱抑制
    @TableField("NPIHSEV")
    private Integer npihsev;//脱抑制严重程度
    @TableField("NPII")
    private Integer npii;//易激惹/情绪不稳
    @TableField("NPIISEV")
    private Integer npiisev;//易激惹/情绪不稳严重程度
    @TableField("NPIJ")
    private Integer npij;//运动紊乱
    @TableField("NPIJSEV")
    private Integer npijsev;//运动紊乱严重程度
    @TableField("NPIK")
    private Integer npik;//夜间行为
    @TableField("NPIKSEV")
    private Integer npiksev;//夜间行为严重程度
    @TableField("NPIL")
    private Integer npil;//食欲/进食
    @TableField("NPILSEV")
    private Integer npilsev;//食欲/进食严重程度
    @TableField("NPISCORE")
    private Integer npiscore;//NPIQ总分
    private String time;//记录时间
    @TableField("unix_timestamp")
    private Long unixTimestamp;//时间戳


}
