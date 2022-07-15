<template>
    <el-container>
        <el-header>顶部空白</el-header>
        <el-container>
            <el-aside width="259px">
                <Menu></Menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import '@/assets/less/global.less'
import Menu from '@/components/Menu.vue'
export default {
    components: {
        Menu
    }
    
}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #6E96E9;
    color: #333;
    text-align: center;
    height: 119px !important;
    line-height: 119px;
}

.el-aside {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
}

body > .el-container {
    margin-bottom: 40px;
    height: 100%;
}


</style>
