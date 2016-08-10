calendar组件
======
###calendar组件简介：支持IE7以上及firefox，chrome浏览器
###calendar功能介绍： 1丶提供一个可选日历窗口，便于选择日期
###效果展示见： https://lidingkorol.github.io/calendar/
###插件使用操作如下：
--------
####一丶首先将index.js添加至html页面中
~~~
    <script src="js/index.js"></script>
~~~
####二丶然后在html页面中添加如下模块
~~~
<div id="123" style="position: relative;">
  <input type="text" value="选择日期" id="datebox" >
</div>
~~~
#####1丶上述图中div标签可任意设置
#####2丶style="position:relative"是用于保证calendar日历窗口能以DIV为父级标签定位
#####3丶input标签id请按上图名称设置
####三丶最后在html页面设置相关参数
~~~
<script>
	window.onload=function(){
	var date=new jsdate(
	{
		name:'123'
	})
}
</script>
~~~
#####1丶上图name值为容纳input标签的父级标签id
####四丶参数设置见index.js
![](https://github.com/lidingkorol/calendar-/raw/master/photo/QQ图片20160802192652.png)

#以上是readme所有内容
