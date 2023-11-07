package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.HealthStatusMapperInterface;
import com.hung.pojo.HealthStatu;
import com.hung.service.HealthStatusServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

@Service
public class HealthStatusServiceInterfaceImp implements HealthStatusServiceInterface {
    @Autowired
    private HealthStatusMapperInterface healthStatusMapperInterface;
    @Override
    public Result insertHealthStatus(HealthStatu healthStatus) {
        try {
            int resultValue = healthStatusMapperInterface.insert(healthStatus);
            if (resultValue < 1) {
                return Result.error("数据保存失败，请重新提交保存");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(healthStatus.getSubjectId());
    }
}
