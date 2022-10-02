package com.baidu.todo.bean.plan;

import lombok.Data;

@Data
public class PlanListItem {
    private Long id;
    private String title;
    private Long parentId;
}
