let finalData;
let chart;

const options = {
  chart: {
    type: "line",
    height: "100%",
  },
  series: [],
  noData: {
    text: "Loading...",
  },
};

window.addEventListener("DOMContentLoaded", async () => {
  chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
  finalData = await loadData(
    "https://raw.githubusercontent.com/kunxin-chor/sales-data/main/data/sales.json"
  );

  chart.updateSeries([{ name: "sales", data: finalData }]);
});
