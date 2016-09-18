
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

        d3.text("data/RTICLINK_BeiJing.json","application/json;charset=utf-8",function(text){

          //show the point of BeiJing
          svg.append("circle")
             .attr("class","point_of_peking")
             .attr("cx",proPeking[0])
             .attr("cy",proPeking[1])
             .attr("r",1)
             .style("fill","red");




          var topology=JSON.parse(text);
//      d3.json("data/RTICLINK_BeiJing.json", function(error, topology) {
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
            .attr("data-html","true")
            .attr("dataContent",function(d,i){
              var arr = d.geometry.coordinates;
              var len = arr.length;
              var core = arr[parseInt(len/2)];
     //         console.log(arr);
     //         console.log("length"+len);
   // 		  console.log(core);
              //var txtArr=txt.split(",");
              //len = core.length;
              d3.select(this).attr("core0",core[0]);
              d3.select(this).attr("core1",core[1]);
              return  "ID:"+d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID+ " 名字:"+d.properties.Name+" 长度:"+d.properties.Length+"km"+":"+core+"-----"+len;
            })
            .attr("array",function(d,i){
              return d.geometry.coordinates;
            })



            .attr("data-content",function(d,i){
                      var rectColor=[];
                      for(var i=0;i<24;i++){
                        rectColor[i]="#000000";
                      }


              var aaa="<svg width=\"240\" height=\"30\">"+
                  "<rect x=\"0\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[0]+";\"></rect>"+
                  "<rect x=\"10\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[1]+";\"></rect>"+
                  "<rect x=\"20\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[2]+";\"></rect>"+
                  "<rect x=\"30\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[3]+";\"></rect>"+
                  "<rect x=\"40\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[4]+";\"></rect>"+
                  "<rect x=\"50\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[5]+";\"></rect>"+
                  "<rect x=\"60\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[6]+";\"></rect>"+
                  "<rect x=\"70\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[7]+";\"></rect>"+
                  "<rect x=\"80\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[8]+";\"></rect>"+
                  "<rect x=\"90\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[9]+";\"></rect>"+
                  "<rect x=\"100\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[10]+";\"></rect>"+
                  "<rect x=\"110\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[11]+";\"></rect>"+
                  "<rect x=\"120\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[12]+";\"></rect>"+
                  "<rect x=\"130\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[13]+";\"></rect>"+
                  "<rect x=\"140\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[14]+";\"></rect>"+
                  "<rect x=\"150\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[15]+";\"></rect>"+
                  "<rect x=\"160\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[16]+";\"></rect>"+
                  "<rect x=\"170\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[17]+";\"></rect>"+
                  "<rect x=\"180\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[18]+";\"></rect>"+
                  "<rect x=\"190\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[19]+";\"></rect>"+
                  "<rect x=\"200\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[20]+";\"></rect>"+
                  "<rect x=\"210\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[21]+";\"></rect>"+
                  "<rect x=\"220\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[22]+";\"></rect>"+
                  "<rect x=\"230\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[23]+";\"></rect>"+                  
                  "</svg></div>";
                  console.log("---loadingPopover-----------------------------");
                  return aaa;

            })
//            .popover()
			.each(function(d,i){
				var roadID=d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID;
				      $(document).on("click", ".close"+roadID , function(){
              
              //console.log(id_in);
              //console.log("we have done.....")
              //id_in = 0;
              //var p = d3.select(this);
 //             console.log("Building in .....");
              //console.log(p);
              //console.log("we have done.....");
              //console.log("DDDDD"+id_in);
              //console.log("FFFFFFFFFFFFF\n");
              $("#"+roadID).popover('hide');
    //          console.log("we have done.....");

              
              //console.log("Whyyyyyy");
          });
      
       $(document).on("click", ".bto"+roadID , function(){//
       			var x0=$("#"+d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID).attr("core0");
    var y0=$("#"+d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID).attr("core1");
    console.log("core0"+x0);
    console.log("core1"+y0);
    var pp = new BMap.Point(x0, y0);    
    map.panTo(pp); 

       		console.log(d);
       		if(map!=null){
       			console.log(map);
       		}
                
          });

			})
            .on("mouseover",function(d,i){
              var roadID=d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID;
              var   bbb=[]; 
              var L=0;
              d3.json("optimizedIDData/"+roadID+".json",function(err,ddd){
                var startT=1427904000;
                var count=0;
                L=0;
                for(var i=0;i<ddd.road.length-1;i=i+1){
                    if(ddd.road[i].time==String(startT)){
                      bbb[count]=ddd.road[i];
                      count=count+1;
 //                     console.log("111111111");
                      startT=startT+3600;
                      L=L+1;
                    }
                    if(ddd.road[i].time>String(startT))
                      if(ddd.road[i].time<String(startT+3600)){
                        bbb[count]=ddd.road[i];
                        count=count+1;
   //                     console.log("2222222222222");
                        startT=startT+3600;
                        L=L+1;
                      }
                      else{
                       count=count+1; 
                      }
                }

  var rectColor=[];
                     for(var i=0;i<24;i++){
                        rectColor[i]="#000000";
                      }
                      for(var i=0;i<L;i++){
                          if(!(typeof (bbb[i]) === 'undefined')){
                          rectColor[i]=color_choose(d.properties.Length/(bbb[i].UsedTime/3600));
                          console.log("time"+bbb[i].UsedTime);
                      }
                      console.log("Otime"+bbb[i].UsedTime);
                      }
              console.log(rectColor);
                      var tttt=document.getElementById(d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID);
          var content=tttt.getAttribute("data-content");
              


          var contentArr=content.split("\t");
          if(contentArr.length==1)
          	contentArr[0]=" ";
//          console.log("---::::------");
  //            console.log(content);
    //          console.log("1111");
      //        console.log(contentArr[0]);
        //      console.log("2222");
          //    console.log("---::::-----End\n");

          d3.select(tttt).attr("data-content",contentArr[0]+"\t"+
"<svg width=\"240\" height=\"30\">"+
                  "<rect x=\"0\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[0]+";\"></rect>"+
                  "<rect x=\"10\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[1]+";\"></rect>"+
                  "<rect x=\"20\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[2]+";\"></rect>"+
                  "<rect x=\"30\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[3]+";\"></rect>"+
                  "<rect x=\"40\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[4]+";\"></rect>"+
                  "<rect x=\"50\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[5]+";\"></rect>"+
                  "<rect x=\"60\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[6]+";\"></rect>"+
                  "<rect x=\"70\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[7]+";\"></rect>"+
                  "<rect x=\"80\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[8]+";\"></rect>"+
                  "<rect x=\"90\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[9]+";\"></rect>"+
                  "<rect x=\"100\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[10]+";\"></rect>"+
                  "<rect x=\"110\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[11]+";\"></rect>"+
                  "<rect x=\"120\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[12]+";\"></rect>"+
                  "<rect x=\"130\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[13]+";\"></rect>"+
                  "<rect x=\"140\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[14]+";\"></rect>"+
                  "<rect x=\"150\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[15]+";\"></rect>"+
                  "<rect x=\"160\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[16]+";\"></rect>"+
                  "<rect x=\"170\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[17]+";\"></rect>"+
                  "<rect x=\"180\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[18]+";\"></rect>"+
                  "<rect x=\"190\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[19]+";\"></rect>"+
                  "<rect x=\"200\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[20]+";\"></rect>"+
                  "<rect x=\"210\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[21]+";\"></rect>"+
                  "<rect x=\"220\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[22]+";\"></rect>"+
                  "<rect x=\"230\" y=\"0\" width=\"10\" height=\"30\" style=\"fill:"+rectColor[23]+";\"></rect>"+                  
                  "</svg><h1>ooo</h1>"+
                  "<button type=\"button\" class=\"bto"+roadID+"\" >Click me!</button>"
                  +
                  "</div>");

                      var id_in=d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID;
$("#"+d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID).popover({

                  title:"More information"
                  +"<a href=\"#\" class=\"close"+id_in+"\" data-dismiss=\"alert\">×</a>",
                  trigger:"focus",
                 placement:"buttom",
                  container: "body",
                  //template:id_in
                });	
$("#"+d.properties.MapID+String(parseInt(d.properties.Kind)-1)+d.properties.ID).popover('show');	


                
          });//load data
                
                    
      
            });//mouseover
            
         });
 


      var a=d3.rgb(255,0,0);
      var b=d3.rgb(0,255,0);
      var compute=d3.interpolate(a,b);
      //new 
      var linear = d3.scale.linear()
                     .domain([0,50])
                     .range([0,1]);

      var ob=0;
        bigChange(ob);
      


