var totalSize=10;
var totalPage=1;
var curpage=1;
var pageSize=10;
$(function(){	
	initData();
	$("#seach").click(function(){
		search();
	});
	$("#clearbtn").click(function(){
		relaod();
	});
	date();
	
})
//刷新整个页面
function relaod(){
	$("#type").val("");
	$("#title").val("");
	$("#start").val("");
	$("#end").val("");
	$("#pagesize").val("10");
	pageSize=10;
	initData();
	date();
}
//翻页
function changPage(pageno,allpage,size,jsondata){
	//分页
	$("#page").paging({
		pageNo:pageno,//当前页码
		totalPage: allpage,//总页数
		totalSize: size,//数据总量
		callback: function(num) {
			curpage=num;
			console.log("当前页："+curpage+",总页数："+totalPage+",每页数量："+pageSize);
			//var json={"pageno":num,"pagesize":pageSize};
			jsondata.pageno=num;
			jsondata.pagesize=pageSize;
			fulshHtml(jsondata);
		}
	})
}
//初始页面
function initData(json){//页码，每页的size
	if(json!=null){
		console.log(json);
	}else{
		json={"pageno":1,"pagesize":10};
	}
	var _param={
			url: "/phoneShow/page/getoffice.do",
			type: "GET",
			datatype: 'json',
			data:json,
			scriptCharset:'UTF-8',
			beforeSend:function(XMLHttpRequest){ 
	              //alert('远程调用开始...'); 
				  layer.load(2);
	        }, 
			success: function(data){
				totalPage=data.pagecount;//总页数
				totalSize=data.datacount;//数据总量
				curpage=data.pageno;
				layer.closeAll('loading');
				showHtml(data.office);
				changPage(curpage,totalPage,totalSize,json);
			}
		};
		
		$.ajax(_param);
}
//查询
function search(num){
	var type=$("#type").val();
	var title=$("#title").val();
	var titleencode=encodeURI(title);
	var start=$("#start").val();
	var end=$("#end").val();
	/*if(((start==""||start==null)&&(end!=""||end!=null))||((start!=""||start!=null)&&(end==""||end==null))){
		alert("请选择完整日期");
		return;
	}*/
	if(start==""&&end!=""){
//		alert("请选择开始日期");
		layer.msg('请选择开始日期');
		return;
	}
	if(start==null&&end!=null){
//		alert("请选择开始日期");
		layer.msg('请选择开始日期');
		return;
	}
	if(start!=""&&end==""){
//		alert("请选择结束日期");
		layer.msg('请选择结束日期');
		return;
	}
	if(start!=null&&end==null){
//		alert("请选择结束日期");
		layer.msg('请选择结束日期');
		return;
	}

//	alert(titleencode);
//	layer.msg(titleencode);
	console.log("type:"+type+",title:"+title+",start:"+start+",end:"+end);
	var cond={"pageno":1,"pagesize":pageSize,"type":type,"title":titleencode,"start":start,"end":end};
	initData(cond);
}
/*
 * 编号,标题 ,类型 ,浏览,时间,操作
 */
