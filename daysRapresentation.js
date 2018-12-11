
var Alpine = require("alpine");
var fs = require("fs");
var byline = require("byline");
var alpine = new Alpine();

var moment= require("moment");

var date=[];
var convertedDate=[]; 

matchedElements=[];


partialDays=[];
partialDaysValue=[];



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
        var a= moment.utc([date[i]],'DD/MMM/YYYY:HH:mm:ss Z').format('DD/MMM/YYYY HH');
        convertedDate.push(a);
       


    }
    console.log("DATE CONVERTITE");
    console.log( convertedDate);
    dayCalculation();

   
  

}

function dayCalculation(){
// calcolo il giorno attuale s

// today è in formato date credo 
var today = moment().format("YYYY-MM-DD");

matchingDays(convertedDate,today);
}
// comparo il giorno di oggi con quello dell'array 

function matchingDays(array1,day){
  
    for (i=0 ; i<array1.length;i++){
        var array2=[];
        array2=moment(array1[i],'DD/MMM/YYYY HH').format('YYYY-MM-DD');
    if(array2===day){
        var final= moment(array1[i],'DD/MMM/YYYY HH').format('YYYY-MM-DD HH')
        matchedElements.push(final);
       
    }
   
} 


console.log("elementi matchati ");
console.log(matchedElements);
 orderArray(matchedElements);

}

//matchedElement ordinati in base all'ora

function orderArray(arrayDaOrdinare){
    arrayDaOrdinare.sort((a,b)=> a.localeCompare(b));
    console.log("array ordinato");
    console.log(arrayDaOrdinare);

    countFunction(arrayDaOrdinare);

};


// ora devo contare le occorrenze relative ad ogni orario 

// la funzione count calcola tutte le occorrenze sull'unione 
// in modo tale che i valori doppi vengano calcolati 
function countFunction(arrayfinale){
    console.log("calcolo finale")
    var count={}; 
    
    arrayfinale.forEach(function (i){ 
        count[i]= (count[i] || 0)+1; 
       
    });

    Object.keys(count).forEach(key => { 
        
       
        partialDays.push(key); // valori dell'asse x
        partialDaysValue.push(count[key]); // valori dell'asse y
        
});
console.log(partialDays);
console.log(partialDaysValue);
}


parseDate();

