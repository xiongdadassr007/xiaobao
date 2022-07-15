import Vue from "vue";
import VueRouter from "vue-router";
import TaskOne from "@/views/TaskOne.vue";
import TaskTwo from "@/views/TaskTwo.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/taskOne" },
  { path: "/taskOne", component: TaskOne },
  { path: "/taskTwo", component: TaskTwo },
];

const router = new VueRouter({
  routes,
});

export default router;
