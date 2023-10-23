package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import lombok.Data;

//老年抑郁量表
@Data
@TableName("gdscale")
public class Gdscale {

    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private Long subject_id;
    @TableField("GDSATIS")
    private Integer gdsatis;
    @TableField("GDDROP")
    private Integer gddrop;
    @TableField("GDEMPTY")
    private Integer gdempty;
    @TableField("GDBORED")
    private Integer gdbored;
    @TableField("GDSPIRIT")
    private Integer gdspirit;
    @TableField("GDMIND")
    private Integer gdmind;
    @TableField("GDENERGY")
    private Integer gdenergy;
    @TableField("GDAFRAID")
    private Integer gdafraid;
    @TableField("GDHAPPY")
    private Integer gdhappy;
    @TableField("GDHELP")
    private Integer gdhelp;
    @TableField("GDFIDGET")
    private Integer gdfidget;
    @TableField("GDHOME")
    private Integer gdhome;
    @TableField("GDFUTURE")
    private Integer gdfuture;
    @TableField("GDMEMORY")
    private Integer gdmemory;
    @TableField("GDALIVE")
    private Integer gdalive;
    @TableField("GDDEPRESSED")
    private Integer gddepressed;
    @TableField("GDMEANINGLESS")
    private Integer gdmeaningless;
    @TableField("GDWORRY")
    private Integer gdworry;
    @TableField("GDEXCITING")
    private Integer gdexciting;
    @TableField("GDNEWJOB")
    private Integer gdnewjob;
    @TableField("GDVITALITY")
    private Integer gdvitality;
    @TableField("GDHOPE")
    private Integer gdhope;
    @TableField("GDBETTER")
    private Integer gdbetter;
    @TableField("GDSAD")
    private Integer gdsad;
    @TableField("GDCRYING")
    private Integer gdcrying;
    @TableField("GDCONCENTRATE")
    private Integer gdconcentrate;
    @TableField("GDMORNING")
    private Integer gdmorning;
    @TableField("GDPARTY")
    private Integer gdparty;
    @TableField("GDDECISION")
    private Integer gddecision;
    @TableField("gdclera")
    private Integer GDCLEAR;
    @TableField("GDTOTAL")
    private Integer gdtotal;
    private String time;
    private Long unix_timestamp;
}
