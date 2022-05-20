# 《Vue.js 3.0从入门到实战》笔记

## Vue.js概述

MVVM（Model-View-ViewModel）是一种软件框架模式，核心是数据驱动，其中Model和View并不直接通信，而是用ViewModel在中间充当一个观察者的角色。而他的最核心的特性就是**数据双向绑定**，核心理念是**通过声明式的数据绑定实现View的分离**。

Vue是渐进式的javascript框架。最核心的是声明式渲染，向外是组件系统，在此基础上加入前端路由和状态管理，最外层是构建系统。

#### 响应式系统的实现原理:

___

​	Vue2.x是利用Object.defineProperty()方法为对象，添加`get()`和`set()`来侦测对象的变化。获取对象属性值会调用`get()`方法，而修改对象属性值就是用`set()`

上述方法有一些固有的缺陷：

 	1. 性能较差
 	2. 在对象上新建属性是无法被侦测的
 	3. 改变数组的length属性是无法被侦测的

而Vue3.0使用ES6的proxy取代`Object.defineProperty()`方法，性能更优异。`Proxy`称为代理，是一种可以拦截并改变底层`javascript`引擎操作的包装器。

#### Vue.js 3.0带来的新变化(8个亮点)

___

1. 更好的性能
2. Tree-shaking 支持
3. 组合API(Composition API)
4. 碎片（Fragment）
5. 传送（Teleport）
6. 悬念（Suspense）
7. 更好的typescript支持
8. 自定义渲染API

## 准备开发和调试环境

____

## ECMAScript6 语法简介

____

#### let声明

无论是在函数作用域还是全局作用域中用`var`声明，都被当成在当前作用域顶部声明的变量，这被称为javascript的变量提升机制。但是我们引入`let`声明，而使得变量作用域限制在当前代码块中。

```js
function change(flag){
    if(flag){
        var color="red";
    }
    else {
        console.log(color);
        return null;
    }
}
```

```js
function change(flag){
    if (flag){
        let color="red";
    }
    else {
        console.log(color);
        return null;
    }
}
```

比较上面两份代码第一个就可以使得`color`被访问，而第二个却不能被访问。

甚至于我们存在:

```js
{
	let a = 1;
}
console.log(a);//这种情况下a难以被访问
```

同时用`let`在一块中只能被命名一次，多次会报错而这是`var` 难以做到的。同时`let`不能命名`var`已经命名过的变量。

#### const声明 

`const`声明对象，对象本身的绑定不能修改，但是对象的属性和值是可以更改的（这一点跟c语言不同）

```js
const person = {
    name : "zhangsan"
};
person.name=:"lisi";
person.age=20;
//上述两个都可运行
person={
    name:"wangwu"
};
//不能被修改，将会报错
```

#### 全局块作用域绑定

在全局作用域使用`var`声明的变量或对象，那么将作为浏览器环境中的`window`对象的属性，这意味着使用`var`很可能会覆盖一个已经存在的全局属性。

```js
var greeting="Welcome";
console.log(window.greeting);
console.log(window.Screen);
const Screen="liquid crystal";
let Screen="liquid crystal";//上述两种定义都不会发生改变
console.log(window.Screen);
```

#### 多行字符串