function bigChange(o){

      file="data/"+o+"_extract.json";
      d3.json(file,function(err,ddd){
     
  var times=-1;

  var startTime=new Date().getTime();
  var timestart = null;
  var timer=window.setInterval(function() 
{ 
  times=times+1;
  //change(times); 
  }, 30); 

//var a = 0,b =0,c = 0,d = 0,e= 0,f =0,g = 0,h=0,m=0,i=0;



function change(t){
      var t1=t;
        for(var i=t1*8227;i<(t1+1)*8227;i=i+1){
          
          if(i>ddd.road.length-1){
            clearInterval(timer); 
            console.log("time   "+ob);
            if(ob>22)
            return;
            else{
              ob=ob+1;
              bigChange(ob);
              
            }
            return;
          }
          var id=ddd.road[i].ID;
          var t=document.getElementById(id);
          if(t!=null){
          var l=t.getAttribute("Length");
          var speed=l/(ddd.road[i].UsedTime/3600.0);
          var color = color_choose(speed);
          
          
          show=t.getAttribute("show");
     //     console.log("display"+display);
          d3.select(t).style("stroke",color);
          d3.select(t).style("fill","white");
          
          var content=t.getAttribute("data-content");
          var contentArr=content.split("\t");
          var Content;
          if(contentArr.length==1)
            Content=content;
          else
            Content=contentArr[1];
  //        console.log("contentLength1"+content);
          var txt=t.getAttribute("dataContent");
          var txtArr=txt.split(" ");//将名字，长度，速度分割，保留名字和长度，更新速度
          //console.log("txt"+txtArr.length);
          d3.select(t).attr("dataContent",txtArr[0]+" "+txtArr[1]+" 速度"+speed+"km/h");
          d3.select(t).attr("data-content","<div>"+"<p>"+t.getAttribute("dataContent")+"</p>\t"+Content);
       
      }
          }
        }
      });

};



document.write("<script charset=\"utf-8\" language='javascript' src='plugin.js'></script>");