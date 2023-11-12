package com.hung.pojo;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

//老年抑郁量表
@Data
@TableName("gdscale")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Gdscale {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @TableField("subject_id")
    private Long subjectId;//数据ID编号
    @TableField("GDSATIS")
    private Integer gdsatis;//你对生活基本上满意吗？
    @TableField("GDDROP")
    private Integer gddrop;//你是否已经放弃了许多活动与兴趣
    @TableField("GDEMPTY")
    private Integer gdempty;//你是否觉得生活空虚
    @TableField("GDBORED")
    private Integer gdbored;//你是否常感到厌倦
    @TableField("GDSPIRIT")
    private Integer gdspirit;//你觉得未来有希望吗
    @TableField("GDMIND")
    private Integer gdmind;//你是否因为脑子里一些想法摆脱不掉而烦恼？
    @TableField("GDENERGY")
    private Integer gdenergy;//你是否大部分时间精力充沛？
    @TableField("GDAFRAID")
    private Integer gdafraid;//你是否害怕会有不幸的事落到你头上？
    @TableField("GDHAPPY")
    private Integer gdhappy;//你是否大部分时间感到幸福？
    @TableField("GDHELP")
    private Integer gdhelp;//你是否常感到孤立无援？
    @TableField("GDFIDGET")
    private Integer gdfidget;//你是否经常坐立不安，心烦意乱？
    @TableField("GDHOME")
    private Integer gdhome;//你是否希望呆在家里而不愿去做些新鲜事？
    @TableField("GDFUTURE")
    private Integer gdfuture;//你是否常常担心将来？
    @TableField("GDMEMORY")
    private Integer gdmemory;//你是否觉得记忆力比以前差？
    @TableField("GDALIVE")
    private Integer gdalive;//你觉得现在活着很惬意吗？
    @TableField("GDDEPRESSED")
    private Integer gddepressed;//你是否常感到心情沉重、郁闷？
    @TableField("GDMEANINGLESS")
    private Integer gdmeaningless;//你是否觉得象现在这样活着毫无意义？
    @TableField("GDWORRY")
    private Integer gdworry;//你是否总为过去的事忧愁？ ①是 ②否
    @TableField("GDEXCITING")
    private Integer gdexciting;//你觉得生活很令人兴奋吗？
    @TableField("GDNEWJOB")
    private Integer gdnewjob;//你开始一件新的工作很困难吗？
    @TableField("GDVITALITY")
    private Integer gdvitality;//你觉得生活充满活力吗？
    @TableField("GDHOPE")
    private Integer gdhope;//你是否觉得你的处境已毫无希望？
    @TableField("GDBETTER")
    private Integer gdbetter;//你是否觉得大多数人比你强得多？
    @TableField("GDSAD")
    private Integer gdsad;//你是否常为些小事伤心？
    @TableField("GDCRYING")
    private Integer gdcrying;//你是否常觉得想哭？
    @TableField("GDCONCENTRATE")
    private Integer gdconcentrate;//你集中精力有困难吗？
    @TableField("GDMORNING")
    private Integer gdmorning;//你早晨起来很快活吗？
    @TableField("GDPARTY")
    private Integer gdparty;//你希望避开聚会吗？
    @TableField("GDDECISION")
    private Integer gddecision;//你做决定很容易吗？
    @TableField("GDCLEAR")
    private Integer gdclear;//你的头脑象往常一样清晰吗？
    @TableField("GDTOTAL")
    private Integer gdtotal;//GDSCALE总分
    private String time;//记录时间
    @TableField("unix_timestamp")
    private Long unixTimestamp;//时间戳
}
