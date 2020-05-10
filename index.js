var width = 2000;
var height = 2000;

var URL_file = "butterflydata.json"

var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
        
function creaTesta(gruppo,i,x,y,raggio_testa,testa) {

    var t = gruppo.append("circle")
    .attr("id", "c"+i)
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", raggio_testa)
    .on("click", function(ev){
        var new_y = testa;
        var y = parseInt(gruppo.select("#c"+i).attr("cy"));
        var translat = new_y -y;
        var new_r = y; 
    
        gruppo.select("#c"+i).transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attr("r",new_r);

        gruppo.transition()
            .ease(d3.easeLinear)
            .duration(2000) 
            .attr("transform", "translate(0 "+ translat +")")
        
    })
    .on("contextmenu", function(ev){
        var new_x = testa;
        var x = parseInt(gruppo.select("#c"+i).attr("cx"));
        var translat = new_x -x;
        var new_r = x; 

        gruppo.select("#c"+i).transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attr("r",new_r);


        gruppo.transition()
            .ease(d3.easeLinear)
            .duration(2000) 
            .attr("transform", "translate(" + translat +" 0)")
        
            
    });
}

function clickDestroAntenne(gruppo,i,x,antenne) {
    var new_x = antenne;
    var new_ant = x; 
    var translat = new_x -x;
    
    gruppo.transition()
            .ease(d3.easeLinear)
            .duration(2000) 
            .attr("transform", "translate(" + translat +" 0)");
    
    var x = parseInt(gruppo.select("#c"+i).attr("cx"));
    var y = parseInt(gruppo.select("#c"+i).attr("cy"));
    var raggio_testa = parseInt(gruppo.select("#c"+i).attr("r"));
    

    x2 = new_x-(raggio_testa/2);
    y2 = y-raggio_testa+2;
    
    
    gruppo.select("#a0"+i).transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attr("x1", x2-translat)
    .attr("x2", x2-new_ant-translat)
    .attr("y1", y2)
    .attr("y2", y2-new_ant);

    x1 = new_x + (raggio_testa/2);
    y1 = y-raggio_testa+2;
    
    gruppo.select("#a1"+i).transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr("x1", x1-translat)
        .attr("x2", x1+new_ant-translat)
        .attr("y1", y1)
        .attr("y2", y1-new_ant);

}
        
function clickSinistroAntenne(gruppo,i,y,antenne) {
    var new_y = antenne;
    var new_ant = y; 
    var translat = new_y -y;

    gruppo.transition()
            .ease(d3.easeLinear)
            .duration(2000) 
            .attr("transform", "translate(0 "+ translat +")");
    
    var x = parseInt(gruppo.select("#c"+i).attr("cx"));
    var y = parseInt(gruppo.select("#c"+i).attr("cy"));
    var raggio_testa = parseInt(gruppo.select("#c"+i).attr("r"));
    

    x2 = x-(raggio_testa/2);
    y2 = new_y-raggio_testa+2;


    gruppo.select("#a0"+i).transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr("x1", x2)
        .attr("x2", x2-new_ant)
        .attr("y1", y2-translat)
        .attr("y2", y2-new_ant-translat);

    x1 = x + (raggio_testa/2);
    y1 = new_y-raggio_testa+2;

    gruppo.select("#a1"+i).transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr("x1", x1)
        .attr("x2", x1+new_ant)
        .attr("y1", y1-translat)
        .attr("y2", y1-new_ant-translat);

}

function creaAntenne(gruppo,i,x,y,raggio_testa,antenne){
    x2 = x-(raggio_testa/2);
    y2 = y-raggio_testa+2;
    
    gruppo.append("line")
    .attr("id", "a0"+i)
    .attr("x1", x2)
    .attr("x2", x2-antenne)
    .attr("y1", y2)
    .attr("y2", y2-antenne)
    .attr("stroke", "black")
        .attr("stroke-width",3)
        .on("click", function(ev){
            clickSinistroAntenne(gruppo,i,y,antenne);
        })
        .on("contextmenu", function(ev){
            clickDestroAntenne(gruppo,i,x,antenne);
        });

        x1 = x + (raggio_testa/2);
        y1 = y-raggio_testa+2;
        
        gruppo.append("line")
        .attr("id", "a1"+i)
        .attr("x1", x1)
        .attr("x2", x1+antenne)
        .attr("y1", y1)
        .attr("y2", y1-antenne)
        .attr("stroke", "black")
        .attr("stroke-width",3)
        .on("click", function(ev){
            clickSinistroAntenne(gruppo,i,y,antenne);
        })
        .on("contextmenu", function(ev){
            clickDestroAntenne(gruppo,i,x,antenne);
        });
    }
    
