package com.hung;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;

import javax.sql.DataSource;

/**
 * DESP项目的启动入口
 */
@SpringBootApplication(scanBasePackages = "com.hung")
@ServletComponentScan
@MapperScan(basePackages = "com.hung.mapper")
public class DementiaEldlyScreeningPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(DementiaEldlyScreeningPlatformApplication.class, args);
    }

}
