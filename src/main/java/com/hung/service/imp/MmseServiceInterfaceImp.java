package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.MmseMapper;
import com.hung.pojo.Mmse;
import com.hung.service.MmseServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Service
public class MmseServiceInterfaceImp implements MmseServiceInterface {
    @Autowired
    private MmseMapper mmseMapper;
    @Override
    public Result insertMmse(Mmse mmse) {
        DateTimeFormatter ftf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatDateTime = ftf.format(LocalDateTime.ofInstant(Instant.ofEpochMilli(mmse.getUnixTimestamp()), ZoneId.systemDefault()));
        mmse.setTime(formatDateTime);
        try {
            int resultValue = mmseMapper.insert(mmse);
            if (resultValue < 1) {
                return Result.error("数据保存失败，请重新提交保存");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(mmse.getSubjectId());
    }
}
