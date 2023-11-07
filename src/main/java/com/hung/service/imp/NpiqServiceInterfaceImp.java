package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.NpiqMapper;
import com.hung.pojo.Npiq;
import com.hung.service.NpiqServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Service
public class NpiqServiceInterfaceImp implements NpiqServiceInterface {
    @Autowired
    private NpiqMapper npiqMapper;

    @Override
    public Result insetNpiq(Npiq npiq) {
        DateTimeFormatter ftf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatDateTime = ftf.format(LocalDateTime.ofInstant(Instant.ofEpochMilli(npiq.getUnixTimestamp()), ZoneId.systemDefault()));
        npiq.setTime(formatDateTime);
        try {
            int resultValue = npiqMapper.insert(npiq);
            if (resultValue < 1) {
                return Result.error("数据保存失败，请重新提交保存");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(npiq.getSubjectId());
    }
}
