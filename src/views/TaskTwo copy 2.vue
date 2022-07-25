<template>
    <div class="recttask">
        <header>
            <span></span>整改情况报备
        </header>
        <div class="body">
            <el-form inline ref="FilingFrom" :rules="this.FilingRules" :model="FilingKey">
                <el-form-item>
                    <span style="font-size:18px"> 任务列表：</span>
                </el-form-item>
                <el-form-item label="机构：" prop="orgId">
                    <el-select v-model="FilingKey.orgId" clearable placeholder="请选择机构">
                        <el-option v-for="(v, k) in orgdata" :key="k" :label="v.orgName" :value="v.orgId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="牵头部门：" prop="leadDepartId">
                    <el-select v-model="FilingKey.departId" clearable placeholder="请选择活动部门">
                        <el-option v-for="(v, k) in departdata" :key="k" :label="v.departName" :value="v.departId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="底稿名称：" prop="draftName">
                    <el-input v-model="FilingKey.draftName" clearable placeholder="请填写底稿名称"> </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="queryfn">查询</el-button>
                </el-form-item>
            </el-form>
            <div style="height:700px">
                <el-table border ref="multipleTable" :data="TaskData" @selection-change="selectionChange" stripe
                    :header-cell-style="{ background: '#6E96E9', textAlign: 'center' }" :row-style="getrowstyle">
                    <el-table-column align="center" type="selection" width="42">
                    </el-table-column>
                    <el-table-column label="发起机构" align="center" width="200" prop='originCom'>
                    </el-table-column>
                    <el-table-column label="任务名称" align="center" width="200" prop='missionName'>
                    </el-table-column>
                    <el-table-column label="牵头部门" align="center" width="200" prop='leadDepartment'>
                    </el-table-column>
                    <el-table-column label="一级指标" align="center" width="200" prop='firstIndex'>
                    </el-table-column>
                    <el-table-column label="二级指标" align="center" width="200" prop='secondIndex'>
                    </el-table-column>
                    <el-table-column label="三级指标" align="center" width="200" prop='thirdIndex'>
                    </el-table-column>
                    <el-table-column label="状态" sortable align="center" width="95" prop='missionStatus'>
                        <template slot-scope="scope">
                            <span v-if="scope.row.missionStatus == '审核完成'" style="color:#84BA6E">{{
                                    scope.row.missionStatus
                            }}</span>
                            <span v-if="scope.row.missionStatus == '待审核'" style="color:#F0BB3A">{{
                                    scope.row.missionStatus
                            }}</span>
                            <span v-if="scope.row.missionStatus == '超时'" style="color:#ED5B6C">{{
                                    scope.row.missionStatus
                            }}</span>
                            <span v-if="scope.row.missionStatus == '驳回'" style="color:#ED5B6C">{{
                                    scope.row.missionStatus
                            }}</span>
                            <span v-if="scope.row.missionStatus == '即将到期'" style="color:#ED5B6C">{{
                                    scope.row.missionStatus
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="止期" align="center" prop='deadLine'>
                    </el-table-column>

                    <el-table-column label="处理" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button @click="HandleTaskInfo(scope.row)" icon="el-icon-edit-outline" type="text"
                                style="color:#22C82D">处理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <footer style="float:right">
            <!-- page-size 每页显示条数  current-page当前页数  total总条数-->
            <el-pagination @size-change="sizechangefn" @current-change="getData" :current-page.sync="currentPage"
                :page-size.sync="pageSize" layout="total, prev, pager, next, jumper" :total="total" background>
            </el-pagination>
        </footer>
        <!-- 处理弹出层 -->
        <el-dialog :visible.sync="HandleDialog">
            <h5 style="font-size:18px;color:#333333;text-align:center;font-weight:none;margin-bottom:30px">整改审核列表</h5>
            <el-form ref="EditForm" :model="HandleTask" label-width="80px" :rules="this.$store.state.EditRules">
                <input type="hidden" name="indexId" v-model="HandleTask.indexId">
                <el-form-item label="一级指标：" prop="firstIndex">
                    <el-input v-model="HandleTask.firstIndex"></el-input>
                </el-form-item>
                <el-form-item label="二级指标：" prop="secondIndex">
                    <el-input v-model="HandleTask.secondIndex"></el-input>
                </el-form-item>
                <el-form-item label="三级指标：" prop="thirdIndex">
                    <el-input v-model="HandleTask.thirdIndex"></el-input>
                </el-form-item>
                <el-form-item label="分数：" prop="score">
                    <el-input v-model="HandleTask.score" style="width: 224px;margin-right: 5px;">
                    </el-input>
                    <span>分</span>
                </el-form-item>
                <el-form-item label="资料：">
                    <el-button type="primary" style='width: 136px;height: 42px;background: #6E96E9;border-radius: 3px;'
                        @click="onSubmit">上传</el-button>
                    <el-button type="primary" style='width: 136px;height: 42px;background: #6E96E9;border-radius: 3px;'
                        @click="onSubmit">下载</el-button>
                    <el-button type="primary" style='width: 136px;height: 42px;background: #6E96E9;border-radius: 3px;'
                        @click="onSubmit">删除</el-button>
                </el-form-item>
                <el-form-item label="超时调整：">
                    <el-date-picker v-model="HandleTask.endDate" type="date" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" placeholder="选择日期">
                    </el-date-picker>
                    <span style="color:#ED5B6C;margin-left: 5px;">*该日期为最终截止日</span>
                </el-form-item>
                <el-form-item>
                    <el-button style='width: 308px;height: 50px;background: #ED5B6C;margin: 10px 50px 0 10px;'
                        type="danger" @click="HandleDialog = false">返回</el-button>
                    <el-button style='width: 308px;height: 50px;background: #6E96E9;margin: 10px 10px 0 50px;'
                        type="primary" @click="HandleTaskFn">确定修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'SituationReport',
    data() {
        return {
            // 搜索的条件
            FilingKey: {
                orgId: '',
                departId: '',
                draftName: ''
            },
            // 表格数据
            TaskData: [],
            // 每页条数
            pageSize: 10,
            // 总条数
            total: 0,
            // 当前页数
            currentPage: 1,
            // 选中的数据
            SelectData: [],
            //控制处理
            HandleDialog: false,
            // 编辑得数据
            HandleTask: {},
            // 状态的style
            // 机构
            orgdata: [],
            // 部门
            departdata: [],
            FilingRules: {
                orgId: [
                    // { required: true, message: '请选择机构', trigger: 'change' }
                ],
                leadDepartId: [
                    // { required: true, message: '请选择部门', trigger: 'change' }
                ],
                draftName: [
                    // { required: true, message: '请填写底稿名称', trigger: 'change' }
                ]
            },
        }
    },
    methods: {
        //获取数据
        getData() {
            let url = `http://101.201.29.183:3500/RectAudit/getRecords?pageNum=${this.currentPage}&pageSize=${this.pageSize}`
            axios.post(url, {
                orgId: this.FilingKey.orgId,
                departId: this.FilingKey.departId,
                draftName: this.FilingKey.draftName
            },
            ).then(res => {
                console.log('表格数据', res);
                if (res.data.success == true) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        const value = res.data.data[i];
                        if (value.days === -1) {
                            if (value.missionStatus == "审核完成") {
                                value.missionStatus = '审核完成'
                            } else {
                                value.missionStatus = '超时'
                            }
                        }
                    }
                    this.TaskData = res.data.data;
                    this.total = res.data.total;
                } else {
                    this.$message.error(res.data.msg);
                }

            })
        },
        // 查询
        queryfn() {
            this.getData()
        },

        // 处理
        HandleTaskInfo(item) {
            this.HandleDialog = true;
            let url = `http://101.201.29.183:3500/RectAudit/getAuditDetail`
            axios.post(url, JSON.stringify({
                indexId: item.indexId,
                draftNo: item.draftNo,
                departId: item.departId
            })).then(res => {
                if (res.data.success == true) {
                    this.HandleTask = res.data.data;
                } else {
                    this.$message.error("请求失败");
                }

            })
            this.HandleTask = item
        },
        // 编辑提交
        HandleTaskFn() {
            // 发送post请求修改数据
            this.$refs.EditForm.validate((valid) => {
                if (valid) {
                    let url = `http://101.201.29.183:3500/RectAudit/updateAuditDetail`
                    axios.post(url, JSON.stringify({
                        indexId: this.HandleTask.indexId,
                        score: this.HandleTask.score,
                        departId: this.HandleTask.departId,
                        endDate: this.HandleTask.endDate,
                        modifyCode: '111',
                        businessNo: '',
                        modifyTime: '',
                    })).then(res => {
                        if (res.data.success == true) {
                            this.HandleDialog = false;
                            this.getData();
                        } else {
                            this.$message.error(res.data.message);
                        }

                    })
                } else {
                    return false;
                }
            });
        },
        // 表格多选框
        selectionChange(val) {
            this.SelectData = val;
            console.log(val);
        },
        // 分页
        sizechangefn() {
            this.currentPage = 1;
            this.getData();
        },
        // 把超时的任务字体修改为红色
        getrowstyle({ row }) {
            if (row.missionStatus == '超时') {
                return { color: '#ED5B6C' };
            }
        },
        // 
        onSubmit() {

        }
    },
    mounted() {
        this.getData();
        // 暂时隐藏
        // this.api.org.all().then(res => {
        //     if (res.data.success == true) {
        //         this.orgdata = res.data.data
        //     }
        // });
        // this.api.depart.all().then(res => {
        //     if (res.data.success == true) {
        //         this.departdata = res.data.data
        //     }
        // });
    },
}
</script>

