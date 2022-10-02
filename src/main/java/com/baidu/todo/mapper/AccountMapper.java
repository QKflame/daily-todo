package com.baidu.todo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.baidu.todo.entity.Account;

@Mapper
public interface AccountMapper {
    public Account getAccount(Long id);
}
