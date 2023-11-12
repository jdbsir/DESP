package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;


//日常生活能力量表
@Data
@TableName("adl")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Adl {
    @TableId(type = IdType.AUTO)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("subject_id")
    private Long subjectId;//数据ID编号
    private Integer vehicles;//使用公共车辆
    private Integer walk;//行走
    private Integer cook;//做饭菜
    private Integer housework;//做家务
    private Integer medicine;//吃药
    private Integer eat;//吃饭
    private Integer dress;//穿衣
    private Integer hair;//梳头、刷牙等
    private Integer laundry;//洗衣
    private Integer shower;//洗澡
    private Integer shopping;//购物
    private Integer bathroom;//定时上厕所
    private Integer phone;//打电话
    private Integer money;//处理自己的钱物
    @TableField("ADLSCORE")
    private Integer adlscore;//ADL总分
    private String time;//记录时间
    @TableField("unix_timestamp")
    private Long unixTimestamp;//时间戳

}
