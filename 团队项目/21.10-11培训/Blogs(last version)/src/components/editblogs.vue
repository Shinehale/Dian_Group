<template>
  <div class="add-blog">
    <h2>修改博客</h2>
    <form v-show="submitted">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" required />
      <label>博客内容 </label>
      <textarea v-model="blog.content"></textarea>
      <label>文章出处:</label>
      <select v-model="blog.author">
        <option v-for="authors in authors" :key="authors">{{authors}}</option>
      </select>
      <button type="button" @click="post"> 确定修改</button>
    </form>
  </div>
</template>

<script>
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
		id:this.$route.params.id,
        authors:['原创','转载'],
        submitted:1
      }
    },
	created(){
		let that=this;
		this.axios.get("https://myvue-8d326-default-rtdb.firebaseio.com/posts/"+that.id+".json").then(function(res){
			that.blog=res.data;
		},function(err){
			alert('你没有阅读权限');
		});
	},
    methods:{
      post: function(){
		  let that=this
        this.axios.put("https://myvue-8d326-default-rtdb.firebaseio.com/posts/"+that.id+".json",this.blog).then(function(response){
          console.log(response);
		  that.$router.push({path:'/'})
        },function(err){
			alert('你没有编辑权限');
		})
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
  background-color: white;
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
  border: 1px dotted #ccc;
  margin: 30px 0;
  border-radius: 15px;
}#preview h3 {
  margin-top: 10px;
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
option {
  font-size: 20px;
}
input[type='checkbox'] {
    /* zoom:280% */
}
</style>
