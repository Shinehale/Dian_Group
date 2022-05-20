import showblogs from'./components/showblogs.vue'
import AddBlog from'./components/AddBlog.vue'
import singleblog from './components/singleblog.vue'
import login from './components/login.vue'
import editblogs from './components/editblogs.vue'

export default[
  { path :"/",component:showblogs},
  { path:'/add',component:AddBlog},
  { path:'/blog/:id',component:singleblog},
  { path:'/login',component:login},
  { path:'/edit/:id',component:editblogs }
]
