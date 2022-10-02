package com.baidu.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.todo.entity.Account;
import com.baidu.todo.service.AccountService;

@RestController()
@RequestMapping({"/api/account"})
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/getAccountInfo")
    public Account getAccountById(@RequestParam("id") Long id) {
        return accountService.getAccountById(id);
    }
}