function showHtml(data){
	$("#officeTable").html("");
	for(var o=0;o<data.length;o++){
		var html="";
		html+="<tr>";
		html+="<td>"+(o+1);
		html+="</td>";
		if(data[o].type==1){
			html+="<td><svg class='icon' style='width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1707'><path d='M625.390933 132.437333v66.8672h309.930667v43.1104h-309.930667v69.973334h309.930667v43.1104h-309.930667v68.130133h309.930667v43.076267h-309.930667v68.130133h309.930667v43.076267h-309.930667v68.130133h309.930667v43.1104h-309.930667v68.096h309.930667v43.1104h-309.930667v89.361067H1024V132.437333H625.390933zM0 108.714667V914.773333l576.682667 108.680534V0L0 108.714667zM417.962667 686.08h-84.309334L279.893333 447.3856 212.411733 686.08H154.350933L70.587733 334.916267h83.114667l33.109333 218.692266 54.9888-241.220266h86.8352L375.466667 576.1024l49.9712-263.68H508.586667L417.962667 686.08v-0.034133z' fill='#00B6FF' p-id='1708'></path></svg> <span id='"+data[o].id+"'>"+data[o].title+"</span>";
		}
		if(data[o].type==2){
			html+="<td><svg class='icon' style='width: 1.3271484375em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;' viewBox='0 0 1359 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4539'><path d='M0.65515 902.861102l640.705086 115.658006V0.67113L0.65515 116.329136v786.531966z m160.176272-601.459982h91.529298l45.764649 87.390666 45.764649-87.390666h91.529298L343.890018 476.182451l114.411622 218.484653h-91.529298l-68.646973-131.093988-68.646974 131.093988H137.949097l114.411623-218.484653-91.529298-174.781331z m594.940436 185.056006h-114.411622v46.260006h114.411622v-46.260006z m0 277.607977h-114.411622v46.260007h114.411622v-46.260007z m0-138.811978h-114.411622v46.260006h114.411622v-46.260006z m0-277.591998h-114.411622v46.260007h114.411622v-46.260007z m0-138.795999h-114.411622v46.260007h114.411622v-46.260007z m68.646974 462.663983h160.176271V625.269104H824.418832v46.260007z m0-138.795999h160.176271v-46.260007H824.418832v46.260007z m0 277.591998h160.176271v-46.260007H824.418832v46.260007z m160.160292-601.459982H824.402853v46.260007h160.176271v-46.260007zM824.418832 393.937113h160.176271v-46.260007H824.418832v46.260007zM641.360236 70.069129V116.329136h411.881841v786.515987H641.360236v46.260006h458.74906V70.069129H641.360236zM1358.494203 969.095205c-0.43144-7.797887-5.129348-12.38394-11.169515-12.208168-6.088104 0.175772-10.258696 4.793783-10.754053 12.719505-0.399482 6.615421-0.111855 13.278779-0.239689 19.926158-0.143813 6.871089-4.090695 10.546323-10.482406 11.473121-3.435545 0.495358-6.998923 0.303606-10.498385 0.303606l-122.225489 0.015979c-2.636581 0-5.273161 0.143813-7.877783-0.079896-9.140146-0.814943-12.336002-4.010798-12.799401-13.310738-0.319586-6.18398 0.191751-12.415898-0.239689-18.599878-0.543295-7.670053-5.113369-12.463836-11.05766-12.479815s-10.482406 4.729866-10.993742 12.495794c-0.463399 7.06284-0.271648 14.173619-0.159793 21.252438 0.351544 22.32305 10.370551 32.549787 32.230202 32.661642 23.64933 0.127834 47.314639 0.031959 70.979947 0.01598 25.40705-0.015979 50.83008 0.191751 76.23713-0.079897 17.46535-0.191751 27.995693-10.210758 29.098264-27.548273 0.527316-8.820561 0.43144-17.736997-0.047938-26.557558z m-174.078242-64.891844c3.131938-2.380912 5.816457-5.385016 8.596851-8.213348 15.755567-15.979277 31.479175-32.006492 47.218763-48.017727l3.259772 1.278342v12.831359c0 30.600315-0.015979 61.20063 0.015979 91.816925 0 3.547399-0.191751 7.158716 0.399482 10.61024 0.926798 5.496871 4.570073 8.484996 10.082924 8.62881 5.496871 0.143813 9.363856-2.604622 10.578281-8.021597 0.767005-3.403586 0.607213-7.046861 0.607213-10.578282 0.031959-36.46471 0.015979-72.92942 0.015979-109.394129 18.152459 18.376168 46.323924 46.867219 53.70635 54.233666 2.157202 2.173182 4.330384 4.570073 6.966964 5.976249 7.590157 4.026778 15.851443-1.038653 15.803505-11.664872-1.342259-1.965451-3.339669-5.848415-6.215938-8.852519-10.338592-10.81797-59.01147-59.810433-69.557793-70.420673-1.54999-1.54999-3.068021-3.259772-4.905638-4.378322-4.586052-2.780394-9.172105-2.972145-13.103007 0.463399l-1.629886 0.607212c-1.885555 0.67113-3.211835 2.924208-4.761824 4.490177a133929.22254 133929.22254 0 0 0-67.001108 67.752134c-1.853596 1.885555-3.851006 3.707192-5.30512 5.880374-3.339669 4.953576-3.499462 10.194779 0.87886 14.493204 4.378322 4.282446 9.603545 4.090695 14.349391 0.479378z' fill='#7AB55C' p-id='4540'></path></svg><span id='"+data[o].id+"'>"+data[o].title+"</span>";
		}
		if(data[o].type==3){
			html+="<td><svg class='icon' style='width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='8061'><path d='M749.062695 512.809435c0-69.339228-37.603433-129.806391-93.502557-162.375158-2.518357-1.349741-8.505721-3.952009-12.673647-3.952009-12.406564 0-22.462594 10.072403-22.462594 22.478967 0 8.337899 4.418636 15.758915 11.172457 19.644409 43.208081 24.547069 72.357981 70.956052 72.357981 124.20379 0 54.17997-30.18344 101.289917-74.640977 125.504412-6.471388 3.950985-10.773368 11.122315-10.773368 19.244296 0 12.423961 10.088776 22.479991 22.479991 22.479991 5.269004 0.050142 11.538801-3.068895 11.538801-3.068895C710.123848 644.849704 749.062695 583.415516 749.062695 512.809435' fill='#1296db' p-id='8062'></path><path d='M723.132116 236.154511c-4.185322-2.484587-8.338922-4.536316-13.374612-4.536316-12.372795 0-22.37766 10.039657-22.37766 22.379707 0 8.888438 5.301749 16.042371 12.771885 20.111037 82.095763 47.877427 137.310296 136.809899 137.310296 238.70152 0 101.824083-55.148018 190.673667-137.14452 238.600213-7.204076 3.901867-13.390985 11.30651-13.390985 20.445658 0 12.372795 10.005888 22.36231 22.346961 22.36231 4.969175 0 8.922207-1.88493 13.207813-4.38589 95.269807-55.598272 159.305239-158.789493 159.305239-277.022291C881.786533 394.84372 818.019207 291.835671 723.132116 236.154511' fill='#1296db' p-id='8063'></path><path d='M189.014376 357.304755l111.046119 0c14.808264 0 37.554314-6.086625 136.793526-78.760808 17.693987-12.973476 34.969443-25.981744 49.91176-37.420261 0 0 0.382717 291.863301 0.382717 292.714691 0 12.45773 10.106172 22.578228 22.562878 22.578228 12.474103 0 22.580275-10.121522 22.580275-22.578228 0-2.418073-1.084705-332.236823-1.084705-332.236823 0-10.43977-5.987365-19.961634-15.392572-24.514323-9.404184-4.535293-20.577664-3.284813-28.766161 3.235694-0.400113 0.299829-40.254819 31.984459-84.296895 64.419172-76.576049 56.414871-98.855472 65.820078-103.391788 67.287499l-95.937003 0c-0.550539 0-1.084705 0.066515-1.617847 0.100284l-48.993854 0c-12.340049 0-22.379707 10.004865-22.379707 22.345937l0 356.967064c0 12.356422 10.039657 22.36231 22.379707 22.36231l164.308183 0.017396c4.452405 1.601474 25.497721 11.340279 93.436042 66.770729 39.538505 32.217772 75.009368 63.702857 75.359338 64.003709 5.085832 4.501524 11.556197 6.870478 18.0941 6.870478 3.752464 0 7.554046-0.801249 11.139711-2.4017 9.772574-4.38589 16.058744-14.107299 16.058744-24.814152 0 0 0.049119-125.036761 0.049119-125.371382s-0.032746-0.633427-0.049119-0.933255l0-0.683569-0.032746 0c-0.851391-11.623735-10.507308-20.795629-22.329565-20.795629-12.390191 0-22.428825 10.039657-22.428825 22.412452 0 1.318018 0.349971 82.045621 0.349971 82.045621-12.040221-10.205433-25.480324-21.37789-39.238676-32.516578-90.733491-73.474408-113.163339-79.612199-128.371716-79.612199-0.283456 0-0.583285 0.066515-0.883113 0.082888-0.300852-0.016373-0.567935-0.082888-0.867764-0.082888L194.167746 668.797116c-15.658631 0-19.294438-4.435009-19.294438-20.178575L174.873308 374.665145C174.873308 363.992061 176.141184 357.304755 189.014376 357.304755' fill='#1296db' p-id='8064'></path></svg><span id='"+data[o].id+"'>"+data[o].title+"</span>";
		}	
		if(data[o].type==4){
			html+="<td><svg class='icon' style='width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='8549'><path d='M625.664 132.608V199.68h309.76v43.008h-309.76V312.32h309.76v43.008h-309.76v68.608h309.76v43.008h-309.76v68.608h309.76v43.008h-309.76v68.608h309.76v43.008h-309.76v68.096h309.76v43.008h-309.76v89.088H1024v-757.76h-398.336z' fill='#333333' p-id='8550'></path><path d='M0 914.944L577.024 1024V0L0 109.056m417.792 401.92c-21.504 17.92-52.224 27.136-92.16 27.136h-76.8V670.72h-76.8V302.08h158.208c36.352 0 65.536 9.728 87.04 28.672 21.504 18.944 32.768 48.64 32.768 88.064 0 43.52-10.752 74.24-32.256 92.16zM358.912 378.368c-9.728-8.192-23.552-12.288-40.96-12.288H248.832v108.544h69.632c17.408 0 31.232-4.608 40.96-13.312 9.728-8.704 14.848-23.04 14.848-41.984-0.512-18.944-5.632-32.768-15.36-40.96z' fill='#C35132' p-id='8551'></path></svg><span id='"+data[o].id+"'>"+data[o].title+"</span>";
		}
		html+="</td>";
		html+="<td>"+getType(data[o].type);
		html+="</td>";
		if(data[o].type==3){//3是公告
		html+="<td><a href='/phoneShow/showNotice.jsp?id="+data[o].id+"' target='_blank'>查看</a>";
		}else{
		html+="<td><a href='/phoneShow/office/"+data[o].url+"' target='_blank'>查看</a>";
		}
		html+="</td>";
		html+="<td>"+data[o].date;
		html+="</td>";
		html+="<td><button onclick=\"deleteIt('"+data[o].id+"','"+data[o].title+"')\">删除</button>&nbsp;<button onclick=\"pageShow('"+data[o].id+"','"+data[o].title+"')\">修改标题</button>";
		html+="</td>";
		html+="</tr>";
		$("#officeTable").append(html);
	}
}
//根据翻页刷新页面
function fulshHtml(jsondata){
	var _param={
			url: "/phoneShow/page/getoffice.do",
			type: "POST",
			datatype: 'json',
			data:jsondata,
			beforeSend:function(XMLHttpRequest){ 
	              //alert('远程调用开始...'); 
				  layer.load(2);
	        }, 
			success: function(data){
				totalPage=data.pagecount;//总页数
				totalSize=data.datacount;//数据总量
				layer.closeAll('loading');
				showHtml(data.office);
			}
		};
		$.ajax(_param);
}
//改变每页显示数量
function pageSizeChonge(){
	var size=$("#pagesize").val();
	pageSize=size;
	var json={"pageno":1,"pagesize":pageSize};
	//initData(json);
	search();
}

