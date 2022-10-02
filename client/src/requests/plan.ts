import request from '../utils/request';

export function createPlan(params: {
    title: string;
    parentId?: string;
}) {
  return request({
    url: '/api/plan/createPlan',
    method: 'POST',
    data: params
  });
}

export function getPlanList() {
  return request({
    url: '/api/plan/getPlanList',
  });
}
