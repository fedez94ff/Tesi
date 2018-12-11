
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    data: {
        
        labels:finalDates,    
        datasets: [{
            label: "Active requests last 30 days",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: finalCount
          
        }]
    },

    // Configuration options go here
    options: {
        responsive:true
    }
});
