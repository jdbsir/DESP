package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import lombok.Data;

//日常生活能力量表
@Data
@TableName("adl")
public class Adl {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Long subject_id;
    private Integer vehicles;
    private Integer walk;
    private Integer cook;
    private Integer housework;
    private Integer medicine;
    private Integer eat;
    private Integer dress;
    private Integer hair;
    private Integer laundry;
    private Integer shower;
    private Integer shopping;
    private Integer bathroom;
    private Integer phone;
    private Integer money;

    private Integer ADLSCORE;
    private String time;
    private Long unix_timestamp;

}
