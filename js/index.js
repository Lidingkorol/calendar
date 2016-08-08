/*网页calendar组件
 * calendar是基于JS的一个日历显示组件，支持包括IE7以上，FileFox,Chrome常用浏览器
 * 具体使用方式见readme
 * 传入参数介绍
 * name		容纳input框的标签id
*/

//定义工具函数
var Class = {
    create: function () {
        return function () {
            this.init.apply(this,arguments); //这个语句的作用是，每次插件初始化的时候，都会运行一次插件原型链上面的init方法
        }
    }
}

var Extend = function(destination, source) 
{
	for (var property in source) {
		destination[property] = source[property];
	}
}
//后面一个属性对象方法传给前一个
var SetStyles=function(dom,rules)
{
	for(var rule in rules)
	{
		dom.style[rule]=rules[rule];
	}
}


var jsdate=Class.create();
jsdate.prototype={
	init:function(options){
		this.SetOption(options);
		this.name=this.options.name;
		this.Set();
		this.SetTable();
		this.setStyles();
		this.SetData();
		this.ClickYright();
		this.ClickYleft();
		this.ClickMright();
		this.ClickMleft();
		this.ShowWindow();
		this.ChooseDate();
		this.ChooseYear();
		this.ChooseMonth();
	},
	//初始化   
	SetOption:function(options){
		this.options={
			name:null
			
			
		};
		Extend(this.options, options || {}); //空对象指防止options不存在时候函数报错
	},
	//创建日历插件框架及样式
	Set:function(){
		this.CalendarBox=document.createElement('div');
		this.TableBox=document.createElement('table');
		this.HeaderBox=document.createElement('div');
		this.TableBox.tbody=document.createElement('tbody');
		this.Mright=document.createElement('span');
		this.Mleft=document.createElement('span');
		this.Show=document.createElement('div');
		this.Yright=document.createElement('span');
		this.Yleft=document.createElement('span');
		this.DateBox=document.getElementById('datebox');
		this.ChooseMonthBoxUl=document.createElement('ul');
		this.ChooseYearBoxUl=document.createElement('ul');
		this.YearBox=document.createElement('span');
		this.MonthBox=document.createElement('span');
		this.ChooseMonthBox=document.createElement('div');
		this.ChooseYearBox=document.createElement('div');
		this.Mright.id='mright';
		this.Mleft.id='mleft';
		this.Show.id='showwindow';
		this.Yright.id='yright';
		this.Yleft.id='yleft';
		this.TableBox.id='tablebox';
		this.CalendarBox.id='calendar';
		this.HeaderBox.id='header';
		this.TableBox.tbody.id='tb';
		this.Mright.innerHTML='&gt';
		this.Yright.innerHTML='&gt&gt';
		this.Mleft.innerHTML='&lt';
		this.Yleft.innerHTML='&lt&lt';
		this.ChooseMonthBoxUl.id='CMBul';
		this.ChooseYearBoxUl.id='CYBul';
		this.YearBox.id='YB';
		this.MonthBox.id='MB';
		this.ChooseMonthBox.id='CMB';
		this.ChooseYearBox.id='CYB';
		document.getElementById(this.name).appendChild(this.CalendarBox);
		this.TableBox.appendChild(this.TableBox.tbody);
		this.CalendarBox.appendChild(this.HeaderBox);
		this.CalendarBox.appendChild(this.TableBox);
		this.CalendarBox.appendChild(this.ChooseYearBox);
		this.CalendarBox.appendChild(this.ChooseMonthBox);
    	this.HeaderBox.appendChild(this.Yleft);
		this.HeaderBox.appendChild(this.Mleft);
		this.HeaderBox.appendChild(this.Show);
		this.HeaderBox.appendChild(this.Mright);
		this.HeaderBox.appendChild(this.Yright);
		this.ChooseMonthBox.appendChild(this.ChooseMonthBoxUl);
		this.ChooseYearBox.appendChild(this.ChooseYearBoxUl);
		this.Show.appendChild(this.YearBox);
		this.Show.appendChild(this.MonthBox);
		this.ok=true;
	},
	setStyles:function(){
		SetStyles(this.CalendarBox,{
			width:'200px',
			height:'318px',
			border:'1px solid #9F0',
			position:'absolute',
			background:'#CCC',
			top:'30px',
			margin:'0 auto',
			padding:'0',
			zIndex:'1000',
			display:'none'
		});
		SetStyles(this.TableBox,{
			border:'1px solid #000000',
			background:'#0FF',
			width:'180px',
			height:'268px',
			margin:'0 auto',
			padding:'0'
		});	
		SetStyles(this.HeaderBox,{
			width:'180px',
			height:'30px',
			margin:'10px auto 0',
			padding:'0',
			border:'1px solid #9F0',
			display:'block',
			cursor:'pointer'
		});
		SetStyles(this.Mright,{
			width:'25px',
			height:'inherit',
			margin:'0',
			background:'red',
			display:'block',
			float:'left',
			cursor:'pointer',
			textAlign:'center',
			fontSize:'20px',
			lineHeight:'32px'
		});
		SetStyles(this.Mleft,{
			width:'25px',
			height:'inherit',
			margin:'0',
			background:'red',
			display:'block',
			float:'left',
			cursor:'pointer',
			textAlign:'center',
			fontSize:'20px',
			lineHeight:'32px'
		});
		SetStyles(this.Yleft,{
			width:'25px',
			height:'inherit',
			margin:'0',
			background:'yellow',
			display:'block',
			float:'left',
			cursor:'pointer',
			textAlign:'center',
			fontSize:'20px',
			lineHeight:'32px'
		});
		SetStyles(this.Yright,{
			width:'25px',
			height:'inherit',
			margin:'0',
			background:'yellow',
			display:'block',
			float:'left',
			cursor:'pointer',
			textAlign:'center',
			fontSize:'20px',
			lineHeight:'32px'
		});
		SetStyles(this.Show,{
			width:'80px',
			height:'inherit',
			margin:'0',
			background:'pink',
			display:'block',
			float:'left'
		});
		SetStyles(this.YearBox,{
			width:'48px',
			height:'inherit',
			margin:'0',
			background:'pink',
			lineHeight:'32px',
			display:'block',
			float:'left',
			textAlign:'center'
		});
		SetStyles(this.ChooseYearBox,{
			width:'48px',
			height:'180px',
			margin:'0',
			background:'white',
			display:'none',
			position:'absolute',
			left:'59px',
			top:'40px',
			border:'1px solid gray'
		});
		SetStyles(this.ChooseMonthBox,{
			width:'32px',
			height:'212px',
			margin:'0',
			background:'white',
			display:'none',
			position:'absolute',
			left:'107px',
			top:'40px',
			border:'1px solid gray'
		});
		SetStyles(this.MonthBox,{
			width:'32px',
			height:'inherit',
			margin:'0',
			background:'pink',
			display:'block',
			textAlign:'center',
			lineHeight:'32px',
			float:'left'
		});
		SetStyles(this.ChooseYearBoxUl,{
			margin:'0 0 0 0',
			padding:'0',
	            	height:'180px',
	        	textAlign:'center',
	        	listStyle:'none'
		});
		SetStyles(this.ChooseMonthBoxUl,{
			margin:'0 0 0 0',
			padding:'0',
		        height:'180px',
		        textAlign:'center',
		        listStyle:'none'
		});	
	},
	//生成日历表格框架
	SetTable:function(){
		//生成7*7表格
		for(var i = 0; i < 7; i++){
		        var atr = this.TableBox.tbody.insertRow(this.TableBox.tbody.rows.length);
		        for(var j = 0; j < 7; j++){
		            	var atd = atr.insertCell(atr.cells.length);
			}
        	}
		var table_tr=document.getElementById('tablebox').getElementsByTagName('tr');
	        //设置第一行内容
	        var td1=table_tr[0].getElementsByTagName('td');
	        var week=['Su','Mo','Tu','We','Th','Fr','Sa'];
	        for(k=0;k<7;k++)
	        {
	        	td1[k].innerHTML=week[k];
	        }
	        //设置下拉年份框
	        for(var l=0;l<10;l++)
	        	{   
	        		var ali=document.createElement('li');
	  			document.getElementById(this.ChooseYearBoxUl.id).appendChild(ali)[l];
	        	}
	        document.getElementById(this.ChooseYearBoxUl.id).getElementsByTagName('li')[0].innerHTML='up';
	        document.getElementById(this.ChooseYearBoxUl.id).getElementsByTagName('li')[9].innerHTML='down';
	        //设置下拉月份框
	        for(var m=0;m<12;m++)
	        	{   
	        		var mli=document.createElement('li');
	  			document.getElementById(this.ChooseMonthBoxUl.id).appendChild(mli)[m];
	        	}
	},
	//生成日历
	SetData:function(){
		//设置月
        function is_leap(year) {
        	return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
        }
		m_days=new Array(31,28+is_leap(this.ynow),31,30,31,30,31,31,30,31,30,31);
		//第一次载入日历
		this.date=new Date();
		if(this.ok)
		{
			this.ynow=this.date.getFullYear();
			this.mnow=this.date.getMonth();
			this.dnow=this.date.getDate();
			this.ok=false;
		}
		this.m1std=new Date(this.ynow,this.mnow,1);
		this.day1st=this.m1std.getDay();
		//每次改变前重置表格内容
		for(var m1=1;m1<7;m1++)
		{
			for(var n1=0;n1<7;n1++)
			{
				this.TableBox.rows[m1].cells[n1].innerHTML='';
			}	
		}
		//显示改变后相应版面日历
		var m=1,n=0,l=1,p=this.day1st;
		while(p<7)
		{
			this.TableBox.rows[m].cells[p].innerHTML=l;
			p++;
			l++;
		}
		for(m=2;m<7;m++)
		{   
			for(n=0;n<7;n++)
		    	{    
		    		this.TableBox.rows[m].cells[n].innerHTML=l;
		    		l++;
		    		if(l>m_days[this.mnow])
				{
			    		return;
			    	}
			    
		    	 }
		}
	},
	//减年份
	ClickYright:function(){
		var that=this;
		document.getElementById(this.Yright.id).onclick=function(){
			that.ynow++;
			that.SetData();
			that.ShowWindow();
		}	
	},
	//加年份
	ClickYleft:function(){
		var that=this;
		document.getElementById(this.Yleft.id).onclick=function(){
			that.ynow--;
			that.SetData();
			that.ShowWindow();
		}
	},
	//减月份
	ClickMright:function(){
		var that=this;
		document.getElementById(this.Mright.id).onclick=function(){
			that.mnow++;
			if(that.mnow>11)
			{
				that.mnow=0;
				that.ynow++;
			}
			that.SetData();
			that.ShowWindow();
		}		
	},
	//加月份
	ClickMleft:function(){
		var that=this;
		document.getElementById(this.Mleft.id).onclick=function(){
			that.mnow--;
			if(that.mnow<0)
			{
				that.mnow=11;
				that.ynow--;
			}
			that.SetData();
			that.ShowWindow();
		}		
	},
	//表头当前年月
	ShowWindow:function(){
		document.getElementById(this.YearBox.id).innerHTML=this.ynow+'年';
		document.getElementById(this.MonthBox.id).innerHTML=(this.mnow+1)+'月';	
	},
	//取出选定日期至input框
	ChooseDate:function(){
		var that=this;
		document.getElementById('datebox').onclick=function(){
		document.getElementById(that.CalendarBox.id).style.display='block';
		}
		for(var i=1;i<7;i++)
		{
			for(var j=0;j<7;j++)
			{
				this.TableBox.rows[i].cells[j].onclick=function(){
				if(this.innerHTML)
					{
						document.getElementById('datebox').value=that.ynow+'年'+(that.mnow+1)+'月'+this.innerHTML+'日';
					    document.getElementById(that.CalendarBox.id).style.display='none';
					}
				}	
			}
		}
    },
    //下拉框选择年份
    ChooseYear:function(){
    	var that=this;
    	var itarget=this.ynow;
    	document.getElementById(this.YearBox.id).onclick=function(){
    		itarget=that.ynow;
    		document.getElementById(that.ChooseYearBox.id).style.display='block';
    		if(document.getElementById(that.ChooseMonthBox.id).style.display=='block')
    			{
    				document.getElementById(that.ChooseMonthBox.id).style.display='none';
    			}
			for(var i=1;i<9;i++)
			{
				document.getElementById(that.ChooseYearBoxUl.id).getElementsByTagName('li')[i].innerHTML=itarget;
    			itarget++;
			}
		}
		for(l=0;l<10;l++)
			{
				(function(k){
					var k=l;
					document.getElementById(that.ChooseYearBoxUl.id).getElementsByTagName('li')[l].onclick=function(){
						if(k==0)
						{
							itarget=itarget-16;
							for(var j=1;j<9;j++)
							{
								document.getElementById(that.ChooseYearBoxUl.id).getElementsByTagName('li')[j].innerHTML=itarget;
				    			itarget++;
							}
							return;
						}
						else if(k==9)
						{
							for(var m=1;m<9;m++)
							{
								document.getElementById(that.ChooseYearBoxUl.id).getElementsByTagName('li')[m].innerHTML=itarget;
				    			itarget++;
							}
							return;
						}
						else
						{
							that.ynow=document.getElementById(that.ChooseYearBoxUl.id).getElementsByTagName('li')[k].innerHTML;
				    			itarget=that.ynow;
				    			document.getElementById(that.ChooseYearBox.id).style.display='none';
				    			that.ShowWindow();
				    			that.SetData();	
						}
					}
				})(l);
			}
	
    },
   	// 下拉框选择月份
    ChooseMonth:function(){
    	var that=this;
    	var itarget=1;
    	document.getElementById(this.MonthBox.id).onclick=function(){
    		document.getElementById(that.ChooseMonthBox.id).style.display='block';
    		if(document.getElementById(that.ChooseYearBox.id).style.display=='block')
    			{
    				document.getElementById(that.ChooseYearBox.id).style.display='none';
    			}
    		for(l=0;l<12;l++)
    		{
    			document.getElementById(that.ChooseMonthBoxUl.id).getElementsByTagName('li')[l].innerHTML=itarget;
    			itarget++;
    		}
    		itarget=1;
    	}
    	for(k=0;k<12;k++)
    	{
    		(function(m){
    			var m=k;
    			document.getElementById(that.ChooseMonthBoxUl.id).getElementsByTagName('li')[k].onclick=function(){
    				that.mnow=document.getElementById(that.ChooseMonthBoxUl.id).getElementsByTagName('li')[m].innerHTML-1;
    				document.getElementById(that.ChooseMonthBox.id).style.display='none';
			    	that.mnow=parseInt(that.mnow);
			    	that.ShowWindow();
			    	that.SetData();	
    			}
	    	})(k);
    	}		
    }
}