模板字面量的基础语法就是用反引号（`）来替换字符串单或双引号。如果想在字符串中使用反引号那么使用反斜杠（\）来转义即可，同时可以使用'+'来拼接字符串。如果需要换行那么使用\n来换行，而在ES6中可以直接在代码中换行即可。

```js
let message= `hello
world`;
console.log(message);
```

#### 字符串占位符

在一个模板字面量中可以用占位符`${}`来占位，中间可以包含变量或`javascript`表达式

```js
let amout=5;
let price=0.85;
let total=`The total price is ${amout*price}`;
console.log(total);
```

同时模板字面量也是`javascript`表达式，因此可以嵌套在另一个模板字面量中。

```js
let name = `lisi`;
let message =`hello,${`my name is ${name}`}.`;
console.log(message);
```

#### 默认参数

在ES5中，没有提供直接在函数的参数列表中指定参数默认值的语法，但在ES6中，简化了形参提供默认值的过程，可以直接在参数列表中为形参制定默认值。

```js
function makeRedirect(url="/home",timeout=2000){
	//函数其余部分
}
```

如果调用而为赋初值，那么就用默认值。**为一个具有默认值的参值传值null是合法的并且不会使用默认值**

#### rest 参数

js函数一个特别地方就是：无论在函数定义中声明了多少形参，都可以传入任意数量的参数，在代码中可以通过一个argument对象接入传入的参数：

```js
function calculate (op){
    if (op==='+') {
        let result =0;
        for (let i=1;i<arguments.length();i++){
            result +=arguments[i];
        }
        return result;
    }
    else if (op==='*'){
     	let result = 1;
        for (let i=1;i<arguments.length();i++){
            result*=arguments[i];
        }
        return result;
    }
}
```

但从函数声明的参数列表是看不出来的，其次，因为第一个参数是命名参数且已被使用，因此遍历arguments对象时，索引要从1开始而不是从0开始。**在ES6中我们引入了rest参数**，在函数命名前添加3个点，就表明这是一个rest函数。

```js
function calculate(op,...data){
    if (op==='+') {
        let result =0;
        for (let i=0;i<data.length();i++){
            result +=data[i];
        }
        return result;
    }
    else if (op==='*'){
        let result = 1;
        for (let i=0;i<data.length();i++){
            result*=data[i];
        }
        return result;
    }
}
```

rest函数包含的是op之后传入的所有参数，**但是每个函数最多只能声明一个rest函数，并且它只能位于他的最后一个参数。**

#### 展开运算符

语法上跟`rest`类似，也是3个点，它可以将一个数组转成各个独立的参数，同时也可用于取出对象的所有可遍历属性。

```js
function sum(a,b,c){
    return a+b+c;
}
let arr=[1,2,3];
sum(...arr);
```

我们还可以用它来辅助数组和合并数组:甚至可以取出对象属性；

```js
let arr1=[1,2,3];
let arr2=arr1;
let arr3=[...arr1];//arr1和arr2是一样，但是arr3确实新数组

let arr4=[`a`,`b`,`c`];
let arr5=[`d`,`e`];
let arr6=[...arr4,...arr5];

let book ={
	title: "vue.js从入门到入土",
	price: 98
};
let out={...book,desc:"a fine book"};
console.log(out);
```

#### 对象字面量语法扩展

方法简写语法：

```js
var car ={
    color : "red",
    doors : 4，
    showcolor(){
		console.log(this.color);
	}
}
car.showcolor();
```

#### 解构赋值

对象解构的语法形式是在一个赋值操作符的左边放置一个对象字面量：

```js
let book ={
	title:"Vue.js从入门到实战",
    isbn:"9787121362217",
    price:98;
}
let {title,isbn,price}=book;
//这样就可以直接解构出来，而如果前面已经定义了，那么需要用（包裹）：
let title,isbn,price;
({title,isbn,price}=book);
```

在使用过程中，如果指定的局部变量名称在对象中不存在，那么这个局部变量就被赋值成undefined，如果希望使用于对象属性名不同的局部变量名，可以采用：

```js
let book={
    title : "Vue.js从入门到入土",
    isbn:"9787121362217",
    price:98;
};
let {title:bookTitle,isbn:bookIsbn}=book;
```

如果嵌套进入了更深中：

```js
let book ={
		title : "Vue.js框架",
		isbn:"976322321",
    	category: {
            id :1,
            name:"web前端"
		 }
};
let {title,isbn,category:{name:my_category}}=book;
console.log(my_category);
```

数组结构用`[]`来表示：

```js
let arr1=[1,2,3];
let [a,b,c]=arr1;
console.log(a);
console.log(b);
let [,,c]=arr1;//这样就可以只获取第三个元素
var a,b,c;
[a,b,c]=arr1;//不同于对象，这里可以直接赋值
let categories=["c/c++",["Vue","React"],"java"];
let [language1,[,language2]]=categories;
```

#### 箭头函数

一般语法：

```js
let welcome=msg=>msg;
//等价于
function weolcome(msg){
	return msg;
}

