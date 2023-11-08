package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.GdscaleMapper;
import com.hung.pojo.Gdscale;
import com.hung.service.GdscaleServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Service
public class GdscaleServiceInterfaceImp implements GdscaleServiceInterface {
    @Autowired
    private GdscaleMapper gdscaleMapper;
    @Override
    public Result insertGdscale(Gdscale gdscale) {
        LocalDateTime ldt =LocalDateTime.now();
        // DateTimeFormatter.ofPattern方法根据指定的格式输出时间
        String formatDateTime = ldt.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss"));
        Long timestamp = ldt.toInstant(ZoneOffset.of("+0")).toEpochMilli();
        gdscale.setTime(formatDateTime);
        gdscale.setUnixTimestamp(timestamp);
        try {
            int resultValue = gdscaleMapper.insert(gdscale);
            if (resultValue < 1) {
                return Result.error("数据保存失败，请重新提交保存");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(gdscale.getSubjectId());
    }

    @Override
    public Result queryGdscale(Long subjectId) {

        Gdscale gdscale =gdscaleMapper.querysubjectId(subjectId);
        return Result.success(gdscale);
    }
}
