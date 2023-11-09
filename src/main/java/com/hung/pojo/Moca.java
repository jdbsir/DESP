package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

//蒙特利尔认知评估量表
@Data
@TableName("moca")
public class Moca {

    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("subject_id")
    private Long subjectId;//数据ID编号
    @TableField("MOCA")
    private Integer moca;//moca总分
    @TableField("TRAILS")
    private Integer trails;//视空间与执行功能-连线
    @TableField("CUBE")
    private Integer cube;//视空间与执行功能-复制立方体
    @TableField("CLOCKCON")
    private Integer clockcon;//视空间与执行功能-画钟表-轮廓
    @TableField("CLOCKNO")
    private Integer clockno;//视空间与执行功能-画钟表-数字
    @TableField("CLOCKHAN")
    private Integer clockhan;//视空间与执行功能-画钟表-指针
    @TableField("LION")
    private Integer lion;//命名-狮子
    @TableField("RHINO")
    private Integer rhino;//命名-犀牛
    @TableField("CAMEL")
    private Integer camel;//命名-骆驼
    @TableField("IMMT1W1")
    private Integer immt1w1;//记忆-重复词语1-脸
    @TableField("IMMT1W2")
    private Integer immt1w2;//记忆-重复词语1-天鹅绒
    @TableField("IMMT1W3")
    private Integer immt1w3;//记忆-重复词语1-教堂
    @TableField("IMMT1W4")
    private Integer immt1w4;//记忆-重复词语1-菊花
    @TableField("IMMT1W5")
    private Integer immt1w5;//记忆-重复词语1-红色
    @TableField("IMMT2W1")
    private Integer immt2w1;//记忆-重复词语2-脸
    @TableField("IMMT2W2")
    private Integer immt2w2;//记忆-重复词语2-天鹅绒
    @TableField("IMMT2W3")
    private Integer immt2w3;//记忆-重复词语2-教堂
    @TableField("IMMT2W4")
    private Integer immt2w4;//记忆-重复词语2-菊花
    @TableField("IMMT2W5")
    private Integer immt2w5;//记忆-重复词语2-红色
    @TableField("DIGFOR")
    private Integer digfor;//注意-顺背
    @TableField("DIGBACK")
    private Integer digback;//注意-倒背
    @TableField("LETTERS")
    private Integer letters;//注意-数字敲打
    @TableField("SERIAL1")
    private Integer serial1;//注意-93
    @TableField("SERIAL2")
    private Integer serial2;//注意-86
    @TableField("SERIAL3")
    private Integer serial3;//注意-79
    @TableField("SERIAL4")
    private Integer serial4;//注意-72
    @TableField("SERIAL5")
    private Integer serial5;//注意-65
    @TableField("REPEAT1")
    private Integer repeat1;//语言-重复1
    @TableField("REPEAT2")
    private Integer repeat2;//语言-重复2
    @TableField("FFLUENCY")
    private Integer ffluency;//语言-流畅性
    @TableField("ABSTRAN")
    private Integer abstran;//抽象-火车-自行车
    @TableField("ABSMEAS")
    private Integer absmeas;//抽象-手表-尺子
    @TableField("DELW1")
    private Integer delw1;//延迟回忆-脸
    @TableField("DELW2")
    private Integer delw2;//延迟回忆-天鹅绒
    @TableField("DELW3")
    private Integer delw3;//延迟回忆-教堂
    @TableField("DELW4")
    private Integer delw4;//延迟回忆-菊花
    @TableField("DELW5")
    private Integer delw5;//延迟回忆-红色
    @TableField("DATE")
    private Integer date;//定向-日期
    @TableField("MONTH")
    private Integer month;//定向-月份
    @TableField("YEAR")
    private Integer year;//定向-年份
    @TableField("DAY")
    private Integer day;//定向-星期几
    @TableField("PLACE")
    private Integer place;//定向-地点
    @TableField("CITY")
    private Integer city;//定向-城市
    private String time;//记录时间
    @TableField("unix_timestamp")
    private Long unixTimestamp;//时间戳


}
