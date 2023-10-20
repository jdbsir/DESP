package com.hung.service.imp;

import com.hung.common.Result;
import com.hung.common.SnowflakeIdWorker;
import com.hung.mapper.DemoCharacterMapper;
import com.hung.pojo.DemoCharacter;
import com.hung.pojo.Subject;
import com.hung.service.DemoCharacterServiceInterface;
import com.hung.service.SubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

/**
 * 人口学特征表接口的实现类
 */
@Service
public class DemoCharacterServiceInterfaceImp implements DemoCharacterServiceInterface {
    @Autowired
    private DemoCharacterMapper demoCharacterMapper;
    @Autowired
    private SubjectServiceInterface subjectServiceInterface;

    @Override
    public Result insertDemoCharacter(DemoCharacter demoCharacter) {
        try {
            int resultValue=demoCharacterMapper.insert(demoCharacter);
            if(resultValue<1){
                return Result.error("数据保存失败，请重新提交保存");
            }
        }catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success();
    }


    @Override
    public Result insertDemoCharacterNoSubjectId(DemoCharacter demoCharacter) {
        Subject subject=new Subject();
        SnowflakeIdWorker snowflakeIdWorker=new SnowflakeIdWorker(0);
        Long subject_id=snowflakeIdWorker.nextId();
        subject.setSubject_id(subject_id);
        subjectServiceInterface.insertSubject(subject);
        demoCharacter.setSubject_id(subject_id);
        try {
            int resultValue=demoCharacterMapper.insert(demoCharacter);
            if(resultValue<1){
                return Result.error("数据保存失败，请重新提交保存");
            }
        }catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事务回滚
            return Result.error("数据保存失败，请重新提交保存");
        }
        return Result.success(subject);
    }
}
