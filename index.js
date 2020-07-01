var width = 2500;
var height = 2500;
var colors = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]
var URL_file = "butterflydata.json"

var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

var scaleTesta = d3.scaleLinear();
scaleTesta.domain([0,2000]);
scaleTesta.range([10,135]);

var scaleTestaInverse = d3.scaleLinear();
scaleTestaInverse.range([0,2000]);
scaleTestaInverse.domain([10,135]);


var scaleAntenne = d3.scaleLinear();
scaleAntenne.domain([0,2000]);
scaleAntenne.range([10,200]);

var scaleAntenneInverse = d3.scaleLinear();
scaleAntenneInverse.range([0,2000]);
scaleAntenneInverse.domain([10,200]);


var scaleAli = d3.scaleLinear();
scaleAli.domain([0,2000]);
scaleAli.range([10,190]);

var scaleAliInverse = d3.scaleLinear();
scaleAliInverse.range([0,2000]);
scaleAliInverse.domain([10,190]);


var scaleCorp = d3.scaleLinear();
scaleCorp.domain([0,2000]);
scaleCorp.range([10,250]);

var scaleCorpInverse = d3.scaleLinear();
scaleCorpInverse.range([0,1700]);
scaleCorpInverse.domain([10,250]);

        
function creaTesta(gruppo,i,x,y,raggio_testa,testa) {
    gruppo.append("circle")
        .attr("id", "c")
        .attr("fill", "#4B0082")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", raggio_testa)
        .on("click", function(ev){ 	
            clickSinistroTesta();     
        })
        .on("contextmenu", function(ev){
            clickDestroTesta();
        });
}

function traslazioneCorrente(gruppo) {
    var translatY = 0;
    var translatX = 0;
    if (gruppo.attr("transform") != null) {
        var traslazioneCorrente = gruppo.attr("transform")
            .substr(9)
            .replace("(", "")
            .replace(")", "")
            .split(",");
        translatX = translatX + parseInt(traslazioneCorrente[0]);
        translatY = translatY + parseInt(traslazioneCorrente[1]);
    }
    return { translatY, translatX };
}



function creaAntenne(gruppo,i,x,y,raggio_testa,antenne){
    x2 = x-(raggio_testa/2);
    y2 = y-raggio_testa+2;
    
    gruppo.append("line")
        .attr("id", "a0")
        .attr("x1", x2)
        .attr("x2", x2-antenne)
        .attr("y1", y2)
        .attr("y2", y2-antenne)
        .attr("stroke", "#1c4966")
        .attr("stroke-width",6)
        .on("click", function(ev){
            clickSinistroAntenne();
        })
        .on("contextmenu", function(ev){
            clickDestroAntenne();
        });

    x1 = x + (raggio_testa/2);
    y1 = y-raggio_testa+2;
        
    gruppo.append("line")
        .attr("id", "a1")
        .attr("x1", x1)
        .attr("x2", x1+antenne)
        .attr("y1", y1)      
        .attr("y2", y1-antenne)
        .attr("stroke", "#1c4966")
        .attr("stroke-width",6)
        .on("click", function(ev){
            clickSinistroAntenne();
        })
        .on("contextmenu", function(ev){
            clickDestroAntenne();
        });
}
    
