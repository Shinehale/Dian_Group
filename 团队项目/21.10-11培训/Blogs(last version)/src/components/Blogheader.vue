<template>
  <nav>
    <ul>
      <li>
        <router-link to="/" exact>博客</router-link>
        <router-link to="/add" exact>写博客</router-link>
		<router-link to="/login" class="Login" v-show="check">Login</router-link>
		<button class="on" v-show="!check">已登录</button>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default{
    name:'Blogheader',
	data(){
		return {
			check:1
		}
	},
	created(){
		let that=this;
		this.axios.get('https://myvue-8d326-default-rtdb.firebaseio.com/right.json').then(function(res){
			if (res.data.right==1) that.check=0;
			else that.check=1;
		},function(err){
			
		})
	}
  }
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: left;
  margin: 0;
  font-weight: 700;
}
li {
  display: inline-block;
  margin-left: 260px;
}
a {
  color:#fff;
  text-decoration: none;
  padding: 12px;
  border-radius: 12px;
  font-size: 20px;
}
nav {
  background-color: #000000;
  padding: 25px ;
  margin-bottom: 50px;
  border-radius: 5px;
}
.router-link-active{
  background-color: rgba(255,255,255,0.8);
  color:#444;
}
.Login {
	margin-left:500px ;
}
.on{
	margin-left:500px ;
	color:#fff;
	border-radius: 12px;
	font-size: 20px;
	background-color: #000000;
	border: none;
	font-family: Youyuan;
	font-weight: 700;
}
</style>
