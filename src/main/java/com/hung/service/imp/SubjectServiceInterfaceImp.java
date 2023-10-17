package com.hung.service.imp;

import com.hung.mapper.SubjectMapper;
import com.hung.pojo.Subject;
import com.hung.service.SubjectServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectServiceInterfaceImp implements SubjectServiceInterface {
    @Autowired
    private SubjectMapper subjectMapper;

    @Override
    public int insertSubject(Subject subject) {
        int rsForSubject;
        try {
            rsForSubject=subjectMapper.insert(subject);
        }catch (Exception e){
            rsForSubject=-1;
        }
        return rsForSubject;
    }
}
