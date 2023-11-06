package com.hung;

import com.hung.mapper.DoctorAndSubjectMapper;
import com.hung.pojo.DoctorAndSubject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = DementiaEldlyScreeningPlatformApplication.class)
public class MapperTest {
    @Autowired
    private DoctorAndSubjectMapper doctorAndSubjectMapper;
    @Test
    public void testDASQuery(){
        int i=doctorAndSubjectMapper.queryTotalSubjectByDoctorId(123);
        System.out.println(i);
    }
}
