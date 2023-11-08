package com.hung.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.Moca;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MocaMapper extends BaseMapper<Moca> {
    Moca querySubjectId(Long subjectId);
}
