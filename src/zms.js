import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
import App from './app'

class vue extends Vue {
  constructor(param) {
    super({
      el: '#app',
      components: { App },
      template: '<App/>',
      routes: router(param.routes),
      ...param
    })
  }
}

vue.use(Vant);

[].map(component => {
  vue.component(component.name, component)
})

export default vue
