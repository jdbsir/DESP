package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

//健康状况
@Data
@TableName("health_statu")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class HealthStatu {
    @TableId(type = IdType.AUTO)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("subject_id")
    private Long subjectId;//数据ID编号
    @TableField("family_his")
    private Integer familyHis;//父母或兄弟姐妹中，是否有人患老年痴呆
    private String visual;//视力情况
    private String hearing;//听力情况
    @TableField("chronic_disease")
    private Integer chronicDisease;//慢性疾病
    @TableField("vascular_his")
    private String vascularHis;//心脑血管病史
    @TableField("vascular_his_other")
    private String vascularHisOther;//其他心脑血管病史
    @TableField("other_disease")
    private String otherDisease;//是否以下疾病
    @TableField("other_disease_other")
    private String otherDiseaseOther;//其他疾病
    @TableField("mental_performance")
    private String mentalPerformance;//精神系统疾病表现
    @TableField("mental_performance_other")
    private String mentalPerformanceOther;//其他精神系统疾病表现

}
