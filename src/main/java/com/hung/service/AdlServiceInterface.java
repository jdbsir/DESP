package com.hung.service;

import com.hung.common.Result;
import com.hung.pojo.Adl;

public interface AdlServiceInterface {
    Result insertAdl(Adl adl);


    Result queryAdl(Long subjectId);
}
