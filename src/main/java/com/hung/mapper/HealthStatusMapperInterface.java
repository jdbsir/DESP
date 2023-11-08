package com.hung.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.HealthStatu;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HealthStatusMapperInterface extends BaseMapper<HealthStatu> {
    HealthStatu querySubjectId(Long subjectId);
}
