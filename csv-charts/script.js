const birthsByEthnicityoptions = {
  chart: {
    id: "ethnicity",
    type: "line",
    height: "100%",
    width: "100%",
    group: "ethnicity-chart",
  },
  series: [],
  noData: {
    text: "Loading...",
  },
  yaxis: {
    labels: {
      minWidth: 10,
    },
  },
};

const totalBirthsoptions = {
  chart: {
    id: "totalBirths",
    type: "line",
    height: "100%",
    group: "ethnicity-chart",
  },
  series: [],
  noData: {
    text: "Loading...",
  },
  yaxis: {
    labels: {
      minWidth: 10,
    },
  },
};

// create the charts
const birthsByEthnicityChart = new ApexCharts(
  document.querySelector("#birthsByEthnicityChart"),
  birthsByEthnicityoptions
);

const totalBirthsChart = new ApexCharts(
  document.querySelector("#totalBirthsChart"),
  totalBirthsoptions
);

// render the charts
birthsByEthnicityChart.render();
totalBirthsChart.render();

window.addEventListener("DOMContentLoaded", async () => {
  const transformData = await loadData("crude.csv");
  console.log(transformData);
  birthsByEthnicityChart.updateSeries([
    {
      name: "Crude Birth Rates for Malays",
      data: transformData.birthsForMalays,
    },

    {
      name: "Crude Birth Rates for Chinese",
      data: transformData.birthsForChinese,
    },

    {
      name: "Crude Birth Rates for Indians",
      data: transformData.birthsForIndians,
    },

    {
      name: "Crude Birth Rates for Others",
      data: transformData.birthsForOthers,
    },
  ]);

  totalBirthsChart.updateSeries([
    {
      name: "Total Birth Rates",
      data: transformData.totalBirthsByYear,
    },
  ]);
});
