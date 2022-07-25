const baseURL = "http://101.201.29.183:3500";
export default {
  getTaskInfo: baseURL + "/task/getTaskInfo",
  //   getTaskInfo: baseURL + "/deal/pageInfo",
  // 表格-分页-查询接口
  query: baseURL + "/RectificationTrack/query",

  // 机构查询下拉框接口
  detail: baseURL + "/RectificationTrack/detail",
};
