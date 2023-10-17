package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.DemoCharacterMapper;
import com.hung.pojo.DemoCharacter;
import com.hung.service.DemoCharacterServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

/**
 * 人口学特征表接口的实现类
 */
@Service
public class DemoCharacterServiceInterfaceImp implements DemoCharacterServiceInterface {
    @Autowired
    private DemoCharacterMapper demoCharacterMapper;

    @Override
    public Result insertSubject(DemoCharacter demoCharacter) {
        try {
            int resultValue=demoCharacterMapper.insert(demoCharacter);
            if(resultValue<1){
                return Result.error("数据保存失败，请重新提交保存");
            }
        }catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success();
    }
}
