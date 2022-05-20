# vue.js

> 如何引用

```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

>声明式渲染

Vue.js的核心就是有一个运气采用简洁的模板语法来声明式的将数据渲染金DOM的系统：

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

现在数据和 DOM 已经被建立了关联，所有东西都是**响应式的**

除了文本插值，我们还可以像这样来绑定元素 attribute：

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

其中v-bind attribute被称为指令，带有前缀v-，以表示他们是Vue提供的特殊attribute

**Vue的渲染：**

　**指令式渲染：**

​    v-html，v-text 采用{{}}语法==>插值运算

​    v-html：它可以加标签，它会解析成html

​    v-text：不能加标签，如果加了，它会当作字符串展示出来

**插值表达式：**

​     {{ data中的数据 }}

**v-text****与插值表达式的区别：**

  默认v-text没有闪烁的问题的，而插值表达式有闪烁问题

  v-text 会覆盖元素中原本的内容，但是插值表达式只会替换自己的这个占位符，不会把整个元素的内容清空

**条件指令：v-if**

v-if="a" 

后面的值如果是true节点就显示，false就隐藏

vm.$watch('wantval',function(newVal,oldVal){

​	console.log(newVal,oldVal);

})

<img src="C:\Users\hale\AppData\Roaming\Typora\typora-user-images\image-20211026121317382.png" alt="image-20211026121317382"  />

> html常用事件

`v-on` 来绑定基本事件包括click,dblclick,onmouseout,可以考虑使用`@click`来简写代表`v-on:click` 

`onchange` 事件会在域的内容改变时发生。`onchange` 事件也可用于单选框与复选框改变后触发的事件。

`onmouseover` 事件会在鼠标指针移动到指定的元素上时发生。

`onmouseout` 事件和 `onmouseover` 事件类似，`onmouseover` 事件是在鼠标移动到元素上时触发事件，而`onmouseout` 事件会在鼠标指针移出指定的元素时发生。

`oninput` 当元素获得用户输入时运行

`onfocus` 当窗口获得焦点时运行

`onscroll` 当滚动元素滚动元素的滚动条时运行

`onsubmit` 当提交表单的时候运行

上述都可以使用`v-on`来进行绑定

> 表单输入绑定

利用`v-model`进行数据的双向绑定，同时可以考虑响应式输出；

同时`v-model` 在内部为不同的输入元素使用不同的属性抛出不同的事件：

* text和textarea元素使用value和input事件
* checkbox和radio使用`checked` 属性和`change` 事件
* select将`value` 作为prop并将`change`作为事件

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
<textarea v-model="message2" placeholder="add multiple lines"></textarea>
<p style="white-space: pre-line;">{{ message2 }}</p>
```

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<input type="radio" id="one" value="One" v-model="picked">
```

```js
var vm = new Vue({
	el : "#app",
	data : {
		message : "test",
		message2 :"hi",
		checkedNames : ['Jack', 'John'],
		picked : "Two"
	},
	methods: {
		submit : function () {
			console.log(this.message);
			
		}
	}
});
```

> 组件基础

组件模板必须有根节点

```js
Vue.component('button-counter/*名称*/', {
	data: function () {
		return {
		  count: 0
		}
	},
	template: '<button v-on:click="clickfun">{{title}} You clicked me {{ count }} times.</button><slot></slot>',/*定义这样的一个样式，来实现之后的组件复用*/
	methods:{
		clickfun : function () {
			this.count ++;
			this.$emit('clicknow', this.count);
		}
	}
})
var vm = new Vue({
	el : "#app",
	data : {
		
	},
	methods:{
		clicknow : function (e) {
			console.log(e);
		}
	}
});
```

>组件注册

若在new vue 对象中注册那么就是局部注册，不然就是全局注册















