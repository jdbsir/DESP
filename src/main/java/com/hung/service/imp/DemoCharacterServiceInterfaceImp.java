package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.common.SnowflakeIdWorker;
import com.hung.mapper.DemoCharacterMapper;
import com.hung.pojo.DemoCharacter;
import com.hung.pojo.DoctorAndSubject;
import com.hung.pojo.Subject;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.DoctorAndSubjectServiceInterface;
import com.hung.service.SubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

/**
 * 人口学特征表接口的实现类
 */
@Service
public class DemoCharacterServiceInterfaceImp implements DemoCharacterServiceInterface {
    @Autowired
    private DemoCharacterMapper demoCharacterMapper;
    @Autowired
    private DoctorAndSubjectServiceInterface doctorAndSubjectServiceInterface;


    @Override
    public Result insertNewDemoCharacter(DemoCharacter demoCharacter) {
        LocalDateTime ldt =LocalDateTime.now();
        // DateTimeFormatter.ofPattern方法根据指定的格式输出时间
        String formatDateTime = ldt.format(DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss"));
        Long timestamp = ldt.toInstant(ZoneOffset.of("+0")).toEpochMilli();
        long id_card=1313123;
        demoCharacter.setTime(formatDateTime);
        demoCharacter.setUnix_timestamp(timestamp);
        demoCharacter.setId_card(id_card);
        try {
            int resultValue=demoCharacterMapper.insert(demoCharacter);
            if(resultValue<1){
                return Result.error("数据保存失败，请重新提交保存");
            }
        }catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        System.out.println(demoCharacter.getId());
        return Result.success(demoCharacter);
    }
}
