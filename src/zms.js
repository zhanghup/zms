
import Vant from 'vant'
import 'vant/lib/index.css'
// import zhCN from 'vant/lib/locale/lang/zh-CN'

// import '../themes/fonts/iconfont'

// Locale.use('zh-CN', zhCN)

const components = [
]

const install = function (Vue) {
  // 加载Vant
  Vue.use(Vant)
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.0.1',
  install,
  ...components
}
