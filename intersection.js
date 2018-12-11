

// var arr1= dates[]; dates è di server.js , dates è l'array dal calcolo dell'intervallo 
var arr1 = [ '01/Oct/2018',
'02/Oct/2018',
'03/Oct/2018',
'04/Oct/2018',
'05/Oct/2018',
'06/Oct/2018',
'07/Oct/2018',
'08/Oct/2018',
'09/Oct/2018',
'10/Oct/2018',
'11/Oct/2018',
'12/Oct/2018',
'13/Oct/2018',
'14/Oct/2018',
'15/Oct/2018',
'16/Oct/2018',
'17/Oct/2018',
'18/Oct/2018',
'19/Oct/2018',
'20/Oct/2018',
'21/Oct/2018',
'22/Oct/2018',
'23/Oct/2018',
'24/Oct/2018',
'25/Oct/2018',
'26/Oct/2018',
'27/Oct/2018',
'28/Oct/2018',
'29/Oct/2018',
'30/Oct/2018',
'31/Oct/2018' ]

//arr2 sarebbero le date relative al file log
// cioè verifica che le date nel file log siano presenti nel range
// e restituisce la quantità nel caso ci siano stesse date nel file log 

// var arr2 =[convertedDate] sono le date convertite nel file log 
arr2 = [ '10/Sep/2018',
'01/Oct/2018',
'01/Oct/2018',
'29/Oct/2018'
];

var finalDates=[];
var finalCount=[];

function intersection(arr1iniziale,arr2iniziale){
    var commonValues = [];
    var i, j;
    var arr1Length = arr1.length;
    var arr2Length = arr2.length;
    for (i = 0; i < arr1Length; i++) {
    for (j = 0; j < arr2Length; j++) {
        if (arr1[i] === arr2[j]) {
            commonValues.push(arr1[i]);
        }
    }
}
console.log("VALORI COMUNI");
// i valori comuni tra gli ultimi 30 giorni e quelli del file log 
console.log(commonValues);

union(arr1,commonValues);

}



// l'unione mi serve prettamente per la tabella , in quanto 
// se ci sono dei buchi ad esempio 1/01/18 e 3/01/18 il 2/01 non me lo 
// segnerebbe 
function union(array1,array2){
    var finalArray=[];
    finalArray=array1.concat(array2);

    console.log("ARRAY FINALE");
    console.log(finalArray);
    countFunction(finalArray);
};


// la funzione count calcola tutte le occorrenze sull'unione 
// in modo tale che i valori doppi vengano calcolati 
function countFunction(arrayfinale){
    var count={}; 
    
    arrayfinale.forEach(function (i){ 
        count[i]= (count[i] || 0)+1; 
       
    });

    Object.keys(count).forEach(key => { 
        
       
        finalDates.push(key);
        finalCount.push(count[key]-1);
       // console.log(key, count[key]-1) })
       //console.log(finalDates);
       //console.log(finalCount);

    //let arrValues = (Object.values(count)) -1 ;
    

    //console.log("CALCOLO DEGLI ACCESSI PER OGNI DATA");
    //console.log(count);
});
}


intersection(arr1,arr2);

/*
  var p = {
"p1": "value1",
"p2": "value2",
"p3": "value3"
};


Object.keys(p).forEach(key => { console.log(key, p[key]) })
*/










