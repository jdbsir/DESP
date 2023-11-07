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
    private Long subjectId;
    private Integer sleep;
    @TableField("sleep_time_day")
    private Integer sleepTimeDay;
    private String diet;
    @TableField("food_extra")
    private String foodExtra;
    @TableField("food_extra_other")
    private String foodExtraOther;
    @TableField("fresh_food")
    private Integer freshFood;
    @TableField("preserved_food")
    private Integer preservedFood;
    private Integer nutrient;
    private Integer smoke;
    @TableField("smoke_rate")
    private Integer smokeRate;
    @TableField("smoke_year")
    private Integer smokeYear;
    @TableField("smoke_day")
    private Integer smokeDay;
    @TableField("alcohol_abuse")
    private Integer alcoholAbuse;
    @TableField("alcohol_abuse_rate")
    private Integer alcoholAbuseRate;
    @TableField("alcohol_type")
    private String alcoholType;
    @TableField("alcohol_type_other")
    private String alcoholTypeOther;
    @TableField("alcohol_day")
    private Integer alcoholDay;
    @TableField("drink_tea")
    private Integer drinkTea;
    @TableField("drink_tea_rate")
    private Integer drinkTeaRate;
    @TableField("drink_tea_day")
    private Integer drinkTeaDay;
    private Integer oiltea;
    @TableField("oiltea_rate")
    private Integer oilteaRate;
    @TableField("oiltea_day")
    private Integer oilteaDay;
    @TableField("read_book")
    private Integer read;
    @TableField("read_rate")
    private Integer readRate;
    @TableField("watch_tv")
    private Integer watchTv;
    @TableField("watch_tv_rate")
    private Integer watchTvRate;
    private Integer radio;
    @TableField("radio_rate")
    private Integer radioRate;
    @TableField("use_smartphone")
    private Integer useSmartphone;
    @TableField("use_smartphone_rate")
    private Integer useSmartphoneRate;
    private Integer housework;
    @TableField("housework_rate")
    private Integer houseworkRate;
    private Integer exercise;
    @TableField("exercise_rate")
    private Integer exerciseRate;
    @TableField("exercise_type")
    private String exerciseType;
    @TableField("exercise_type_other")
    private String exerciseTypeOther;
    private String hobby;
    @TableField("hobby_other")
    private String hobbyOther;
    @TableField("recreational_activities")
    private String recreationalActivities;
    @TableField("recreational_activities_other")
    private String recreationalActivitiesOther;
    private String social;
    @TableField("social_other")
    private String social_other;
    @TableField("personal_relationship")
    private Integer personalRelationship;


}
