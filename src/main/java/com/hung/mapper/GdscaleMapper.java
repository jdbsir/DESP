package com.hung.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.common.Result;
import com.hung.pojo.Gdscale;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GdscaleMapper extends BaseMapper<Gdscale> {

    Gdscale querysubjectId(Long subjectId);
}
