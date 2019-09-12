# 列表渲染报错了 Elements in iteration expect to have 'v-bind:key' directives.'   

在学习vue.js时, 写了下面这段代码, `<li v-for="item in items">`处始终标红, 提示Elements in iteration expect to have 'v-bind:key' directives.

```vue
<template>
  <div>
    <div>列表渲染</div>
    <p>------------------</p>
    <ul id="example-1">
      <li v-for="item in items">
        {{ item.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {message: 'John'},
        {message: 'Jane'}
      ]
    }
  }
}
</script>
```


### 搜索到的解决方案  

1. 在 v-for 后添加 v-bind:key="item.id"

2. 这是ESLint的功能，对vue进行了eslint检查。就把eslint对该插件的检查关闭，
  更改vetur配置            vscode->首选项->设置->搜索（vetur）

  把  `"vetur.validation.template": true`  改成  `false` 



这里选择第一种方法, 因为第二种方法相当于“看不到问题, 问题就不存在了”, 并没有解决问题.



### 那么, 为什么要给 v-for 加一个 v-bind:key ?


stack overflow 上有若干讨论, 这里贴一个上来, 我简单翻译了下: 

```
<li v-for="post in posts" v-bind:key="post.id">

<!-- OR USE SHORTCUT NOTATION -->
<li v-for="post in posts" :key="post.id">
```

The reason has to do with performance. Attribute `key` helps Vue determine unique items in a list. Consider the example of sorting. If your UI has a sort button for posts, then your the order of items in `post` array will change. But does that mean Vue is going to re-render entire list? Of course not! Using `:key` it can determine if the item was already rendered on UI. It simply shuffles the DOM nodes and saves expensive rendering cycles.

答: 是为了性能. `key` 能帮助Vue把数组中的每个项变得独一无二.   

例如排序,  你的UI有个给帖子排序的按钮, 点击按钮会改变数组`post`里各项的顺序.   

有了key以后, Vue不需要把整个list重新渲染一遍, 根据key就能判断某个item是否已经渲染了,   
只需要处理未渲染的item就可以了.  


Secondly, if you have complex components within your list when you are using `v-for` and `:key` is not provided, then whenever the list is changed or re-ordered, it simply changes the DOM but doesn't destroy existing components and that can cause local state mismatch. That is why it is must to have `:key` attribute.

如果列表里有复杂的组件, 使用了 `v-for` 但没设置 `:key` , 当列表项改变或重新渲染列表时, 仅更改了DOM但不会销毁现有组件, 可能导致本地状态不匹配.  

Note: Also remember that using `v-for` `index` for `:key` is a bad idea as it is not unique across your collection.  

注意: 用 `index`  作为key是不可取的, 因为 `index` 和列表项不是一一对应的, 不具有独特性  



可以看下 Vue.js 官网的[列表渲染-维护状态](https://cn.vuejs.org/v2/guide/list.html#%E7%BB%B4%E6%8A%A4%E7%8A%B6%E6%80%81) 一节.  



我的理解: 相对于把数组变成了一个类对象, 让数组成为 key-value 的形式, 而且这个key是不重复的, 好比数据库里的 primary key.  



> :key相当于是索引的作用，提高循环性能.  

> `key` 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
>
> 有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