let welcome(user,msg)=>`${user},${msg}`;
//等价于
function welcome(user,msg){
    return user+','+msg;
}
let add=(a,b)=>{
    let c=a+b;
    return c;
}
let emptyFunction=() => {};
let createCar=(colors,doors) => ({color:color,doors:doors});
```

js中this是一个神奇的东西，其并不是指向对象自身，其指向是可以改变的，根据当前执行上下文的变化而变化。所以为了解决this的指向问题，可以使用函数对象的`bind（）`方法，将this明确绑定到某个对象上。

```js
		var greeting='Welcome';
		function sayHello(user) {
			alert(this.greeting+","+user);
		}
		var obj={
			greeting:"Hello",
			sayHello:sayHello
		}
		var sayHi=obj.sayHello.bind(obj);
		sayHi("wangwu");
		var obj={
			greeting:"Hello",
			sayHello:function(){
				setTimeout((function(){
					alert(this.greeting);
					
				}).bind(this),2000);
			}
		}
		obj.sayHello();
```

#### Symbol

ES6引入了symbol的新的数据类型，表示独一无二的值。

创建symbol时，js使用`symbol（）`来创建的，这个函数动态的生成了一个匿名的唯一的值。

```js
let sn1=Symbol();
console.log(typeof(sn1));
console.log(sn1);
let sn2=Symbol();
if (sn1===sn2) console.log("Hello");
else console.log("False");
```

需要注意的是，Symbol是原始值,不能使用`new symbol()`创建`symbol`值，这会导致程序抛出错误。每个`Symbol()`实例都是唯一且不可改变的。一般情况下Symbol不能参与运算和转换，但是可以参与逻辑运算。

```js
let sn1=Symbol();
console.log(Boolean(sn1));//True
console.log(!sn1);//False
if (sn1) console.log("True");//True
```

Symbol类型一般合理的用法就是用Symbol作为对象的属性名，可以保证属性不重名。

```js
let sn=Symbol("sn");
let obj={};
obj[sn]='1111-111';
console.log(obj);
```

需要注意的是：**Symbol作为对象属性名时，不能使用(.)运算符，而是要用方括号[ ]**

共享的Symbol：

ES6提供了一个可以随时访问的全局Symbol注册表，当调用`Symbol.for()`方法时，它首先在全局Symbol注册表中搜索以参数作为名称的Symbol值，如果找到了，则直接返回到已有的Symbol；如果没有找到，则创建一个新的Symbol，以参数作为Key，注册到全局Symbol注册表中，然后返回新的Symbol。

```js
let sn1=Symbol.for("sn");
let sn2=Symbol.for("sn");
let sn3=Symbol("sn");
console.log(sn1==sn2);
console.log(sn2==sn3);
console.log(sn1,sn2,sn3);
//true
//false
//Symbol(sn) Symbol(sn) Symbol(sn)
```

调用`symbol.for()`和`symbol()`方法都可以创建一个新的Symbol对象，**但是二者并不相通**，各是各的，并且`Symbol.for()`调用后得到的如果没有就会存进去，与`symbol()`以什么样的参数建设的无关。`Symbol()`每次建设都会创建一个新的Symbol而不会实现共享。

#### 类

ES6引入了类的概念

```js
		class Car {
			constructor(scolors,idoors){
				this.color=scolors;
				this.doors=idoors;
			}
			showcolor(){
				console.log(this.color);
			}
		}
		let oCar= new Car("red",4);
		oCar.showcolor();
```

在类声明语法中，使用特殊的constructor方法定义构造函数，不需要添加`function`关键字。自有属性是对象实例中的属性，不会出现在原型上。并且只能在类的构造函数中（即`constructor`方法）或方法中构建。

访问器属性：

```js
		class Car{
			constructor(sName,iDoors){
				this._name=sName;
				this.doors=iDoors;
			}
			get decs(){
				return '${this.name} is worth having.';
			}
			get __name(){
				return '${this.name}';
			}
			get name(){
				return this._name;
			}
			set name(value){
				this._name=value;
			}
		}
		let car = new Car("Benz",4);
		console.log(car._name);
		console.log(car.name);
		car.name="Ferrari";
		console.log(car.name);
