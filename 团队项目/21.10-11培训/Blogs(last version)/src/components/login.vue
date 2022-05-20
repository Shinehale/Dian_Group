<template>
	<div id="Login">
		<h1>Login</h1>
		<p v-show="right_.right==2?true:false" class="new">请输入正确的用户名称和密码</p>
		<p>Username:</p>
		<input type="text" v-model="user.username" placeholder="please input your username"/> 
		<p>Password:</p>
		<input type="password" v-model="user.password" placeholder="please input your password"/>
		<button type="button" @click="ppost()" >submit</button>
		<button type="button" @click="reset()">Reset</button>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
export default {
  name:'login',
  data(){
    return{
		user:{
			username:null,
			password:null
		},
		right_:{
			right:0
		}
    }
  },
  methods:{
	  reset:function(){
		  this.user.username=null;
		  this.user.password=null;
	  },
	  ppost: function(){
			if (this.user.username=='shine_hale'&&this.user.password=='123456'){
				
				this.axios.put('https://myvue-8d326-default-rtdb.firebaseio.com/right.json',{right:1}).then(function(res){},function(err){});
				this.$router.push({path:'/'});
			}else {
				this.right_.right=2;
			}
	  },
	  post:function(){
		  let that=this;
		  this.axios.post('https://myvue-8d326-default-rtdb.firebaseio.com/right.json',that.right_).then(function(res){
		  				  console.log(res);
		  },function(err){});
		 //  this.axios.post('https://myvue-8d326-default-rtdb.firebaseio.com/right.json',this.right_).then(function(res){
			// 			console.log(res);
			// },function(error){err});
	  }
  }
}
</script>

<style scoped>
#Login {
	max-width: 800px;
	margin: 0 auto;
	background-color: transparent;
	box-shadow: 0 15px 25px rgba(94, 88, 5, 0.5);
	border-radius: 25px;
	margin-bottom: 30px;
}
h1 {
	text-align: center;
	font-family: "comic sans ms";
	color:aqua;
	margin-bottom: 30px;
	font-size: 50px;
}
input[type=text],input[type=password] {
	border: none;
	background-color: transparent;
	box-shadow: 0 5px 5px rgba(94, 88, 5, 0.5);
	margin-left: 20px;
	margin-bottom: 20px;
	border-radius: 15px;
	width: 95%;
	font-size: 30px;
	color: #444444;
	padding-left: 5px;
}
p {
	margin-left: 20px;
	font-size: 40px;
	font-family: "comic sans ms";
	margin-bottom: 20px;
	color: #00ff00;
}
button{
	background-color:rgba(170, 0, 255, 0.2);
	margin-left:25px ;
	margin-bottom: 25px;
	padding: 10px;
	border-radius: 25px;
	color: white;
	font-size: 20px;
	margin-top: 20px;
}
.new {
	font-size: 20px;
	color: #DC143C;
	font-family: Youyuan;
}
</style>
