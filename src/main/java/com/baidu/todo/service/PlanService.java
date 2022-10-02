package com.baidu.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.todo.bean.plan.PlanListItem;
import com.baidu.todo.bean.plan.requestParam.CreatePlanRequestParam;
import com.baidu.todo.bean.plan.requestParam.DeletePlanRequestParam;
import com.baidu.todo.mapper.PlanMapper;

@Service
public class PlanService {
    @Autowired
    PlanMapper planMapper;

    public String createPlan(CreatePlanRequestParam args) {
        planMapper.createPlan(args.getTitle(), args.getParentId());
        return "创建成功";
    }

    public String deletePlan(DeletePlanRequestParam args) {
        planMapper.deletePlan(args.getId());
        return "删除成功";
    }

    public List<PlanListItem> getPlanList() {
        return planMapper.getPlanList();
    }
}
