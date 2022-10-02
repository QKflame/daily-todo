package com.baidu.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.baidu.todo.bean.plan.PlanListItem;

@Mapper
public interface PlanMapper {
    public void createPlan(String title, Long parentId);
    public void deletePlan(Long id);
    public List<PlanListItem> getPlanList();
}
