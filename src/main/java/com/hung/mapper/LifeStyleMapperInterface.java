package com.hung.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.LifeStyle;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LifeStyleMapperInterface extends BaseMapper<LifeStyle> {
    LifeStyle querySubjectId(Long subjectId);
}
