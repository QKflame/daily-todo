package com.baidu.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.todo.entity.Account;
import com.baidu.todo.mapper.AccountMapper;

@Service
public class AccountService {
    @Autowired
    AccountMapper accountMapper;

    public Account getAccountById(Long id) {
        return accountMapper.getAccount(id);
    }
}
