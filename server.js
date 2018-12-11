var express = require ("express");
var Alpine = require("alpine");
var fs = require("fs");
var byline = require("byline");
var alpine = new Alpine();

var moment= require("moment");

var app=express();

var date=[];
var convertedDate=[];
var dates = [];



function parseDate (){
    alpine.parseReadStream(fs.createReadStream('access.log', { encoding: "utf8" }),
    function (data) {
      if (data.request == "POST /service/meter/ HTTP/1.1") {
        date.push(data.time);
      }
    });

  setTimeout(
    function () {
      //console.log("lista date solo presenti nel log del parse");
      //console.log(date);
      convertDate(date);
      


    }, 1000);
   
}

function convertDate(date){
    for (i=0 ; i<date.length; i++){
       var a =  moment ([date[i]],'DD/MMM/YYYY:HH:mm:ss Z').format('DD/MMM/YYYY');
       
        convertedDate.push(a);
    }
    console.log("DATE CONVERTITE DEL FILE LOG");
    console.log( convertedDate);
    //intersect(convertDate,dates);
    countFunction();

}
// convertedDate è l'ultimo array giusto 

// calcolare quali istanze del convertedArray stanno dentro al mio array 
// di riferimento degli ultimi 30 giorni 


// ULTIMA COSA DA FARE 
function countFunction(){
    var count=[]; 

    convertedDate.forEach(function (i){ 
        count[i] = (count[i] || 0) + 1; 
    });
    //console.log("CALCOLO DEGLI ACCESSI PER OGNI DATA");
    //console.log(count);
};

var finalDate= moment().format('DD/MMM/YYYY');
//console.log(finalDate);

var priordate = moment().subtract(30, 'days').format('DD/MMM/YYYY');
//console.log( priordate);


function getDatesInrange(d1, d2, interval, format){
    
    while(d1<=d2){
      dates.push(d1.format(format));
      d1.add(interval, "days"); // aggiunge un giorno alla data 
    }
    console.log("ULTIMI 30 GIORNI DA OGGI ")
    console.log(dates)
    return dates.slice(0)
  }
  



// permette l'intesezione tra due array per capire quali sono le date comuni 

   
 /*function intersect(a, b) {
     console.log("date convertite e presenti nel log");
     console.log(convertedDate);
     console.log("date ultimi 31 giorni ");
     console.log(dates);
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
   console.log("DATE IN COMUNE:")
    console.log(Array.from(intersection))
    return Array.from(intersection);
  };*/

  

    parseDate();
    getDatesInrange(moment().subtract(30,"days"), moment(), 1, "DD/MMM/YYYY")
  
  

