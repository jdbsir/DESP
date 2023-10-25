package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.NpiqMapper;
import com.hung.pojo.Npiq;
import com.hung.service.NpiqServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Service
public class NpiqServiceInterfaceImp implements NpiqServiceInterface {
    @Autowired
    private NpiqMapper npiqMapper;

    @Override
    public Result insetNpiq(Npiq npiq) {
        LocalDateTime ldt =LocalDateTime.now();
        // DateTimeFormatter.ofPattern方法根据指定的格式输出时间
        String formatDateTime = ldt.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss"));
        Long timestamp = ldt.toInstant(ZoneOffset.of("+0")).toEpochMilli();
        npiq.setTime(formatDateTime);
        npiq.setUnix_timestamp(timestamp);
        try {
            int resultValue = npiqMapper.insert(npiq);
            if (resultValue < 1) {
                return Result.error("数据保存失败，请重新提交保存");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(npiq.getSubject_id());
    }
}