function modifyTile(id){
		 var title = $("#txt").val();
	var titleencode=encodeURI(title);
	var jsondata={"id":id,"title":titleencode};
	var _param={
			url: "/phoneShow/page/update.do",
			type: "GET",
			datatype: 'json',
			data:jsondata,
			success: function(data){
				if(data.stute==1){
					$("#"+id).html(title);
					alert("修改成功");
					layer.close(layer.index);
				}else{
					alert("删除失败！");
				}
			}
		};
		$.ajax(_param);
}

function pageShow(id,title){
	layer.open({
		  title: '修改标题',
	      type: 1,
	      area: ['500px', '260px'],
	      shadeClose: true, //点击遮罩关闭
	      content: '\<\div style="padding:20px;"><textarea id="txt" rows="5" cols="60" class="layui-textarea">'+title+'</textarea><button onclick="modifyTile(\''+id+'\')">修改</button>\<\/div>'
	    });
}

//时间
function date(){
	$('#start').datetimepicker({
		language:  'zh-CN',
		format:"yyyy-mm-dd",    //格式化日期
        weekStart: 1,
        todayBtn:  1,
        minView: "month", //选择日期后，不会再跳转去选择时分秒
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
        showMeridian: 1
    }).on('changeDate',function(e){  
        var startTime =$('#start').val();  
        $('#end').datetimepicker('setStartDate',startTime);  
    });
	
	$('#end').datetimepicker({
		language:  'zh-CN',
		format:"yyyy-mm-dd",    //格式化日期
        weekStart: 1,
        todayBtn:  1,
        minView: "month", //选择日期后，不会再跳转去选择时分秒
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
        showMeridian: 1
    }).on('changeDate',function(e){  
        var endtTime =$('#end').val();  
        $('#start').datetimepicker('setEndDate',endtTime);  
    });
}
/*
 * 传入后台总页数，id
 */
function deleteIt(id,title){
	var r=confirm("确定要删除“"+title+"”吗？");
	if(r){
		var type=$("#type").val();
		var title=$("#title").val();
		var start=$("#start").val();
		var end=$("#end").val();
		var jsondata={"id":id,"totalpage":totalPage,"pageno":curpage,"pagesize":pageSize,
				"type":type,"title":title,"start":start,"end":end};
		var _param={
				url: "/phoneShow/page/delete.do",
				type: "GET",
				datatype: 'json',
				data:jsondata,
				success: function(data){
					if(data.stute==1){
						totalPage=data.pagecount;//总页数
						totalSize=data.datacount;//数据总量
						curpage=data.pageno;
						var cond={"pageno":curpage,"pagesize":pageSize,"type":type,"title":title,"start":start,"end":end};
						initData(cond);
					}else{
						alert("删除失败！");
					}
					
				}
			};
			$.ajax(_param);
	}else{
		return;
	}
	
}
function getType(type){
	if(type==1){
		return "Word";
	}
	else if(type==2){
		return "Excel";
	}
	else if(type==3){
		return "公告";
	}else if(type==4){
		return "PPT";
	}
}