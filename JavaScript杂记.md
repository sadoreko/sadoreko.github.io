### 内层函数调用
```javascript
function count(){
    var num = 1;
    return function(){
        return num++;
    }
}

document.write(count()() +'<br>');
document.write(count()() +'<br>');
document.write(count()() +'<br>');
var fn = count();
document.write(fn() +'<br>');
document.write(fn() +'<br>');
document.write(fn() +'<br>');

// output 1,1,1,1,2,3
```

1、 count()()这样调用，每次都会创建一个新的局部作用域，num的值会不断地被初始化为1

2、 return num++表示先返回num的值，再将num加1

3、 先将count()赋给fn，此时count()只调用了一次，接下来多次调用fn()的时候，count函数并没有多次调用，num只会在count函数调用的时候被初始化，所以多次调用fn()的时候num不会被多次初始化；由于fn相当于count函数的内层函数（var fn=count();这行代码执行后，就调用了count()，调用count后就将里面的函数赋值给了fn，所以说fn就相当于函数的内层函数了。），可以访问count中的变量num，所以多次调用fn函数，会将num的值累加；

自己的理解:

var fn = count();  是把count()的运行结果赋值给fn,

那么fn拿到的就是
```javascript
function(){
	return num++;
}
即:
fn = function(){
	return num++;
}
```

当调用fn()时, 就执行了一次num++



### 原生js添加类名



有很多js库中封装了添加类名的方法，典型的比如jquery中的**addClass()**方法

js自己有哪些可以设置class的方法。主要有三种:  
**el.setAttribute('class','classX')**  ie7及ie7以下版本不支持  
**el.setAtrribute('className','classX')** 不兼容ie7+ /Firefox/Safari/Chrome/Opera, 兼容ie7及ie7以下版本  
**el.className='classX'** 所有浏览器都支持

另: Element.classList 是一个只读属性，返回一个元素的类属性的实时DOMTokenList 集合。详见 [MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)  
`let elementClasses = elementNodeReference.classList;`  

`add( String [, String] )`  
添加指定的类值。如果这些类已经存在于元素的属性中，那么它们将被忽略。

`remove( String [,String] )`  
删除指定的类值。

`item ( Number )`  
按集合中的索引返回类值。

`toggle ( String [, force] )`  
当只有一个参数时：切换 class value; 即如果类存在，则删除它并返回false，如果不存在，则添加它并返回true。  
当存在第二个参数时：如果第二个参数的计算结果为true，则添加指定的类值，如果计算结果为false，则删除它

`contains( String )`  
检查元素的类属性中是否存在指定的类值。  

`replace( oldClass, newClass )`  
用一个新类替换已有类。

