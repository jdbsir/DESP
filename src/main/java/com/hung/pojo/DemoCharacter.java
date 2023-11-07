package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * @author wang
 * 人口学特征表对应的实体类
 */
@Data
@TableName("demo_character")
public class DemoCharacter {
    @TableId(type = IdType.AUTO)//id自增
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("id_card")
    private Long idCard;
    private String name;
    private String gender;
    @TableField("born_date")
    private String bornDate;
    private String phone;
    @TableField("home_phone")
    private String homePhone;
    private String address;
    private String race;
    @TableField("race_other")
    private String raceOther;
    private Integer fluency;
    @TableField("area_type")
    private Integer areaType;
    @TableField("live_type")
    private String liveType;
    @TableField("live_type_other")
    private String liveTypeOther;
    private Integer education;
    private Integer marital;
    private Integer retire;
    private String occupation;
    private String income;
    @TableField("income_other")
    private String incomeOther;
    @TableField("income_level")
    private Integer incomeLevel;
    @TableField("medical_insurance")
    private Integer medicalInsurance;
    private Float height;
    private Float weight;
    private Float waistline;
    @TableField("systolic_pressure")
    private Float systolicPressure;
    @TableField("diastolic_pressure")
    private Float diastolicPressure;
    private String time;
    @TableField("unix_timestamp")
    private Long unixTimestamp;
}
