//import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';
//import './main.html';

//Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
 // this.counter = new ReactiveVar(0);
//});


 //Router.configure({
  //  layoutTemplate: 'ApplicationLayout'
  //});

Router.route('/map', {
    waitOn: function () {
    return Meteor.subscribe('road');
    },
    action: function () {
        // render all templates and regions for this route
          this.render();
          
    }
});




Template.map.onRendered(function(){
	this.autorun(function(){
Meteor.subscribe("road");


 var width = 1200;
      var height = 1000;
      var use1 = [116.3980871279,39.9048200566];
      var goole = [116.4071591969 ,39.9046716842];
      var projection = d3.geo.mercator()
						.center(goole)
						.scale(112250)
    					.translate([width/2-18.8, height/2+32]);
      
      var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);
      var path = d3.geo.path()
          .projection(projection);
      var background1 = svg.append("image")
                           .attr("class","back")
                           .attr("x",0)
                           .attr("y",0)
                           .attr("width",1100)
                           .attr("height",1000)
                          //.attr("style","fill:steelblue")
                          .attr("opacity","0.4")
                          .attr("xlink:href","images/bc1ex.jpg");   
      var g = svg.append("g");
      var color = d3.scale.category20();
      var v1 = 5,v2 = 10,v3 = 15,v4 = 20,v5 = 25, v6 = 30, v7 = 35,v8 = 40,v9 = 45;
      
      function color_choose(speed)
      {
          var color= "yellow";
                if(speed < v1)
                {
                    color= "#ff0000";
                }
                else if(speed < v2)
                {
                  color= "#ff3300";
                }
                else if(speed < v3)
                {
                  color= "#ff6600";
                }
                else if (speed <v4)
                  color= "#ff9900";
                else if (speed <v5)
                  color= "#ffcc00";
                else if (speed <v6)
                  color= "#ffff00";
                else if (speed <v7)
                  color= "#ccff00";
                else if (speed <v8)
                  color= "#9eef25";//"#99ff00 ";
                else if (speed <v9)
                  color= "#49db1a";//"#66ff00";
                else 
                  color= "#008B00";//"#54e425";//"#33ff00";
            return color;
      }
     
      var text_tile = svg.append("text")
                       .attr("x",15)
                       .attr("y",20)
                       .attr("dx","0.5em")
                       .attr("dy","1.5em")
                       .text(function(d){
                          return "Speed (km/h)"
                       });
      for(var i = 0;i<10;i++)
      {
        var colorect1 = svg.append("rect")
                           .attr("x",50)
                           .attr("y",70+i*20)
                           .attr("width",30)
                           .attr("height",20)
                           .style("fill",color_choose(5*i));
        var texts = svg.append("text")
                       .attr("x",15)
                       .attr("y",50+i*20)
                       .attr("dx","0.5em")
                       .attr("dy","1.5em")
                       .text(function(d){
                          return 5*i;
                       });
      }
      
      
        //show the point of beijing
        var peking = [116.3975273161,39.9086611069];
                  
        //var palace = [];
        var proPeking = projection(peking);
        
       // d3.text("RTICLINK_BeiJing.json","application/json;charset=utf-8",function(text){
          //show the point of BeiJing
//         Meteor.call("logToConsole","AAA");
          svg.append("circle")
             .attr("class","point_of_peking")
             .attr("cx",proPeking[0])
             .attr("cy",proPeking[1])
             .attr("r",1)
             .style("fill","red");
      //    var topology=JSON.parse(text);
     d3.json("RTICLINK_BeiJing.json", function(error, topology) {
 //         Meteor.call("logToConsole","AAA");
          g.selectAll("path")
          .data(topology.features ) 
                    .enter()            
            .append("path")
          .attr("class", function(d,i){
               
                  return "l";  
            })
        .style("fill","white")
        .style("stroke-width","1.5px")
            .attr("d", path)
            .attr("id",function(d,i){
 //           	Meteor.call("logToConsole",d.properties.MapID);
                return d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID;
            })
            .attr("Kind",function(d,i){
              return d.properties.Kind;
            })
            .attr("Length",function(d,i){
                return d.properties.Length;
            }
            )
            .attr("name",function(d,i){
        return d.properties.Name;
            })
            .attr("show","1")
   //         .attr("data-toggle","popover")
   //         .attr("data-trigger","focus")
   //         .attr("title","详细信息")
            .attr("data-content",function(d,i){
              return "名字:"+d.properties.Name+" 长度:"+d.properties.Length+"km";
            })
//            .popover()
            .each(
              function(d,i){
//                  var txt="Name: "+d.properties.Name+"  Length: "+d.properties.Length+"km";
                $(this).popover({
                  title:"More information",
                  trigger:"hover",
//                  content:txt+" Speed: "+this.getAttribute("speed")+"km/h",
                  placement:"buttom",
                  container: "body"
                })
              }
              );
            ;
         });
 
      var a=d3.rgb(255,0,0);
      var b=d3.rgb(0,255,0);
      var compute=d3.interpolate(a,b);
      //new 
      var linear = d3.scale.linear()
                     .domain([0,50])
                     .range([0,1]);
      var ob=0;
//        bigChange(ob);
      
//function bigChange(o){
 //     file="data/"+o+"_extract.json";
//      d3.json(file,function(err,ddd){
     
  var times=-1;
  var startTime=new Date().getTime();
  var timer=window.setInterval(function() 
{ 
  times=times+1;
  change(times); 
  }, 50); 


function change(t){
      var time=t*60+1427904000;

      Meteor.call("getData",String(time),function(error,road1){
    if(error)
      return;
    
//      var road=Path.find({ID:"605602254"}).fetch(); 

//console.table("awd");
// 	Meteor.call("logToConsole","Pathlength1");
  
        for(var i=0;i<road1.length;i=i+1){
          
    //        if(ob>22)
   //         return;
   //         else{
 //             ob=ob+1;
//              bigChange(ob);
              /*var sum = a+b+c+d+e+f+g+h+m+i;
               a = 0,b =0,c = 0,d = 0,e= 0,f =0,g = 0,h=0,m=0,i=0;
               */
 //           }
        //    return;
          
          var id=road1[i].ID;
          var t=document.getElementById(id);
          if(t!=null){
          var l=t.getAttribute("Length");
          var speed=l/(road1[i].UsedTime/3600.0);
          var color = color_choose(speed);
          
          
          show=t.getAttribute("show");
     //     console.log("display"+display);
          d3.select(t).style("stroke",color);
          d3.select(t).style("fill","white");
          var txt=t.getAttribute("data-content");
          var txtArr=txt.split(" ");//将名字，长度，速度分割，保留名字和长度，更新速度
          //console.log("txt"+txtArr.length);
          d3.select(t).attr("data-content",txtArr[0]+" "+txtArr[1]+" 速度"+speed+"km/h");
}
}
if(time==1427906760)
            clearInterval(timer); 
});

          };
//            console.log("time   "+ob);
      


	});
});


