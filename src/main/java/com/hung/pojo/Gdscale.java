package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

//老年抑郁量表

@Data
@TableName()
public class Gdscale {

    private Integer id;
    private Long subject_id;
    private Integer GDSATIS;
    private Integer GDDROP;
    private Integer GDEMPTY;
    private Integer GDBORED;
    private Integer GDSPIRIT;
    private Integer GDMIND;
    private Integer GDENERGY;
    private Integer GDAFRAID;
    private Integer GDHAPPY;
    private Integer GDHELP;
    private Integer GDFIDGET;
    private Integer GDHOME;
    private Integer GDFUTURE;
    private Integer GDMEMORY;
    private Integer GDALIVE;
    private Integer GDDEPRESSED;
    private Integer GDMEANINGLESS;
    private Integer GDWORRY;
    private Integer GDEXCITING;
    private Integer GDNEWJOB;
    private Integer GDVITALITY;
    private Integer GDHOPE;
    private Integer GDBETTER;
    private Integer GDSAD;
    private Integer GDCRYING;
    private Integer GDCONCENTRATE;
    private Integer GDMORNING;
    private Integer GDPARTY;
    private Integer GDDECISION;
    private Integer GDCLEAR;
    private Integer GDTOTAL;
    private String time;
    private Long unix_timestamp;
}
