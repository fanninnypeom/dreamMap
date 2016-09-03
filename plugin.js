
//道路选择按钮的触发函数
$(function() {
      var temp=$('#1');
    temp.change(function() {
          var c=this.checked;
          g.selectAll("path").each(function(){
           
            if(c&&this.getAttribute("Kind")=="2"){
                d3.select(this).attr("show","1");
                d3.select(this).style("display","");
              }
            else if(this.getAttribute("Kind")=="2"){
                d3.select(this).attr("show","0");
                d3.select(this).style("display","none");
          }
          });
        
    });
  });     
$(function() {
      var temp=$('#0');
    temp.change(function() {
          var c=this.checked;
          g.selectAll("path").each(function(){
           
            if(c&&this.getAttribute("Kind")=="1"){
                d3.select(this).attr("show","1");
              d3.select(this).style("display","");
              }
            else if(this.getAttribute("Kind")=="1"){
                d3.select(this).attr("show","0");
                d3.select(this).style("display","none");
          }
          });
        
    });
  });
$(function() {
      var temp=$('#2');
    temp.change(function() {
          var c=this.checked;
          g.selectAll("path").each(function(){
           
            if(c&&this.getAttribute("Kind")=="3"){
                d3.select(this).attr("show","1");
                d3.select(this).style("display","");
              }
            else if(this.getAttribute("Kind")=="3"){
                d3.select(this).attr("show","0");
                d3.select(this).style("display","none");
          }
          });
        
    });
  });
$(function() {
      var temp=$('#3');
    temp.change(function() {
          var c=this.checked;
          g.selectAll("path").each(function(){
           
            if(c&&this.getAttribute("Kind")=="4"){
                d3.select(this).attr("show","1");
                d3.select(this).style("display","");
              }
            else if(this.getAttribute("Kind")=="4"){
                d3.select(this).attr("show","0");
                d3.select(this).style("display","none");
          }
          });
        
    });
  });

$("input#road-search").keyup(function(){ //enter
    if(event.keyCode==13){
  var n=$("input#road-search").val();
  var t=document.getElementsByName(n);
  for(var i=0;i<t.length;i++)
  d3.select(t[i]).style("stroke-width","6.5px");
    }
  }
  
);

//$(function () {
//  $('[data-toggle="popover"]').popover()
//});

function searchRoad(){
  var n=$("input#road-search").val();
  var t=document.getElementsByName(n);//得到一个节点List
  if(t.length == 0)
  {
    console.log("未找到----->>>>>>>");
    alert("抱歉 所搜索路径未找到！")

  }
  console.log("路径已找到");
  for(var i=0;i<t.length;i++)
    d3.select(t[i]).style("stroke-width","10.5px");

};