Template.selector.events({

'change #0': function(e,t){
           var c=$('#0').val();
     //      Meteor.call("logToConsole",this);
         
           var g=d3.select("g");
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
},

'change #1': function(e,t){
var c=$('#1').val();
var c=this.checked;
var g=d3.select("g");
          Meteor.call("logToConsole","count2");
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
},

'change #2': function(e,t){
    var c=$('#2').val();
    var c=this.checked;
    var g=d3.select("g");
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

},

'change #3': function(e,t){
          var c=$('#3').val();
          var c=this.checked;
          var g=d3.select("g");
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

},

})

/*
//道路选择按钮的触发函数
$(function() {
      var temp=$('#1');
    temp.change(function() {
          var c=this.checked;
          Meteor.call("logToConsole","count2");
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
    temp.checkbox({
      onChange : function() {
        Meteor.call("logToConsole","count2");
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
        
    }
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
*/


Template.search.events({
'keyup input#road-search':function(event){
	if(event.which===13){

  var n=$("input#road-search").val();
  var t=document.getElementsByName(n);
  if(t.length == 0)
  {
console.log()
    console.log("未找到----->>>>>>>");
    alert("抱歉 所搜索路径未找到！")
  }
  for(var i=0;i<t.length;i++)
  d3.select(t[i]).style("stroke-width","6.5px");
	}
},
/*	
$("input#road-search").keyup(function(){ //enter
    if(event.keyCode==13){
  var n=$("input#road-search").val();
  var t=document.getElementsByName(n);
  for(var i=0;i<t.length;i++)
  d3.select(t[i]).style("stroke-width","6.5px");
    }
  }
  
);
*/
//$(function () {
//  $('[data-toggle="popover"]').popover()
//});


})

Template.search.events({
	'click #search-button': function(){
  var n=$("input#road-search").val();
  var t=document.getElementsByName(n);//得到一个节点List
  if(t.length == 0)
  {

      var road=Path.find().fetch(); 
      console.log("road","222"+road.length);
    console.log("未找到----->>>>>>>");
    alert("抱歉 所搜索路径未找到！")
  }
  console.log("路径已找到");
  for(var i=0;i<t.length;i++)
    d3.select(t[i]).style("stroke-width","10.5px");

	}
})

/*
Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/