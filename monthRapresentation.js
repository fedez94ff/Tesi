
var Alpine = require("alpine");
var fs = require("fs");
var byline = require("byline");
var alpine = new Alpine();

var moment= require("moment");

var date=[];
var convertedDate=[]; 

var valoriDelMese = [];
var contaDelMese = [];

var months=[];



function parseDate (){
    alpine.parseReadStream(fs.createReadStream('access.log', { encoding: "utf8" }),
    function (data) {
      if (data.request == "POST /service/meter/ HTTP/1.1") {
        date.push(data.time);
      }
    });
    setTimeout(
    function () {
      convertDate(date);
    }, 1000);
   
}

function convertDate(date){
    for (i=0 ; i<date.length; i++){
       var a =  moment ([date[i]],'DD/MMM/YYYY:HH:mm:ss Z').format('MMM/YYYY');
       convertedDate.push(a);
    }
    console.log("DATE CONVERTITE");
    console.log( convertedDate);

    getMonthInrange(moment().subtract(12,'months'), moment(), 1, "MMM/YYYY");
    monthUnion(convertedDate,months);
    //intersect(convertDate,dates);
    //countFunction();

}

//dovrei ordinare l'array finale , in modo tale che il risultato 
// del count sia in ordine 
function countFunction(arrayFinale){
    var count={}; 
    

    arrayFinale.forEach(function (i){ 
        count[i] = (count[i] || 0) + 1; 
    });

    Object.keys(count).forEach(key => { 
        
       
        valoriDelMese.push(key);
        contaDelMese.push(count[key]-1);

    //console.log("CALCOLO DEGLI ACCESSI PER OGNI DATA");
    //console.log(count);
    });
    console.log(valoriDelMese);
    console.log(contaDelMese);
}

// calcolare da oggi gli ultimi 11 mesi 

//var finalMonth = moment().format("MMM/YYYY");

//var priorMonth = moment().subtract(12,'months').format("MMM/YYYY");

function getMonthInrange(m1,m2,interval,format){
    while (m1<=m2){
        months.push(m1.format(format));
            m1.add(interval,"months"); // aggiunge un mese al mese prima 
           
        }
          console.log("ULTIMI 12 MESI ")
          console.log(months)
          return months.slice(0)
            
         
            
           
        }

        


       
  // devo calcolare l'intersezione tra le date convertite proveniente
  // dal file log , con le date degli ultimi 12 mesi       
 
 /* function monthIntersection(arr1Month,arr2Month){
     
    var monthsCommonValues = []; // valori comuni , array risultato 
    var i, j; 
    var arr1Length = months.length; // lunghezza del primo array
     var arr2Length = convertedDate.length; // lunghezza secondo array
    for (i = 0; i < arr1Length; i++) {
    for (j = 0; j < arr2Length; j++) {
        if (months[i] === convertedDate[j]) {
            monthsCommonValues.push(months[i]);
        }
    }
}
console.log("VALORI COMUNI NEGLI ULTIMI 12 MESI ");
// i valori comuni tra gli ultimi 12 mesi  e quelli del file log 
console.log(monthsCommonValues);

monthUnion(convertedDate,monthsCommonValues);

}*/


function monthUnion(array2,array3){
    var monthsFinalArray=[];

    monthsFinalArray=array2.concat(array3);
    console.log("ARRAY FINALE 12 MESI");
    console.log(monthsFinalArray);
    countFunction(monthsFinalArray);
}

parseDate();


//monthIntersection(convertedDate, months);