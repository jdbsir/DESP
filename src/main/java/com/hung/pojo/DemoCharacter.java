package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

/**
 * @author wang
 * 人口学特征表对应的实体类
 */
@Data
@TableName("demo_character")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class DemoCharacter {
    @TableId(type = IdType.AUTO)
    private Integer id;//数据ID编号
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("id_card")
    private Long idCard;//受试者身份证号
    private String name;//姓名
    private String gender;//性别
    @TableField("born_date")
    private String bornDate;//出生年月
    private String phone;//电话
    @TableField("home_phone")
    private String homePhone;//家属电话
    private String address;//住址
    private String race;//民族
    @TableField("race_other")
    private String raceOther;//其他民族
    private Integer fluency;//汉语交流
    @TableField("area_type")
    private Integer areaType;//居住地
    @TableField("live_type")
    private String liveType;//居住方式
    @TableField("live_type_other")
    private String liveTypeOther;//其他居住方式
    private Integer education;//文化程度
    private Integer marital;//婚姻状况
    private Integer retire;//是否离退休
    private String occupation;//职业(在职/离退休前)
    private String income;//经济收入来源
    @TableField("income_other")
    private String incomeOther;//其他经济收入来源
    @TableField("income_level")
    private Integer incomeLevel;//收入情况
    @TableField("medical_insurance")
    private String medicalInsurance;//医疗保险
    private Float height;//身高
    private Float weight;//体重
    private Float waistline;//腰围
    @TableField("systolic_pressure")
    private Float systolicPressure;//收缩压
    @TableField("diastolic_pressure")
    private Float diastolicPressure;//舒张压
    private String time;//记录时间
    @TableField("unix_timestamp")
    private Long unixTimestamp;//时间戳
}
