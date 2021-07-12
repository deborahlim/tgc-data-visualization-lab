const options =  {
    chart: {
        type:'bar',
        height:"100%"
    },
    // each series represents one set of data
    series:[
        {
            name: 'revenue',
            data:[120000, 75000, 80000, 45000, 33000, 55000]
        },
    ],
    // what is are the labels along the x-axis (horizontal line)
    xaxis: {
        categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    
}

// create the chart
const chart = new ApexCharts(document.querySelector('#chart'), options);
 
// render the chart
chart.render()