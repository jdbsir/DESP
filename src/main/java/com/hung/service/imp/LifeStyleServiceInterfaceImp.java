package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.LifeStyleMapperInterface;
import com.hung.pojo.LifeStyle;
import com.hung.service.LifeStyleServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
public class LifeStyleServiceInterfaceImp implements LifeStyleServiceInterface {
    @Autowired
    private LifeStyleMapperInterface lifeStyleMapperInterface;
    @Override
    public Result insertLifeStyle(LifeStyle lifeStyle) {
        try {
            int resultValue = lifeStyleMapperInterface.insert(lifeStyle);
            if (resultValue < 1) {
                return Result.error("数据保存失败，请重新提交保存");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(lifeStyle.getSubjectId());
    }

    @Override
    public Result queryLife(Long subjectId) {
        LifeStyle lifeStyle =lifeStyleMapperInterface.querySubjectId(subjectId);

        return Result.success(lifeStyle);
    }
}
