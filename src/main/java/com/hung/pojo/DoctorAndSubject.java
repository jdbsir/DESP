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
    private Integer doctor_id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long subject_id;
    private Integer is_check;
}