function creaCorpo(gruppo,i,x,y,raggio_testa,rx,ry,cx,cy,corpo){
    gruppo.append("ellipse")
    .attr("id", "cor"+i)
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("rx", rx)
    .attr("ry", ry)
    .on("click", function(ev){

        var new_y = corpo;
        var y = parseInt(gruppo.select("#c"+i).attr("cy"));
        var new_corpo = y;
        var translat = new_y -y;
        
        gruppo.transition()
        .ease(d3.easeLinear)
        .duration(2000) 
        .attr("transform", "translate(0 "+ translat +")")
        
        
        ry_corpo = new_corpo/2;
        rx_corpo = ry_corpo/2;
        
        gruppo.select("#cor"+i).transition()
        .ease(d3.easeLinear)
            .duration(2000)
            .attr("rx",rx_corpo)
            .attr("ry",ry_corpo);

        })
        .on("contextmenu", function(ev){
            var new_x = corpo;
            var x = parseInt(gruppo.select("#c"+i).attr("cx"));
            var new_corpo = x;
            var translat = new_x -x;
            
            gruppo.transition()
            .ease(d3.easeLinear)
            .duration(2000) 
            .attr("transform", "translate(" + translat +" 0)");
            
            
            ry_corpo = new_corpo/2;
            rx_corpo = ry_corpo/2;
            
            gruppo.select("#cor"+i).transition()
            .ease(d3.easeLinear)
                .duration(2000)
                .attr("rx",rx_corpo)
                .attr("ry",ry_corpo);

        });

    }

function creaAli(gruppo,i,cx,cy,rx,ry,ali){ 
    x1 = cx + rx-2;
    y1 = cy - (ry/2);
    p1 = x1.toString() + "," + y1.toString();
    
    x2 = x1 + ali;
    y2 = y1 -ali;
    p2 = x2.toString() + "," + y2.toString();
    
    x4 = cx + rx-2;
    y4 = cy + (ry/2);
    p4 = x4.toString() + "," + y4.toString();
    
    x3 = x1 +ali;
    y3 = y4 +ali;
    p3 = x3.toString() + "," + y3.toString();
    punti = p1 + " " + p2 + " " + p3+ " " + p4;
    gruppo.append("polygon")
        .attr("id", "al0"+i)
        .attr("points", punti)
        .on("click", function(ev){
            clickSinistroAli(gruppo,i,ali,cx,cy,rx,ry);
        })
        .on("contextmenu", function(ev){
            clickDestroAli(gruppo,i,ali,cx,cy,rx,ry);
        });
        


    x1 = cx - rx+2;
    y1 = cy - (ry/2);
    p1 = x1.toString() + "," + y1.toString();

    x2 = x1 - ali;
    y2 = y1 -ali;
    p2 = x2.toString() + "," + y2.toString();
    
    x4 = cx - rx+2;
    y4 = cy + (ry/2);
    p4 = x4.toString() + "," + y4.toString();
    
    x3 = x1 -ali;
    y3 = y4 +ali;
    p3 = x3.toString() + "," + y3.toString();
    punti = p1 + " " + p2 + " " + p3+ " " + p4;
    gruppo.append("polygon")
        .attr("id", "al1"+i)
        .attr("points", punti)
        .on("click", function(ev){
            clickSinistroAli(gruppo,i,ali,cx,cy,rx,ry);
        })
        .on("contextmenu", function(ev){
            clickDestroAli(gruppo,i,ali,cx,cy,rx,ry);
        });
        
    }

