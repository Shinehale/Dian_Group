<template>
  <div id="app">
    <!-- <add-blog></add-blog> -->
    <!-- <showblogs></showblogs> -->
    <Blogheader></Blogheader>
    <router-view></router-view>
  </div>
</template>

<script>
import AddBlog from './components/AddBlog'
import showblogs from './components/showblogs'
import Blogheader from './components/Blogheader'
import singleblog from './components/singleblog'
import login from './components/login'
import editblogs from './components/editblogs'
export default {
  name: 'App',
  components: {
    AddBlog,showblogs,Blogheader,singleblog,login
  }
}
</script>
<style type="text/css">
  *{
    margin: 0;
    padding: 0;
  }
  body{
     background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F06%2F20180706214433_ynlfj.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639214518&t=46a13e4301db99ed34cf922efa751881);
     background-repeat: no-repeat;
     background-size: cover;
  }
</style>
