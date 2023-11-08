package com.hung.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.Adl;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdlMapper extends BaseMapper<Adl> {
    Adl querySubjectId(Long subjectId);
}
