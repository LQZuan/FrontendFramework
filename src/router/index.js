import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import Jenkins from '../components/Jenkins'
import Task from '../components/Task'
import Report from '../components/Report'
import Case from '../components/Case'
// import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push =  function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/Case',
    name: 'Case',
    component: Case
  },
  {
    path: '/Jenkins',
    name: 'Jenkins',
    component: Jenkins
  },
  {
    path: '/Task',
    name: 'Task',
    component: Task
  },
  {
    path: '/Report',
    name: 'Report',
    component: Report
  }
]

const router = new VueRouter({
  routes
})

export default router
