package com.hung.mapper;


import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.DemoCharacter;
import org.apache.ibatis.annotations.Mapper;

/**
 * 人口学特征表的Mapper接口
 */
@Mapper
public interface DemoCharacterMapper extends BaseMapper<DemoCharacter> {
}
