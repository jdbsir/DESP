package com.hung;

import com.hung.pojo.DoctorAndSubject;
import com.hung.service.DoctorAndSubjectServiceInterface;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class DementiaEldlyScreeningPlatformApplicationTests {
    @Autowired
    private DoctorAndSubjectServiceInterface doctorAndSubjectServiceInterface;

    @Test
    void test1() {
        List<DoctorAndSubject> doctorAndSubjects=doctorAndSubjectServiceInterface.querySubjectByDoctorId(123);
        System.out.println(doctorAndSubjects);
    }

}
