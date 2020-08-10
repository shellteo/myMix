import Vue from 'vue'
import {
  Dialog,
  Table,
  TableColumn,
  Loading,
  Message,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Button
} from 'element-ui'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.use(Dialog)
  .use(Table)
  .use(TableColumn)
  .use(Loading.directive)
  .use(Tabs)
  .use(TabPane)
  .use(Input)
  .use(Button)
  .use(Form)
  .use(FormItem)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
