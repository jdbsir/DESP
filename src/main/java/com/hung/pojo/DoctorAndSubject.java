package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
@TableName("doctor_subject")
public class DoctorAndSubject {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    @TableField("doctor_id")
    private Integer doctorId;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("id_card")
    private Long idCard;
    @TableField("subject_name")
    private String subjectName;
    @TableField("is_check")
    private Integer isCheck;
}
