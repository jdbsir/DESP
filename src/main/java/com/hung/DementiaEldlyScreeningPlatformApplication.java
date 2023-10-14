package com.hung;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.hung")
@MapperScan(basePackages = "com.hung.mapper")
public class DementiaEldlyScreeningPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(DementiaEldlyScreeningPlatformApplication.class, args);
    }

}
