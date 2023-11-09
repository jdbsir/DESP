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
    @TableField("subject_id")
    private Long subjectId;//数据ID编号
    @TableField("MMYEAR")
    private Integer mmyear;//时间定向力-年
    @TableField("MMMONTH")
    private Integer mmmonth;//时间定向力-月
    @TableField("MMDATE")
    private Integer mmdate;//时间定向力-日
    @TableField("MMDAY")
    private Integer mmday;//时间定向力-星期
    @TableField("MMSEASON")
    private Integer mmseason;//时间定向力-季节
    @TableField("MMAREA")
    private Integer mmarea;//场所定向力-国家
    @TableField("MMSTATE")
    private Integer mmstate;//场所定向力-省市
    @TableField("MMCITY")
    private Integer mmcity;//场所定向力-街道地址
    @TableField("MMHOSPIT")
    private Integer mmhospit;//场所定向力-什么地方（福利院）
    @TableField("MMFLOOR")
    private Integer mmfloor;//场所定向力-几楼
    @TableField("garden")
    private Integer garden;//记忆力-花园
    @TableField("refrigerator")
    private Integer refrigerator;//记忆力-冰箱
    @TableField("flag")
    private Integer flag;//记忆力-国旗
    @TableField("MMDLTR")
    private Integer mmdltr;//注意力计算力-93
    @TableField("MMLLTR")
    private Integer mmlltr;//注意力计算力-86
    @TableField("MMRLTR")
    private Integer mmrltr;//注意力计算力-79
    @TableField("MMOLTR")
    private Integer mmoltr;//注意力计算力-72
    @TableField("MMWLTR")
    private Integer mmwltr;//注意力计算力-65
    @TableField("garden2")
    private Integer garden2;//回忆力-花园
    @TableField("refrigerator2")
    private Integer refrigerator2;//回忆力-冰箱
    @TableField("flag2")
    private Integer flag2;//回忆力-国旗
    @TableField("MMWATCH")
    private Integer mmwatch;//语言及时空间能力-手表
    @TableField("MMPENCIL")
    private Integer mmpencil;//语言及时空间能力-铅笔
    @TableField("MMREPEAT")
    private Integer mmrepeat;//	语言及时空间能力-重复一句话
    @TableField("MMHAND")
    private Integer mmhand;//语言及时空间能力-右手拿纸
    @TableField("MMFOLD")
    private Integer mmfold;//语言及时空间能力-两手将纸对折
    @TableField("MMONFLR")
    private Integer mmonflr;//语言及时空间能力-将纸放在左腿
    @TableField("MMCLEYE")
    private Integer mmcleye;//语言及时空间能力-念并闭上眼睛
    @TableField("MMWRITE")
    private Integer mmwrite;//语言及时空间能力-写句子
    @TableField("MMDRAW")
    private Integer mmdraw;//语言及时空间能力-照样子画图
    @TableField("MMSE")
    private Integer mmse;//	MMSE总分
    private String time;//记录时间
    @TableField("unix_timestamp")
    private Long unixTimestamp;//时间戳


}
