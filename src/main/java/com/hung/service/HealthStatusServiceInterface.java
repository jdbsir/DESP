package com.hung.service;

import com.hung.common.Result;
import com.hung.pojo.HealthStatu;

public interface HealthStatusServiceInterface {
    Result insertHealthStatus(HealthStatu healthStatus);
}
