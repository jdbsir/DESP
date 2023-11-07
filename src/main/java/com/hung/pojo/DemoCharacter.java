package com.hung.pojo;

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
    private Long id_card;
    private String name;
    private String gender;
    private String born_date;
    private String phone;
    private String home_phone;
    private String address;
    private String race;
    private Integer fluency;
    private Integer area_type;
    private String live_type;
    private Integer education;
    private Integer marital;
    private Integer retire;
    private String occupation;
    private String income;
    private Integer income_level;
    private String income_other;
    private Integer medical_insurance;
    private Float height;
    private Float weight;
    private Float waistline;
    private Float systolic_pressure;
    private Float diastolic_pressure;
    private String time;
    private Long unix_timestamp;
}