function clickSinistroAli(gruppo,i,ali,cx,cy,rx,ry) {
    var new_y = ali;
    var y = parseInt(gruppo.select("#c"+i).attr("cy"));
    var new_ali = y; 
    var translat = new_y -y;
    
    gruppo.transition()
        .ease(d3.easeLinear)
        .duration(2000) 
        .attr("transform", "translate(0 "+ translat +")");
        
    console.log(gruppo.select("#al0"+i).attr("points"))

    x1 = cx + rx-2;
    y1 = cy - (ry/2);
    p1 = x1.toString() + "," + y1.toString();
    
    x2 = x1 + new_ali;
    y2 = y1 -new_ali;
    p2 = x2.toString() + "," + y2.toString();
    
    x4 = cx + rx-2;
    y4 = cy + (ry/2);
    p4 = x4.toString() + "," + y4.toString();
    
    x3 = x1 +new_ali;
    y3 = y4 +new_ali;
    p3 = x3.toString() + "," + y3.toString();
    punti = p1 + " " + p2 + " " + p3+ " " + p4;
    gruppo.select( "#al0"+i).transition()
        .ease(d3.easeLinear)
        .duration(2000) 
        .attr("points", punti)

    x1 = cx - rx+2;
    y1 = cy - (ry/2);
    p1 = x1.toString() + "," + y1.toString();

    x2 = x1 - new_ali;
    y2 = y1 -new_ali;
    p2 = x2.toString() + "," + y2.toString();
    
    x4 = cx - rx+2;
    y4 = cy + (ry/2);
    p4 = x4.toString() + "," + y4.toString();
    
    x3 = x1 -new_ali;
    y3 = y4 +new_ali;
    p3 = x3.toString() + "," + y3.toString();
    punti = p1 + " " + p2 + " " + p3+ " " + p4;
    gruppo.select( "#al1"+i).transition()
        .ease(d3.easeLinear)
        .duration(2000) 
        .attr("points", punti)


    
}

function clickDestroAli(gruppo,i,ali,cx,cy,rx,ry){
    var new_x = ali;
    var x = parseInt(gruppo.select("#c"+i).attr("cx"));
    var new_ali = x; 
    var translat = new_x -x;
    
    gruppo.transition()
        .ease(d3.easeLinear)
        .duration(2000) 
        .attr("transform", "translate(" + translat +" 0)");
        

    x1 = cx + rx-2;
    y1 = cy - (ry/2);
    p1 = x1.toString() + "," + y1.toString();
    
    x2 = x1 + new_ali;
    y2 = y1 -new_ali;
    p2 = x2.toString() + "," + y2.toString();
    
    x4 = cx + rx-2;
    y4 = cy + (ry/2);
    p4 = x4.toString() + "," + y4.toString();
    
    x3 = x1 +new_ali;
    y3 = y4 +new_ali;
    p3 = x3.toString() + "," + y3.toString();
    punti = p1 + " " + p2 + " " + p3+ " " + p4;
    gruppo.select( "#al0"+i).transition()
        .ease(d3.easeLinear)
        .duration(2000) 
        .attr("points", punti)

    x1 = cx - rx+2;
    y1 = cy - (ry/2);
    p1 = x1.toString() + "," + y1.toString();

    x2 = x1 - new_ali;
    y2 = y1 -new_ali;
    p2 = x2.toString() + "," + y2.toString();
    
    x4 = cx - rx+2;
    y4 = cy + (ry/2);
    p4 = x4.toString() + "," + y4.toString();
    
    x3 = x1 -new_ali;
    y3 = y4 +new_ali;
    p3 = x3.toString() + "," + y3.toString();
    punti = p1 + " " + p2 + " " + p3+ " " + p4;
    gruppo.select( "#al1"+i).transition()
        .ease(d3.easeLinear)
        .duration(2000) 
        .attr("points", punti)

    
}

    //FILE DA JSON
    d3.json(URL_file, function(data) {
    var arr = data[0];
    for(var i=0; i<data.length ; i++){

        var raggio_testa =(data[i].testa)/2;
        var x = data[i].x;
        var y = data[i].y;
        var l_antenne = data[i].antenne;
        
        var ali = data[i].ali;
        
        var corpo = data[i].corpo;
        var ry_corpo = data[i].corpo/2;
        var rx_corpo = ry_corpo/2;
        var cy_corpo = y+raggio_testa+ry_corpo;
        var cx_corpo = x;

        var gruppo = svg.append("g")
        creaTesta(gruppo,i,x,y,raggio_testa,data[i].testa);
        creaAntenne(gruppo,i,x,y,raggio_testa,l_antenne);
        creaCorpo(gruppo,i,x,y,raggio_testa,rx_corpo,ry_corpo,cx_corpo,cy_corpo,corpo)
        creaAli(gruppo,i,cx_corpo,cy_corpo,rx_corpo,ry_corpo,ali)
    }
});