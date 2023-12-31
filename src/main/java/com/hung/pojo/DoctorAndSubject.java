package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.util.List;

@Data
@TableName("doctor_subject")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class DoctorAndSubject {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;//医生——受试者记录ID
    @TableField("doctor_id")
    private String doctorId;//医生ID（微信ID）
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("id_card")
    private Long idCard;//受试者身份证号
    @TableField("is_check")
    private Integer isCheck;//是否做调查
    private List<DemCharacterForIndex> demCharacterForIndexList;
}
