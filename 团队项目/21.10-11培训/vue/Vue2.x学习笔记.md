## Vue2.x学习笔记

#### 一、条件与循环

```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```

```js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

如果在控制太输入app3.seen=false ，那么app3便不再显示

甚至可以使用v-for 在绑定数组的数据来渲染一个项目的列表

```html
<div id="app-4">
    <ol>
      <li v-for="todo in todos">
        {{todo.text}}
      </li>
    </ol>
</div>
```

```javascript
  var app4=new Vue({
    el : '#app-4',
    data:{
      todos :[
        {text :'学习 javascript'},
        {text :'学习 Vue'},
        {text :'整个项目'}
      ]
    }
  })
```

#### 二、处理用户输入

为了让用户跟你应用进行交互，使用`v-on` 指令来添加一个事件监听器，通过它来调用在Vue实例中定义的方法；

```html
<div id="app-5">
    <p>{{message}}</p>
    <button v-on:click='reverseMessage'>反转信息</button>
</div>


```

```js
 var app5=new Vue({
    el : '#app-5',
    data:{
      message:'Hello Vue.js!'
    },
    methods: {
      reverseMessage :function(){
        this.message=this.message.split('').reverse().join('')
      }
    }
  })
```

Vue提供了`v-model`指令来实现表单输入和应用状态之间的双向绑定

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

#### 组件化应用构建

几乎任意类型的应用界面都可以抽象为一个组件树： ![Component Tree](https://cn.vuejs.org/images/components.png)

在Vue中，一个组件本质上是一个拥有预定义选项的一个Vue实例，在Vue中注册组件十分简单。

```js
Vue.component('todo-item',{
    template:'<li>这是一个待办项</li>'
})
var app = new Vue({
    
})
```

但是上述操作并不炫酷，因为每个需要待办项组件都需要渲染成同样的文本。我们设想是不是可以从副作用域将数据传到子组件才对，让我们考虑修改一下组件的定义

```js
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义 attribute。
  // 这个 prop 名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

现在，我们可以使用`v-bind` 指令将待办项传到循环输出的每个组件中：

```js
Vue.component('todo-item',{
		props:['todo'],
		template:'<li>{{todo.text}}</li>'
	})
	var app7= new Vue({
		el : '.app-7',
		data: {
			grocerylist:[
				{id:0,text:'蔬菜'},
				{id:1,text:'奶酪'},
				{id:2,text:'随便什么人能吃的'}
			]
		}
	})
```

```html
<div class="app-7">
	<ol>
     <!--
      现在我们为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    	<todo-item
			v-for="item in grocerylist" 
			v-bind:todo='item'
			v-bind:key='item.id'
		></todo-item>
	</ol>
</div>
```

我们已经设法将应用分割成两个更小的单元，子单元通过.prop接口与父单元尽心过了良好的解耦。我们现在可以进一步改进`<todo-item>`  组件，提供更为复杂的模板和逻辑，而不会影响到父单元。



我们甚至可以达到理想组件的例子：

```html
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

#### Vue实例

每个Vue应用都是通过用`Vue`函数来创建一个新的**Vue实例**开始的：

```js
var vm = new Vue({
  // 选项
})
```

`vm`（ViewModel的缩写）这个变量名表示Vue实例。

所有的Vue组件都是Vue实例，并且接受相同的选项对象（一些跟实例所特有的选项除外）

##### 数据与方法

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。 

```js
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2

// ……反之亦然
data.a = 3
vm.a // => 3
```

当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时就已经存在于 `data` 中的 property 才是**响应式**的。也就是说如果你添加一个新的 property，比如： 

```js
vm.b = 'hi'
```

这样的话对`b`的改动将不会出发任何视图的更新。**如果你知道你会在晚些时候需要一个 property，但是一开始它为空或不存在，那么你仅需要设置一些初始值。 **

```js
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```

但是对于要是使用`object.freeze()`，这样将会阻止修改人和现有的proerty，也以为这响应系统无法再追踪变化。

```js
var obj = {
  foo: 'bar'
}

Object.freeze(obj)
```

除了数据 property，Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 `$`，以便与用户定义的 property 区分开来。例如 :

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true
```

##### 实例生命周期

![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)

#### 模板语法

##### 插值

---

##### 文本

数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值： 

```html
<span>Message: {{ msg }}</span>
```

通过使用 `v-once指令`你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。**但请留心这会影响到该节点上的其它数据绑定**： 

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

##### 原始HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html` ： 

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

##### Attribute

Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 [`v-bind` 指令](https://cn.vuejs.org/v2/api/#v-bind)： 

```html
<div v-bind:id="dynamicId"></div>
```

##### 使用js的表达式

迄今为止，在我们的模板中，我们一直都只绑定简单的 property 键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。 

##### 缩写

___

##### `v-bind`缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```

##### `v-on`缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

它们看起来可能与普通的 HTML 略有不同，但 `:` 与 `@` 对于 attribute 名来说都是合法字符，在所有支持 Vue 的浏览器都能被正确地解析。而且，它们不会出现在最终渲染的标记中。缩写语法是完全可选的，但随着你更深入地了解它们的作用，你会庆幸拥有它们。 

##### 计算属性

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

我们可以像绑定普通的property一样绑定计算属性。我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。 

##### 计算属性的setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter： 

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。 

#### Class与Style绑定

___

##### 绑定HTML Class

对象语法：

我们可以传给 `v-bind:class` 一个对象，以动态地切换 class：

```php+HTML
<div v-bind:class="{ active: isActive }"></div>
```

我们可以传给`active`这个class存在与否将取决于数据property`isactive`的truthiness。

你可以在对象中传入更多字段来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class attribute 共存。当有如下模板： 

```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

和如下data:

```js
data: {
  isActive: true,
  hasError: false
}
```

结果渲染为： 

```html
<div class="static active"></div>
```

当 `isActive` 或者 `hasError` 变化时，class 列表将相应地更新。例如，如果 `hasError` 的值为 `true`，class 列表将变为 `"static active text-danger"`。 

绑定的数据对象不必内联定义在模板里： 

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的[计算属性](https://cn.vuejs.org/v2/guide/computed.html)。这是一个常用且强大的模式： 

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

##### 数组语法

我们可以把一个数组传给`v-bind:class`,以应用一个class列表

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```html
<div class="active text-danger"></div>
```

