package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.AdlMapper;
import com.hung.pojo.Adl;
import com.hung.service.AdlServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.util.Assert;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Service
public class AdlServiceInterfaceImp implements AdlServiceInterface {
    @Autowired
    private AdlMapper adlMapper;

    @Override
    public Result insertAdl(Adl adl) {
        LocalDateTime ldt =LocalDateTime.now();
        // DateTimeFormatter.ofPattern方法根据指定的格式输出时间
        String formatDateTime = ldt.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss"));
        Long timestamp = ldt.toInstant(ZoneOffset.of("+0")).toEpochMilli();
        adl.setTime(formatDateTime);
        adl.setUnixTimestamp(timestamp);
        try {
            int resultValue = adlMapper.insert(adl);
            if (resultValue < 1) {
                return Result.error("数据保存失败，请重新提交保存");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(adl.getSubjectId());
    }

    @Override
    public Result queryAdl(Long subjectId) {
       Adl adl=adlMapper.querySubjectId(subjectId);
        return Result.success(adl);
    }
}
