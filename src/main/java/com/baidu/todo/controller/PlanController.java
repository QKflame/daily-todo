package com.baidu.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.todo.bean.plan.PlanListItem;
import com.baidu.todo.bean.plan.requestParam.CreatePlanRequestParam;
import com.baidu.todo.bean.plan.requestParam.DeletePlanRequestParam;
import com.baidu.todo.service.PlanService;

@RestController
@RequestMapping({"/api/plan"})
public class PlanController {
    @Autowired
    PlanService planService;

    @PostMapping(value = "/createPlan")
    public String createPlan(@RequestBody CreatePlanRequestParam args) {
        planService.createPlan(args);
        return "创建成功";
    }

    @DeleteMapping(value = "/deletePlan")
    public String deletePlan(@RequestBody DeletePlanRequestParam args) {
        planService.deletePlan(args);
        return "删除成功";
    }

    @GetMapping(value = "/getPlanList")
    public List<PlanListItem> getPlanList() {
        // 返回树形结构，参考 https://blog.csdn.net/qq_43291207/article/details/121970048
        return planService.getPlanList();
    }
}