function creaCorpo(gruppo,i,x,y,raggio_testa,rx,ry,cx,cy,corpo){
    
    gruppo.append("ellipse")
    .attr("id", "cor")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("rx", rx)
    .attr("ry", ry)
    .attr("fill", "purple")
    .on("click", function(ev){
        clickSinistroCorpo();
    })
    .on("contextmenu", function(ev){
        clickDestroCorpo();
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
        .attr("id", "al0")
        .attr("points", punti)
        .attr("fill", colors[i])
        .on("click", function(ev){
            clickSinistroAli();
        })
        .on("contextmenu", function(ev){
            clickDestroAli();
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
        .attr("id", "al1")
        .attr("points", punti)       
        .attr("fill", colors[i])
        .on("click", function(ev){
            clickSinistroAli();
        })
        .on("contextmenu", function(ev){
            clickDestroAli();
        });
        
}

//FILE DA JSON
d3.json(URL_file, function(data) {
    var arr = data[0];
    for(var i=0; i<data.length ; i++){

        var raggio_testa =(data[i].testa);
        var x = data[i].x;
        var y = data[i].y;
        var l_antenne = data[i].antenne;
        
        var ali = data[i].ali;
        
        var corpo = data[i].corpo;
        var ry_corpo = data[i].corpo;
        var rx_corpo = ry_corpo/2;
        var cy_corpo = y+raggio_testa+ry_corpo;
        var cx_corpo = x;

        var gruppo = svg.append("g").attr("id","f"+i);

        creaTesta(gruppo,i,x,y,raggio_testa,data[i].testa);
        creaAntenne(gruppo,i,x,y,raggio_testa,l_antenne);
        creaCorpo(gruppo,i,x,y,raggio_testa,rx_corpo,ry_corpo,cx_corpo,cy_corpo,corpo)
        creaAli(gruppo,i,cx_corpo,cy_corpo,rx_corpo,ry_corpo,ali)
    }
});

function clickDestroAli() {
    d3.json(URL_file, function(data) {
        for (var i in data) {
            var id = "#f"+i;
            var ali = data[i].ali;
            var x = data[i].x;

            var gruppo = svg.select(id);

            gruppo.transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("transform", "translate(" + parseInt(scaleAliInverse(ali)-x) +" 0)");

            var cx =  parseInt(gruppo.select("#cor").attr("cx"));
            var cy =  parseInt(gruppo.select("#cor").attr("cy"));
            var rx =  parseInt(gruppo.select("#cor").attr("rx"));
            var ry =  parseInt(gruppo.select("#cor").attr("ry"));
            var new_ali = scaleAli(x)

            var x1 = cx + rx-2;
            var y1 = cy - (ry/2);
            var p1 = x1.toString() + "," + y1.toString();
            
            var x2 = x1 + new_ali;
            var y2 = y1 -new_ali;
            var p2 = x2.toString() + "," + y2.toString();
            
            var x4 = cx + rx-2;
            var y4 = cy + (ry/2);
            var p4 = x4.toString() + "," + y4.toString();
            
            var x3 = x1 +new_ali;
            var y3 = y4 +new_ali;
            var p3 = x3.toString() + "," + y3.toString();
            var punti = p1 + " " + p2 + " " + p3+ " " + p4;
            console.log(punti)
            
            gruppo.select("#al0")
                .transition()
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
            gruppo.select("#al1")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("points", punti)

        }
    });
}


function clickSinistroAli() {
    d3.json(URL_file, function(data) {
        for (var i in data) {
            var id = "#f"+i;
            var ali = data[i].ali;
            var y = data[i].y;

            var gruppo = svg.select(id);

            gruppo.transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("transform", "translate(0 " + parseInt(scaleAliInverse(ali)-y) +")");
            
            var cx =  parseInt(gruppo.select("#cor").attr("cx"));
            var cy =  parseInt(gruppo.select("#cor").attr("cy"));
            var rx =  parseInt(gruppo.select("#cor").attr("rx"));
            var ry =  parseInt(gruppo.select("#cor").attr("ry"));
            var new_ali = scaleAli(y)

            var x1 = cx + rx-2;
            var y1 = cy - (ry/2);
            var p1 = x1.toString() + "," + y1.toString();
            
            var x2 = x1 + new_ali;
            var y2 = y1 -new_ali;
            var p2 = x2.toString() + "," + y2.toString();
            
            var x4 = cx + rx-2;
            var y4 = cy + (ry/2);
            var p4 = x4.toString() + "," + y4.toString();
            
            var x3 = x1 +new_ali;
            var y3 = y4 +new_ali;
            var p3 = x3.toString() + "," + y3.toString();
            var punti = p1 + " " + p2 + " " + p3+ " " + p4;
            console.log(punti)
            
            gruppo.select("#al0")
                .transition()
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
            gruppo.select("#al1")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("points", punti)

        }
    });
}

function clickSinistroCorpo() {
    d3.json(URL_file, function(data) {
        for (var i in data) {
            var id = "#f"+i;
            var ry_corpo = data[i].corpo;
            var y = data[i].y;

            svg.select(id)
                .transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("transform", "translate(0 " + parseInt(scaleCorpInverse(ry_corpo)-y) +")");

            svg.select(id)
                .select("#cor")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("ry", scaleCorp(y))
                .attr("rx", scaleCorp(y)/2); 

        }
    });
}



function clickDestroCorpo() {
    d3.json(URL_file, function(data) {
        for (var i in data) {
            var id = "#f"+i;
            var ry_corpo = data[i].corpo;
            var x = data[i].x;

            svg.select(id)
                .transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("transform", "translate(" + parseInt(scaleCorpInverse(ry_corpo)-x) +" 0)");
        
            svg.select(id)
                .select("#cor")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("ry", scaleCorp(x))
                .attr("rx", scaleCorp(x)/2); 

        }
    });
}


function clickDestroTesta() {
    d3.json(URL_file, function(data) {
        for (var i in data) {
            var id = "#f"+i;
            var testa = data[i].testa;
            var x = data[i].x;

            svg.select(id)
                .transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("transform", "translate(" + parseInt(scaleTestaInverse(testa)-x) +" 0)");
        
            svg.select(id)
                .select("#c")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("r", scaleTesta(x)); 
        }
    });
}

function clickSinistroTesta() {
    d3.json(URL_file, function(data) {
        for (var i in data) {
            var id = "#f"+i;
            var testa = data[i].testa;
            var y = data[i].y;

            svg.select(id)
                .transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("transform", "translate(0 " + parseInt(scaleTestaInverse(testa)-y) +")");
        
            svg.select(id)
                .select("#c")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("r", scaleTesta(y)); 
        }
    });
}



function clickDestroAntenne() {
    d3.json(URL_file, function(data) {
        for (var i in data) {
            var id = "#f"+i;
            var antenne = data[i].antenne;
            var x = data[i].x;

            svg.select(id)
                .transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("transform", "translate(" + parseInt(scaleAntenneInverse(antenne)-x) +" 0)");

            var { translatY, translatX } = traslazioneCorrente(svg.select(id));

            var x_corrente = data[i].x;
            var y_corrente = data[i].y;
            var new_antenne = scaleAntenne(x);
            var raggio_testa_corrente = svg.select(id).select("#c").attr("r")
            

            x2 = x_corrente-(raggio_testa_corrente/2);
            y2 = y_corrente-raggio_testa_corrente+2;

        
            svg.select(id)
                .select("#a0")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("x1", x2)
                .attr("x2", x2-new_antenne)
                .attr("y1", y2)
                .attr("y2", y2-new_antenne);

            
            x1 = x_corrente + (raggio_testa_corrente/2);
            y1 = y_corrente-raggio_testa_corrente+2;

            svg.select(id)
                .select("#a1")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("x1", x1)
                .attr("x2", x1+new_antenne)
                .attr("y1", y1)
                .attr("y2", y1-new_antenne)


        }
    });

}


function clickSinistroAntenne() {
    d3.json(URL_file, function(data) {
        for (var i in data) {
            var id = "#f"+i;
            var antenne = data[i].antenne;
            var y = data[i].y;

            svg.select(id)
                .transition()
                .ease(d3.easeLinear)
                .duration(2000) 
                .attr("transform", "translate(0 " + parseInt(scaleAntenneInverse(antenne)-y) +")");

            var { translatY, translatX } = traslazioneCorrente(svg.select(id));

            var x_corrente = parseInt(data[i].x + translatX);
            var y_corrente = parseInt(data[i].y + translatY);
            var new_antenne = scaleAntenne(y);
            var raggio_testa_corrente = svg.select(id).select("#c").attr("r")
            

            x2 = x_corrente-(raggio_testa_corrente/2);
            y2 = y_corrente-raggio_testa_corrente+2;

        
            svg.select(id)
                .select("#a0")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("x1", x2)
                .attr("x2", x2-new_antenne)
                .attr("y1", y2)
                .attr("y2", y2-new_antenne);

            
            x1 = x_corrente + (raggio_testa_corrente/2);
            y1 = y_corrente-raggio_testa_corrente+2;

            svg.select(id)
                .select("#a1")
                .transition()
                .ease(d3.easeLinear)
                .duration(2000)
                .attr("x1", x1)
                .attr("x2", x1+new_antenne)
                .attr("y1", y1)
                .attr("y2", y1-new_antenne)

        }
    });

}



