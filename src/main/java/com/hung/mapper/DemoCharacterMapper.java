package com.hung.mapper;


import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hung.pojo.DemoCharacter;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 人口学特征表的Mapper接口
 */
@Mapper
public interface DemoCharacterMapper extends BaseMapper<DemoCharacter> {

    /**
     * 该方法根据受试者的身份证号查询受试者做的所有调查记录
     * */
    List<DemoCharacter> queryDemoCharacterByIdCard(Long id_card);

    /**
     * 该方法根据demo_character表中的id查询受试者某条记录的具体信息
     * */
    List<DemoCharacter> queryDemoCharacterById(Integer id);

    /**
     * 该方法根据医生ID查询某医生给受试者所做的调查记录的总数
     * */
    int queryDemoCharacterTotalByDoctorId(String doctor_id);
}
