// 1. We define the chart options. 
const options =  {
    chart: {
        type: 'line',
        height:"100%"
    },
    // each series represents one set of data
    series:[
        {
            name: 'sightings',
            data:[10, 13, 15, 22, 34, 23, 55, 78, 44]
        },
        {
            name: 'temperature',
            data:[33, 21, 22, 24, 25, 26, 26, 21, 31, 44]
        }

    ],
    // what is are the labels along the x-axis (horizontal line)
    xaxis: {
        categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct']
    },
    
}
 
// create the chart
const chart = new ApexCharts(document.querySelector('#chart'), options);
 
// render the chart
chart.render()
