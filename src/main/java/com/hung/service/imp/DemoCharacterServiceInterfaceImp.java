package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.mapper.DemoCharacterMapper;
import com.hung.pojo.DemoCharacter;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.DoctorAndSubjectServiceInterface;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * 人口学特征表接口的实现类
 */
@Service
@Slf4j
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
        demoCharacter.setTime(formatDateTime);
        demoCharacter.setUnixTimestamp(timestamp);
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

    @Override
    public Result queryDemoCharacterByIdCard(Long id_card) {
        try {
            List<DemoCharacter> demoCharacterList=demoCharacterMapper.queryDemoCharacterByIdCard(id_card);
            return Result.success(demoCharacterList);
        }catch (Exception e){
            log.error("查询受试者记录数据出错:"+e.getMessage(),e);
            return Result.error("查询受试者记录数据出错,请联系开发人员");
        }
    }

    @Override
    public Result queryDemoCharacterById(Integer id) {
        try {
            List<DemoCharacter> demoCharacterList=demoCharacterMapper.queryDemoCharacterById(id);
            return Result.success(demoCharacterList);
        }catch (Exception e){
            log.error("查询受试者记录数据出错:"+e.getMessage(),e);
            return Result.error("查询受试者记录数据出错,请联系开发人员");
        }
    }

    @Override
    public Result queryDemoCharacterTotalByDoctorId(Integer doctor_id) {
        try {
            int rs=demoCharacterMapper.queryDemoCharacterTotalByDoctorId(doctor_id);
            return Result.success(rs);
        }catch (Exception e){
            log.error("查询受试者记录数据数出错:"+e.getMessage(),e);
            return Result.error("查询受试者记录数据数出错,请联系开发人员");
        }
    }
}
