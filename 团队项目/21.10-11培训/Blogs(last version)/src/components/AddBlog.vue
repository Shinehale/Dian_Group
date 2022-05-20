<template>
  <div class="add-blog">
    <h2>添加博客</h2>
    <form v-show="submitted">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" required />
      <label>博客内容 </label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkbox">
        <label>Vue.js</label>
        <input type="checkbox" name="" v-model="blog.categories" value="Vue.js" />
        <label>Node.js</label>
        <input type="checkbox" name="" v-model="blog.categories" value="Node.js" />
        <label>React.js</label>
        <input type="checkbox" name="" v-model="blog.categories" value="React.js" />
        <label>Angular4</label>
        <input type="checkbox" name="" v-model="blog.categories" value="Angular4" />
      </div>
      <label>文章出处:</label>
      <select v-model="blog.author">
        <option v-for="author in authors" :key="author">{{author}}</option>
      </select>
      <button type="button" @click="ppost"> 添加博客</button>
    </form>
    <div v-show="!submitted">
      <h3>您的博客发布成功!</h3>
    </div>
    <div id="preview" v-show="!submitted">
      <h3>博客总览</h3>
      <p class="title">博客标题:</p>
	  <p class="title1"> {{blog.title}}</p>
      <p class="content">博客内容:</p>
      <p>{{blog.content}}</p>
    </div>
  </div>
</template>

<script>
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vue from 'vue'
Vue.use(VueAxios,axios);
  export default{
    name:'add-blog',
    data(){
      return {
        blog:{
          title:"",
          content:"",
          categories:[],
          author:""
        },
        authors:['原创','转载'],
        submitted:1
      }
    },
    methods:{
      ppost: function(){
		let _this=this;
        this.axios.post('https://myvue-8d326-default-rtdb.firebaseio.com/posts.json',this.blog).then(function(response){
          console.log(response);
          _this.submitted=0;
        },function(err){ })
        //记得最后把成功的现实渲染到页面上.
      }
    }
  }
</script>

<style scoped>
.add-blog * {
  box-sizing: border-box;
}
.add-blog{
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
}
label{
  display: block;
  margin: 20px 0 10px;
  font-size: 20px;
  font-family: Youyuan;
}
input[type="text"],textarea,select{
  width: 100%;
  padding: 8px;
  border-radius: 25px;
}
#checkbox label{
  display: inline-block;
  margin-top: 0;
}
#checkbox input {
  display: inline-block;
  margin-right: 10px;
}
button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: beige;
  border: 0;
  padding: 14px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
	width: 100px;
	height: 50px;
}
#preview  {
  padding:10px 20px;
  border: 0 solid #ffffff;
  margin: 30px 0;
  border-radius: 15px;
  font-family: Youyuan;
  box-shadow: 0 5px 10px #000000;
  
}#preview h3 {
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 900;
  font-size: 30px;
}
.title{
	font-size: 20px;
	margin-bottom: 15px;
	color: gray;
}
.title1{
	font-size: 30px;
	font-family: 微软硬黑;
}
.content {
	font-size: 20px;
	margin-bottom: 20px;
	margin-top: 20px;
	color: gray;
}
textarea {
  width: 100%;
  height: 500px;
  border-radius: 25px;
}
.add-blog h2 {
  text-align: center;
  font-size: 30px;
}
select {
  font-size: 20px
}
option {
  font-size: 20px;
}
</style>
