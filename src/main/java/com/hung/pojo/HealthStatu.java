package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

//健康状况
@Data
@TableName("health_statu")
public class HealthStatu {
    @TableId(type = IdType.AUTO)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("subject_id")
    private Long subjectId;
    @TableField("family_his")
    private Integer familyHis;
    private Integer visual;
    private Integer hearing;
    @TableField("chronic_disease")
    private Integer chronicDisease;
    @TableField("vascular_his")
    private String vascularHis;
    @TableField("vascular_his_other")
    private String vascularHisOther;
    @TableField("other_disease")
    private String otherDisease;
    @TableField("other_disease_other")
    private String otherDiseaseOther;
    @TableField("mental_performance")
    private String mentalPerformance;
    @TableField("mental_performance_other")
    private String mentalPerformanceOther;

}