```

如果需要可读属性，那么就只有`get（）`即可，如果只需要修改，那么就只有`set()`属性即可。

#### 模块

可以用`export`关键字将一部分己发布的代码暴露给其他模块，在最简单的用例中，可以将`export`放在任何变量、函数或类声明的前面，以将它们从模块导出

```js
// 导出数据
export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;// 导出函数
export function sum(num1, num2) {
  return num1 + num1;
}
// 导出类
export class Rectangle {
  constructor(length, width) {        
    this.length = length;this.width = width;
  }
}
// 此函数为模块私有
function subtract(num1, num2) {
  return num1 - num2;
}
// 定义一个函数……
function multiply(num1, num2) {
  return num1 * num2;
}
// ……稍后将其导出
export { multiply };
```

从模块中导出的功能可以通过`import`关键字在另一个模块中访问，`import`语句的两个部分分别是要导入的标识符和标识符应当从哪个模块导入

基本模板：

```js
import { identifier1, identifier2 } from "./example.js";
```

`import`后面的大括号表示从给定模块导入的绑定`(binding)`，关键字`from`表示从哪个模块导入给定的绑定，该模块由表示模块路径的字符串指定(被称作模块说明符)。浏览器使用的路径格式与传给`<script>`元素的相同，也就是说，必须把文件扩展名也加上。另一方面，`Nodejs`则遵循基于文件系统前缀区分本地文件和包的惯例。例如，`example`是一个包而`./example.js`是一个本地文件.

#### Promise(异步编程解决方案)

基本用法：

一个`promise`可以通过`Promise`构造函数创建，只接受一个参数：包含初始化`Promise`代码的执行器。执行器函数接受两个参数，分别是`resolve()`函数和`reject()`函数，这两个函数由`js`提供。异步成功则调用`resolve()`函数，异步失败则调用`reject()`函数。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

## Vue.js模板语法

Vue 3.0引入`createApp()`是为了解决Vue 2.x全局配置带来的一些问题。`creatApp()`是全局API，在组件选项中，它接受一个根组件选项对象作为参数。

```js
		const App={
			data(){
				return {
					message:"Hello Vue js!",
					url:"www.baidu.com" 
				}
			}
		};
		const app=Vue.createApp(App);
		const vm=app.mount("#test");
		console.log(vm.$data.message);
```

#### 插值

数据绑定最常见的形式就是使用`Mustache`语法（双花括号）的文本插值。

```html
<p>{{message}}</p>
```

`Mustache`标签会被替换为来自组件实例的`message`属性的值。只要绑定的数据对象中的`message`属性发生了变化，插值内容就会被更新。

如果绑定的数据中包含了`HTML`代码，那么使用`Mustache`语法把HTML代码以普通文本方式进行输出。如果要输出真正的HTML代码，那么就需要使用`v-bind`指令。`Mustache`语法不能作用域HTML元素的属性上，要解决这类问题就需要使用`v-bind`指令。

对于所有的数据绑定，Vue.js还提供了安全的`javascript`表达式作为支持

```html
<p>{{message.toUpperCase()}}</p>
```

**需要注意的是，每个绑定都只能包含单个表达式**,**同时，`if`语句将不会生效，可以使用三元表达式进行操作**

#### 指令

`v-if`指令可以根据表达式`show`的值的真假来决定是否插入还是删除`<p>`元素

```html
<p v-if="show">你能看到我吗</p>
```

此外，一些指令还可以带有参数，在指令名称后以冒号表示，如`v-bind`和`v-on` 指令

```html
<a v-bind:href="url"> 新浪网</a>
<button v-on:click()="sayGreet">Greet</button>
```

`v-bind`指令用于响应式的更新`HTML`属性，而`v-on`指令用于监听`DOM`事件。

可用`:` 来简化表示`v-bind` 用`@`来简化表示`v-on`

同时指令的参数可以是动态参数。**但是注意不要是复杂的表达式即可**。

`v-for`就是通过循环的方式来渲染一个列表，循环的对象可以是数组，同样也可以是一个`javascript`对象。

```js
<li v-for="item in items">{{item.message}}</li>
```

数组中存在一些非变异方法 `filter(),concat(),slice()`它们不会改变原来的数组，并且总是返回一个新数组。Vue在检测到数组变化时，并不是直接重新渲染整个列表，而是最大化的复用`DOM`元素。我们可以用计算属性来返回过滤后或者排序后的数组。

```js
data () {
      return {
        numbers:[1,2,3,4,5],
        
      }
    },
    computed:{
      evennumbers(){
        return this.numbers.filter(function (number){
          return number %2 === 0
        })
      }
    }
```

