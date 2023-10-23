package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import lombok.Data;


//日常生活能力量表
@Data
public class Adl {
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
    @TableField("ADLSCORE")
    private Integer adlscore;
    private String time;
    private Long unix_timestamp;

}
