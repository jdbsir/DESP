package com.hung.pojo;

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
    private Long subject_id;
    private Integer family_his;
    private Integer visual;
    private Integer hearing;
    private String chronic_disease;
    private String vascular_his;
    private String other_disease;
    private String mental_performance;

}
