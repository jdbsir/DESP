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
    private Long subject_id;
    private Integer sleep;
    private Integer sleep_time_day;
    private String diet;
    private String food_extra;
    private String food_extra_other;
    private Integer fresh_food;
    private Integer preserved_food;
    private Integer nutrient;
    private Integer smoke;
    private Integer smoke_rate;
    private Integer smoke_year;
    private Integer smoke_day;
    private Integer alcohol_abuse;
    private Integer alcohol_abuse_rate;
    private String alcohol_type;
    private String alcohol_type_other;
    private Integer alcohol_day;
    private Integer drink_tea;
    private Integer drink_tea_rate;
    private Integer drink_tea_day;
    private Integer oiltea;
    private Integer oiltea_rate;
    private Integer oiltea_day;
    @TableField("read_book")
    private Integer read;
    private Integer read_rate;
    private Integer watch_tv;
    private Integer watch_tv_rate;
    private Integer radio;
    private Integer radio_rate;
    private Integer use_smartphone;
    private Integer use_smartphone_rate;
    private Integer housework;
    private Integer housework_rate;
    private Integer exercise;
    private Integer exercise_rate;
    private String exercise_type;
    private String exercise_type_other;
    private String hobby;
    @TableField("hobby_type")
    private String hobby_other;
    private String recreational_activities;
    @TableField("recreational_activities_type")
    private String recreational_activities_other;
    private String social;
    @TableField("social_type")
    private String social_other;
    private Integer personal_relationship;


}
