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
