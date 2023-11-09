package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
@TableName("life_style")
public class LifeStyle {
    @TableId(type = IdType.AUTO)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("subject_id")
    private Long subjectId;//数据ID编号
    private Integer sleep;//睡眠情况
    @TableField("sleep_time_day")
    private Integer sleepTimeDay;//每天的睡眠(午间和夜间)时间
    private String diet;//饮食口味
    @TableField("food_extra")
    private String foodExtra;//除主食外还有以下哪些食物
    @TableField("food_extra_other")
    private String foodExtraOther;//其他食物
    @TableField("fresh_food")
    private Integer freshFood;//新鲜的肉类、蔬菜、水果
    @TableField("preserved_food")
    private Integer preservedFood;//腊肉、腊肠、泡菜、咸菜
    private Integer nutrient;//维生素或其他营养素
    private Integer smoke;//吸烟
    @TableField("smoke_rate")
    private Integer smokeRate;//吸烟频率
    @TableField("smoke_year")
    private Integer smokeYear;//吸烟年数
    @TableField("smoke_day")
    private Integer smokeDay;//平均支/天
    @TableField("alcohol_abuse")
    private Integer alcoholAbuse;//饮酒
    @TableField("alcohol_abuse_rate")
    private Integer alcoholAbuseRate;//饮酒频率
    @TableField("alcohol_type")
    private String alcoholType;//饮酒种类
    @TableField("alcohol_type_other")
    private String alcoholTypeOther;//其他饮酒种类
    @TableField("alcohol_day")
    private Integer alcoholDay;//平均毫升/天
    @TableField("drink_tea")
    private Integer drinkTea;//喝茶
    @TableField("drink_tea_rate")
    private Integer drinkTeaRate;//喝茶频率
    @TableField("drink_tea_day")
    private Integer drinkTeaDay;//平均杯/天(按50毫升杯子为例)
    private Integer oiltea;//喝油茶
    @TableField("oiltea_rate")
    private Integer oilteaRate;//喝油茶频率
    @TableField("oiltea_day")
    private Integer oilteaDay;//平均碗/天
    @TableField("read_book")
    private Integer read;//阅读
    @TableField("read_rate")
    private Integer readRate;//阅读频率
    @TableField("watch_tv")
    private Integer watchTv;//看电视
    @TableField("watch_tv_rate")
    private Integer watchTvRate;//看电视频率
    private Integer radio;//听广播
    @TableField("radio_rate")
    private Integer radioRate;//听广播频率
    @TableField("use_smartphone")
    private Integer useSmartphone;//使用智能手机并上网
    @TableField("use_smartphone_rate")
    private Integer useSmartphoneRate;//使用智能手机并上网频率
    private Integer housework;//做家务
    @TableField("housework_rate")
    private Integer houseworkRate;//做家务频率
    private Integer exercise;//体育锻炼
    @TableField("exercise_rate")
    private Integer exerciseRate;//体育锻炼频率
    @TableField("exercise_type")
    private String exerciseType;//体育锻炼项目
    @TableField("exercise_type_other")
    private String exerciseTypeOther;//其他体育锻炼项目
    private String hobby;//兴趣爱好
    @TableField("hobby_other")
    private String hobbyOther;//其他兴趣爱好
    @TableField("recreational_activities")
    private String recreationalActivities;//文娱活动
    @TableField("recreational_activities_other")
    private String recreationalActivitiesOther;//其他文娱活动
    private String social;//社交活动
    @TableField("social_other")
    private String social_other;//其他社交活动
    @TableField("personal_relationship")
    private Integer personalRelationship;//与子女的关系


}
