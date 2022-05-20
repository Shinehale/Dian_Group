<template>
  <div id="singleblog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
    <p style="color: #AAAAAA;">来源:{{blog.author}}</p>
    <p style="color: #AAAAAA;">分类:</p>
    <ul>
      <li v-for="category in blog.categories" :key="category">
        {{category}}
      </li>
    </ul>
    <button type="button" @click="this.delete">删除</button>
    <router-link :to="'/edit/'+this.id">
      <button type="button">编辑</button>
    </router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
export default {
  name: 'singleblog',
  data(){
    return{
        id:this.$route.params.id,
        blog:{}
    }
  },
  created() {
    let that =this;
    this.axios.get("https://myvue-8d326-default-rtdb.firebaseio.com/posts/"+that.id+".json").then(function(data){
        that.blog=data.data;
    },function(error){})
  },
  methods:{
    delete:function(){
		let that=this;
      this.axios.delete("https://myvue-8d326-default-rtdb.firebaseio.com/posts/"+this.id+".json").then(function(res){
        that.$router.push({path:'/'});
      }).catch(function(err){
			console.log(err);
			alert('删除失败');
      })
    }
  }
}
</script>

<style scoped>
  *{
    font-family: Youyuan;
  }
  #singleblog{
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px dotted #aaa;
    border-radius: 20px;
    box-shadow: 0 15px 25px rgba(94, 88, 5, 0.5);
  }
  #singleblog h1 {
    text-align: left;
    font-family: Youyuan;
  }
  button{
    width: 50px;
    border: none;
    height: 30px;
    border-radius: 20px;
    background-color: rgba(21, 229, 229, 0.2);
    margin-right: 10px;
    font-weight: 500;
	margin-top: 20px;
  }
  p {
    margin: 10px 0;
  }
  h1 {
	  font-family: 微软硬黑;
	  font-size: 40px;
	  margin-bottom: 20px;
  }
  article{
	  font-size: 20px;
  }
  li{
	  list-style: none;
	  margin-left: 20px;
  }
</style>
