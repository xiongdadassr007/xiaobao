import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./api";
import {
  Container,
  Header,
  Aside,
  Main,
  Col,
  Row,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Select,
  Option,
  Form,
  FormItem,
  Input,
  Button,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  DatePicker,
  Upload,
  MessageBox,
  Message,
} from "element-ui";
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Col);
Vue.use(Row);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Main);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.use(Upload);

Vue.prototype.api = api;

Vue.config.productionTip = false;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
