package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.MmseMapper;
import com.hung.pojo.Mmse;
import com.hung.service.MmseServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Service
public class MmseServiceInterfaceImp implements MmseServiceInterface {
    @Autowired
    private MmseMapper mmseMapper;
    @Override
    public Result insertMmse(Mmse mmse) {
        LocalDateTime ldt =LocalDateTime.now();
        // DateTimeFormatter.ofPattern方法根据指定的格式输出时间
        String formatDateTime = ldt.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss"));
        Long timestamp = ldt.toInstant(ZoneOffset.of("+0")).toEpochMilli();
        mmse.setTime(formatDateTime);
        mmse.setUnix_timestamp(timestamp);
        try {
            int resultValue = mmseMapper.insert(mmse);
            if (resultValue < 1) {
                return Result.error("数据保存失败，请重新提交保存");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(mmse.getSubject_id());
    }
}
