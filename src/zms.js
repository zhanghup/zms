
import Vant from 'vant'
import 'vant/lib/index.css'

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
  version: '1.0.0',
  install,
  ...components
}
