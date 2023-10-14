package com.hung.service.imp;

import com.hung.mapper.TUserMapper;
import com.hung.pojo.TUser;
import com.hung.service.TUserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TUserServiceImp implements TUserServiceInterface {

    @Autowired
    private TUserMapper userMapper;
    @Override
    public List<TUser> GetAllUsers() {
        return userMapper.selectList(null);
    }
}
