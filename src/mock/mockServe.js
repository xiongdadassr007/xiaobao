import Mock from "mockjs";
import axios from "axios";

// 对应-表格查询数据接口
Mock.mock("http://apd.com", {
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 2,
    data: [
      {
        institution: "总分公司名称", //
        taskName: "底稿名称@increment(1)",
        part: "xxx部门",
        status: 1,
        endDate: "@date",
      },
      {
        institution: "总分公司名称",
        taskName: "底稿名称@increment(1)",
        part: "xxx部门",
        status: 2,
        endDate: "@date",
      },
    ],
  },
});

// 对应-表格初始化数据接口
Mock.mock("http://api.com?currentPage=1&pageSize=10", {
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 500,
    data: [
      {
        institution: "总分公司名称", //
        taskName: "底稿名称@increment(1)",
        part: "xxx部门",
        status: 1,
        endDate: "@date",
      },
      {
        institution: "总分公司名称",
        taskName: "底稿名称@increment(1)",
        part: "xxx部门",
        status: 2,
        endDate: "@date",
      },
      {
        institution: "总分公司名称",
        taskName: "底稿名称@increment(1)",
        part: "xxx部门",
        status: 0,
        endDate: "@date",
      },
      {
        institution: "总分公司名称",
        taskName: "底稿名称@increment(1)",
        part: "xxx部门",
        status: 0,
        endDate: "@date",
      },
      {
        institution: "总分公司名称",
        taskName: "底稿名称@increment(1)",
        part: "xxx部门",
        status: 0,
        endDate: "@date",
      },
    ],
  },
});

// 对应弹出框数据接口
Mock.mock("http://inputTable.com", {
  data: {
    data: [
      {
        institution: "总分公司名称",
        part: "xxx部门",
        oneTarget: "上海市普陀区金沙江路 1518 弄",
        twoTarget: "上海市普陀区金沙江路 1518 弄",
        threeTarget: "上海市普陀区金沙江路 1518 弄",
        score: "@increment(1)",
        evidence: "查看",
        status: 2,
      },
    ],
  },
});

// 对应下拉选择框接口
Mock.mock("http://input.com", {
  data: {
    selectOneOptions: [
      {
        value: "中国农业",
        label: "中国农业",
      },
      {
        value: "建设银行",
        label: "建设银行",
      },
      {
        value: "人民银行",
        label: "人民银行",
      },
    ],
    selectTwoOptions: [
      {
        value: "111部门",
        label: "111部门",
      },
      {
        value: "222部门",
        label: "222部门",
      },
    ],
  },
});

// 测试
// axios({
//   method: "GET",
//   url: "http://api.com",
// }).then((result) => {
//   console.log(111, result);
// });
