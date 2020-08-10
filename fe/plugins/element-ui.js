import Vue from 'vue'
import {
  Dialog,
  Table,
  TableColumn,
  Loading,
  Message
} from 'element-ui'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
