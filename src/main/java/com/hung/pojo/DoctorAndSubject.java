package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.List;

@Data
@TableName("doctor_subject")
public class DoctorAndSubject {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;//医生——受试者记录ID
    @TableField("doctor_id")
    private Integer doctorId;//医生ID（微信ID）
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("id_card")
    private Long idCard;//受试者身份证号
    @TableField("subject_name")
    private String subjectName;//受试者姓名
    @TableField("is_check")
    private Integer isCheck;//是否做调查
    private List<DemoCharacter> demoCharacterList;
}
