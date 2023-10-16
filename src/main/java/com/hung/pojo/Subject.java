package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

@Data
@TableName("subject")
public class Subject {
    private Integer id;
    private String name;
    private String gender;
    private String bornDate;
    private String phone;
    private String homePhone;
    private String address;
    private String race;
    private Integer fluency;
    private Integer areaType;
    private String liveType;
    private Integer education;
    private Integer marital;
    private Integer retire;
    private String occupation;
    private String income;
    private Integer incomeLevel;
    private Integer medicalInsurance;
    private Float height;
    private Float weight;
    private Float waistline;
    private Float systolicPressure;
    private Float diastolicPressure;
}
