// 暂用菜单页
<template>
    <el-row class="tac">
        <el-col :span="12">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router
            >
                <el-submenu index="/">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>消保自评</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/taskOne">整改任务</el-menu-item>
                        <el-menu-item index="/taskTwo">整改查询</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "Menu",
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>

<style lang="less" scoped>
.el-col-12 {
    width: 100%;
}

</style>