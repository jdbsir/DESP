package com.hung.service;

import com.hung.common.Result;
import com.hung.pojo.Npiq;

public interface NpiqServiceInterface {
    Result insetNpiq(Npiq npiq);

    Result queryNpiq(Long subjectId);
}
