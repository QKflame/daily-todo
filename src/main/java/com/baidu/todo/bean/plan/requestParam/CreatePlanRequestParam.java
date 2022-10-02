package com.baidu.todo.bean.plan.requestParam;

import lombok.Data;

@Data
public class CreatePlanRequestParam {
    private String title;
    private Long parentId;
}
