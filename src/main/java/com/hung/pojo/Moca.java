package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import lombok.Data;

//蒙特利尔认知评估量表
@Data
@TableName("moca")
public class Moca {

    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private Long subject_id;
    @TableField("MOCA")
    private Integer moca;
    @TableField("TRAILS")
    private Integer trails;
    @TableField("CUBE")
    private Integer cube;
    @TableField("CLOCKCON")
    private Integer clockcon;
    @TableField("CLOCKNO")
    private Integer clockno;
    @TableField("CLOCKHAN")
    private Integer clockhan;
    @TableField("LION")
    private Integer lion;
    @TableField("RHINO")
    private Integer rhino;
    @TableField("CAMEL")
    private Integer camel;
    @TableField("IMMT1W1")
    private Integer immt1w1;
    @TableField("IMMT1W2")
    private Integer immt1w2;
    @TableField("IMMT1W3")
    private Integer immt1w3;
    @TableField("IMMT1W4")
    private Integer immt1w4;
    @TableField("IMMT1W5")
    private Integer immt1w5;
    @TableField("IMMT2W1")
    private Integer immt2w1;
    @TableField("IMMT2W2")
    private Integer immt2w2;
    @TableField("IMMT2W3")
    private Integer immt2w3;
    @TableField("IMMT2W4")
    private Integer immt2w4;
    @TableField("IMMT2W5")
    private Integer immt2w5;
    @TableField("DIGFOR")
    private Integer digfor;
    @TableField("DIGBACK")
    private Integer digback;
    @TableField("LETTERS")
    private Integer letters;
    @TableField("SERIAL1")
    private Integer sertal1;
    @TableField("SERIAL2")
    private Integer sertal2;
    @TableField("SERIAL3")
    private Integer sertal3;
    @TableField("SERIAL4")
    private Integer sertal4;
    @TableField("SERIAL5")
    private Integer sertal5;
    @TableField("REPEAT1")
    private Integer repeat1;
    @TableField("REPEAT2")
    private Integer repeat2;
    @TableField("FFLUENCY")
    private Integer ffluency;
    @TableField("ABSTRAN")
    private Integer abstran;
    @TableField("ABSMEAS")
    private Integer absmeas;
    @TableField("DELW1")
    private Integer delw1;
    @TableField("DELW2")
    private Integer delw2;
    @TableField("DELW3")
    private Integer delw3;
    @TableField("DELW4")
    private Integer delw4;
    @TableField("DELW5")
    private Integer delw5;
    @TableField("DATE")
    private Integer date;
    @TableField("MONTH")
    private Integer month;
    @TableField("YEAR")
    private Integer year;
    @TableField("DAY")
    private Integer day;
    @TableField("PLACE")
    private Integer place;
    @TableField("CITY")
    private Integer city;
    private String time;
    private Long unix_timestamp;


}
