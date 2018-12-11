
var ctx = document.getElementById('myTable').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels:valoriDelMese,
       datasets: [{
            label: "Active requests last year ",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            //data: [0, 10, 5, 2, 20, 30, 45],
            data : contaDelMese
            //data: [0,1,1,1,1,1,1,1,1,1,2,1,10]
        }]
    },

    // Configuration options go here
    options: {}
});