<style scoped>
.recttask {
    text-align: left !important;
}

.recttask header span {
    display: inline-block;
    width: 4px;
    height: 16px;
    margin-right: 5px;
    background: rgb(110, 150, 233);
}

.recttask header {
    color: #333333;
    font-size: 18px;
    font-weight: bold;
}

::v-deep .el-form-item__label {
    width: auto !important;
    padding: 0 !important;
}

::v-deep .body .el-input {
    width: 197px;
    height: 36px;
}

::v-deep .el-table thead {
    color: #fff;
}

.body {
    padding: 20px 0;
}

::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
    background: #F0F4FD;
}

::v-deep .el-pagination .btn-prev,
::v-deep .el-pagination .btn-next {
    background: #fff;
    border: 1px solid #D7D7D7;
}

::v-deep .el-pagination.is-background .el-pager li {
    background: #fff;
    border: 1px solid #D7D7D7;
}

::v-deep .el-dialog .el-form {
    padding: 0 100px
}

::v-deep .el-dialog__header {
    height: 60px;
    background: #6E96E9;
    box-sizing: border-box;
}

::v-deep .el-dialog {
    width: 1100px;
    /* height: 600px; */
}

::v-deep .handlesubmit .el-dialog .el-button {}

::v-deep .el-dialog__headerbtn .el-dialog__close {
    font-size: 20px;
    color: #fff
}

.tasklist {
    font-size: 18px;
}
</style>