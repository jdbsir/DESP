package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

//简易智力状态检查表
@Data
@TableName("mmse")
public class Mmse {

    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long subject_id;
    @TableField("MMYEAR")
    private Integer mmyear;
    @TableField("MMMONTH")
    private Integer mmmonth;
    @TableField("MMDATE")
    private Integer mmdate;
    @TableField("MMDAY")
    private Integer mmday;
    @TableField("MMSEASON")
    private Integer mmseason;
    @TableField("MMAREA")
    private Integer mmarea;
    @TableField("MMSTATE")
    private Integer mmstate;
    @TableField("MMCITY")
    private Integer mmcity;
    @TableField("MMHOSPIT")
    private Integer mmhospit;
    @TableField("MMFLOOR")
    private Integer mmfloor;
    @TableField("garden")
    private Integer garden;
    @TableField("refrigerator")
    private Integer refrigerator;
    @TableField("flag")
    private Integer flag;
    @TableField("MMDLTR")
    private Integer mmdltr;
    @TableField("MMLLTR")
    private Integer mmlltr;
    @TableField("MMRLTR")
    private Integer mmrltr;
    @TableField("MMOLTR")
    private Integer mmoltr;
    @TableField("MMWLTR")
    private Integer mmwltr;
    @TableField("garden2")
    private Integer garden2;
    @TableField("refrigerator2")
    private Integer refrigerator2;
    @TableField("flag2")
    private Integer flag2;
    @TableField("MMWATCH")
    private Integer mmwatch;
    @TableField("MMPENCIL")
    private Integer mmpencil;
    @TableField("MMREPEAT")
    private Integer mmrepeat;
    @TableField("MMHAND")
    private Integer mmhand;
    @TableField("MMFOLD")
    private Integer mmfold;
    @TableField("MMONFLR")
    private Integer mmonflr;
    @TableField("MMCLEYE")
    private Integer mmcleye;
    @TableField("MMWRITE")
    private Integer mmwrite;
    @TableField("MMDRAW")
    private Integer mmdraw;
    @TableField("MMSE")
    private Integer mmse;
    private String time;
    private Long unix_timestamp;


}
