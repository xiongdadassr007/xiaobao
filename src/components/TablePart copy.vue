<template>
    <div>
        <div style="padding-left: 25px">
            <InputPart @queryData="queryData"></InputPart>
        </div>
        <div style="width: 1580px">
            <!-- 表格 -->
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 1580px"
                @selection-change="handleSelectionChange" :header-cell-style="{
                    backgroundColor: '#6E96E9',
                    fontSize: '16px',
                    fontFamily: 'Source Han Sans CN',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    'text-align': 'center',
                }" :row-class-name="tableRowClassName" :row-style="{height:'57px'}"
                :header-row-style="{height:'51px'}">
                <el-table-column type="selection" width="40" align="center">
                </el-table-column>
                <el-table-column prop="institution" label="发起机构" width="440" align="center">
                </el-table-column>
                <el-table-column prop="taskName" label="任务名称" width="440" align="center">
                </el-table-column>
                <el-table-column prop="part" label="牵头部门" width="440" align="center">
                </el-table-column>
                <el-table-column prop="detail" label="明细" width="220" align="center">
                    <!-- <template slot-scope="scope">
                        <router-link to="/">
                            <div style="color: #84BA6E">
                                <i class="el-icon-document"></i>
                                <span>明细</span>
                            </div>
                        </router-link>
                    </template> -->
                </el-table-column>
                <!-- <el-table-column prop="status" label="状态" width="180" align="center">
                    <template scope="scope">
                        <span v-if="scope.row.status===0" :style="{color: '#F0BB3A'}">待审核</span>
                        <span v-else-if="scope.row.status===1" :style="{ color: '#E53E51'}">驳回</span>
                        <span v-else :style="{ color: '#84BA6E'}">审核完成</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="endDate" label="止期" width="259" align="center">
                </el-table-column> -->
            </el-table>
            <!-- 弹出框 -->
            <!-- <el-dialog title="明细:" :visible.sync="dialogTableVisible" width="1622px">
                <el-table :data="gridData" :header-row-style="{height:'51px'}" :header-cell-style="{
                backgroundColor: '#6E96E9',
                fontSize: '16px',
                fontFamily: 'Source Han Sans CN',
                fontWeight: 400,
                color: '#FFFFFF',
                'text-align': 'center',
            }" max-height="310px" border>
                    <el-table-column align="center" property="institution" label="机构" width="150"></el-table-column>
                    <el-table-column align="center" property="part" label="部门" width="200"></el-table-column>
                    <el-table-column align="center" show-overflow-tooltip property="oneTarget" label="一级指标">
                    </el-table-column>
                    <el-table-column align="center" show-overflow-tooltip property="twoTarget" label="二级指标">
                    </el-table-column>
                    <el-table-column align="center" show-overflow-tooltip property="threeTarget" label="三级指标">
                    </el-table-column>
                    <el-table-column align="center" show-overflow-tooltip property="score" label="分数"></el-table-column>
                    <el-table-column align="center" show-overflow-tooltip property="evidence" label="证明材料">
                        <a href="#" :style="{ color: '#6E96E9'}">查看</a>
                    </el-table-column>
                    <el-table-column align="center" show-overflow-tooltip property="status" label="状态">
                        <template scope="scope">
                            <span v-if="scope.row.status===0" :style="{color: '#F0BB3A'}">待审核</span>
                            <span v-else-if="scope.row.status===1" :style="{ color: '#E53E51'}">驳回</span>
                            <span v-else :style="{ color: '#84BA6E'}">审核完成</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog> -->
            <!-- 分页 -->
            <div class="pagination-block">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                    layout="total, prev, pager, next, jumper" :total="total" background>
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
// 引入mock数据
import "@/mock/mockServe"
import axios from "axios"
// 引入查询栏
import InputPart from "@/components/InputPart.vue";
export default {
    name: "TablePart",
    components: {
        InputPart,
    },
    data() {
        return {
            // 表格默认数据
            tableData: [],
            // 复选框默认数据
            multipleSelection: [],
            // 分页数据
            // 当前页
            currentPage: 1,
            // 每页条目数
            pageSize: 10,
            // 总条目数
            total: 200,
            // 弹出框数据
            gridData: [
                {
                    institution: '2016-05-02',
                    part: '王小虎',
                    oneTarget: '上海市普陀区金沙江路 1518 弄',
                    twoTarget: '上海市普陀区金沙江路 1518 弄',
                    threeTarget: '上海市普陀区金沙江路 1518 弄',
                    score: '上海市普陀区金沙江路 1518 弄',
                    evidence: '上海市普陀区金沙江路 1518 弄',
                    status: '上海市普陀区金沙江路 1518 弄',
                },
            ],
            // 控制弹出框显隐
            // dialogTableVisible: false,
        };
    },

    methods: {
        // 样式相关调整
        // 第一列复选框方法
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 表格隔行换色方法
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 !== 0) {
                return 'interval-row';
            } else 
            return '';
        },
        // 修改分页文字
        changePaginationText() {
           this.$nextTick(() => {
               document.getElementsByClassName('el-pagination__jump')[0].childNodes[0].nodeValue = '跳转至 '
           })
        },

        // 请求后台数据相关方法
        // 初始化表格数据
        async initTable() {
            let { data: res } = await axios.get('http://api.com', {
                params: {
                    currentPage: 1,
                    pageSize: 10,
                }
            })
            // console.log(222, res);
            if (res) {
                this.tableData = res.data.data
                this.total = res.data.total
                // console.log(333, this.tableData);
            } else throw '请求数据失败'

        },
        // 分页方法-当前页变化时重新请求数据
        async handleCurrentChange(val) {
            console.log('触发分页', val);
            // let { data: res } = await axios.get('http://api.com', 
            // {
            //     params: {
            //         currentPage: val,
            //         pageSize: 10,
            //     }
            // }
            // )
            // if(res) {
            //     this.tableData = res.data.data
            //     this.total = res.data.total
            // } else throw '请求数据失败'
        },
        // 查询条件回传方法
        queryData(val) {
            this.currentPage = val.currentPage
            this.pageSize = val.pageSize
            this.total = val.total
            this.tableData = val.data
        },
        // 点击弹出详情方法
        // async rowClick(row) {
        //     this.dialogTableVisible = true
        //     console.log(3333, row);
        //     let { data: res } = await axios.get('http://inputTable.com', {
        //         // params: {
        //         //     institution: row.institution,
        //         //     taskName: row.taskName,
        //         //     part: row.part,
        //         //     status: row.status,
        //         //     endDate: row.endDate
        //         // }
        //     })
        //     // console.log(999, res);
        //     console.log(res.data);
        //     if(res) {
        //         this.gridData = res.data.data
        //         console.log(888);
        //     } else throw '获取弹出框错误'
            
        // }
    },
    created() {
        this.changePaginationText();
        this.initTable()
    }
};
</script>

<style lang="less" scoped>


// 复选框形状样式修改
/deep/.el-checkbox__inner {
    width: 18px;
    height: 18px;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
}
/deep/.el-checkbox__inner::after {
    top: 3px;
    left: 6px;
}

/deep/.el-table .interval-row {
    background: #F0F4FD;
}

/deep/.el-dialog {
    margin: 323px 0 0 278px !important;
}

.pagination-block {
    margin-top: 20px;
    // 对分页默认样式进行修改
    .el-pagination {
        // 居左
        text-align: right;
        /deep/.el-pager li {
            line-height: 25px;
        }
    }

    // 使数字有边库框
    /deep/.el-pagination.is-background .btn-next,
    /deep/.el-pagination.is-background .btn-prev,
    /deep/.el-pagination.is-background .el-pager li {
        border: 1px solid #D7D7D7;
        background-color: rgba(0,0,0,0);
    }

    // 选中分页时的颜色
    /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
        color: #409EFF;
    }


}

</style>