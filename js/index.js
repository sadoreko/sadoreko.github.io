// 注意组件的名称里不能用大写字母, vue会把大写字母转成小写的用, 结果就匹配不到组件
Vue.component('linkandtitle', {
  props: ['article'],
  template: `
  <div class="panel panel-default">
    <div class="panel-heading">
      <p class="panel-title">{{ article.date }}</p>
    </div>
    <div class="panel-body">
      <a :href="article.path" class="articleLink">{{  article.title }}</a>
    </div>
  </div>`
})
// 未添加class的结构
// '<ul><li>{{ article.date }}</li><li><a :href="article.path">{{  article.title }}</a></li></ul>'

var addArticles = new Vue({
  el: '#articleAndLink',
  data () {
    return {
      articleList: [
        {id: 0, date: '2019.6', path: './posts/gitNote.md', title: 'gitNote'},
        {id: 1, date: '2019.7', path: './posts/JavaScript%E6%9D%82%E8%AE%B0.md', title: 'JavaScript杂记'},
        {id: 2, date: '2019.8', path: './posts/正则RegExp对象的实例方法.html', title: '正则RegExp对象的实例方法'},
        {id: 3, date: '2019.8', path: './posts/正则表达式之用户注册练习.html', title: '正则表达式之用户注册练习'},
        {id: 4, date: '2019.9', path: 'https://sadoreko.github.io/singlePages/index.html', title: '丹特丽安的书架'},
        {id: 5, date: '2019.9', path: './posts/列表渲染v-for与key.md', title: '列表渲染v-for与key'},
      ]
    }
  }
});