<template>
  <div v-theme="" id="show-blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="blog in filteredBlogs" :key="blog" class="single-blog">
      <router-link v-bind:to="'/blog/' + blog.id"> <h2 v-rainbow>{{blog.title| to-uppercase}}</h2> </router-link>
      <article>{{blog.content|snippet}}</article>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
export default {
  name: 'showblogs',
  data (){
    return{
      blogs:[],
      search:""
    }
  },
  created() {
    let that =this;
    this.axios.get("https://myvue-8d326-default-rtdb.firebaseio.com/posts.json").then(function(res){
	  let arrblog=[];
	  for (let key in res.data) {
		  res.data[key].id=key;
		  arrblog.push(res.data[key]);
	  }
	  that.blogs=arrblog;
    },function(error){})
  },
  computed:{
    filteredBlogs:function(){
      return this.blogs.filter((blog)=>{
        return blog.title.match(this.search)
      })
    }
  }
}
</script>


<style scoped type="text/css">
#show-blogs {
  max-width: 960px;
  margin: 0 auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px dotted #AAAAAA;
  box-shadow: 0 15px 25px rgba(94, 88, 5, 0.5);
  border-radius: 25px;
}
h2 {
  font-family: "Youyuan",
}
a {
  text-decoration: none;
}
input[type="text"]{
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
}
h1 {
  margin-bottom: 20px;
}
input {
  background-color:  rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 20px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
</style>
