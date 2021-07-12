// 1. We define the chart options. 
const options =  {
    chart: {
        type: 'line',
        height:"100%"
    },
    // each series represents one set of data
    series:[
        {
            name: 'Deals Closed',
            data:[3000,3200,4100,1500,1000,2000,7000]
        },
        {
            name: 'Deals Rejected',
            data: [1500,1000,500,1200,1500,500,2000]
            
            
        }

    ],
    // what is are the labels along the x-axis (horizontal line)
    xaxis: {
        categories:[1999,2000,2001,2002,2003,2004,2005]
    },
    
}
 
// create the chart
const chart = new ApexCharts(document.querySelector('#chart'), options);
 
// render the chart
chart.render()
