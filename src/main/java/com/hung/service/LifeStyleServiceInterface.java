package com.hung.service;

import com.hung.common.Result;
import com.hung.pojo.LifeStyle;

public interface LifeStyleServiceInterface {
    Result insertLifeStyle(LifeStyle lifeStyle);

    Result queryLife(Long subjectId);
}
