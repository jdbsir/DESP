package com.hung.service;

import com.hung.common.Result;
import com.hung.pojo.DemoCharacter;

import java.util.List;

/**
 * 人口学特征表的服务层接口
 */
public interface DemoCharacterServiceInterface {
    /**
     * 该方法用于保存人口学特征数据到数据库
     * @param demoCharacter:此参数表示人口学特征表的实体类
     * @return 返回的Result用于告诉用户数据插入的状态
     */
    Result insertNewDemoCharacter(DemoCharacter demoCharacter);

    Result queryDemoCharacterByIdCard(Long id_ard);

    List<DemoCharacter> queryDemoCharacterById(Integer id);

    int queryDemoCharacterTotalByDoctorId(String doctor_id);
}
