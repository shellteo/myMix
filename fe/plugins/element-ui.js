import Vue from 'vue'
import {
  Dialog,
  Table,
  TableColumn,
  Loading,
  Message,
  MessageBox,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Button,
  Tooltip,
  Icon
} from 'element-ui'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// 设置语言
locale.use(lang)

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
  .use(Tooltip)
  .use(Icon)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
