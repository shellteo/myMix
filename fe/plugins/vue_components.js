import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import header from '~/components/Header.vue'
import footer from '~/components/Footer.vue'
import '@/icons'

Vue.component('g-header', header)
Vue.component('g-footer', footer)

Vue.use(VueClipboard)
