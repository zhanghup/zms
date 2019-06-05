
import Vant, {Locale} from 'vant'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import axios from 'axios'

import '../themes/fonts/iconfont'

Locale.use('zh-CN', zhCN)

const components = [
]

const install = function (Vue) {
  // 加载Vant
  Vue.use(Vant)
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$ajax = axios
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.1.0',
  install,
  ...components
}
