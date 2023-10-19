package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import lombok.Data;

/**
 * subject对应的实体类
 */
@Data
@TableName("subject")
public class Subject {
    @TableId(type = IdType.AUTO)//id自增
    private Integer id;
    private Long subject_id;
}
