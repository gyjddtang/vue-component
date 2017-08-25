/**
 * Created by Mili on 2017/8/23.
 */

import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Clip from './views/Clip'
import Canvas from './views/Canvas'
import Popover from './views/Popover'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/clip',
      name: 'Clip',
      component: Clip
    }, {
      path: '/canvas',
      name: 'Canvas',
      component: Canvas
    }, {
      path: '/popover',
      name: 'Popover',
      component: Popover
    }
  ]
})
