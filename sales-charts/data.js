const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const groupBy = function (data, key) {
  // `data` is an array of objects, `key` is the key (or property accessor) to group by
  // reduce runs this anonymous function on each element of `data` (the `item` parameter,
  // returning the `storage` parameter at the end
  return data.reduce(function (storage, item) {
    // get the first instance of the key by which we're grouping
    var group = item[key];

    // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
    storage[group] = storage[group] || [];

    // add this item to its group within `storage`
    storage[group].push(item);

    // return the updated storage to the reduce function, which will then loop through the next
    return storage;
  }, {}); // {} is the initial value of the storage
};

async function loadData(url) {
  const response = await axios.get(url);
  let data = response.data;
  return transformData(data);
}

function transformData(data) {
  let transformedData = data.map((obj) => {
    return {
      ...obj,
      completed_at: new Date(obj.completed_at),
    };
  });

  let earnings = transformedData.map((data) => {
    return {
      amount: data.payment.amount,
      month: data.completed_at.getMonth(),
    };
  });
  let groupByMonth = groupBy(earnings, "month");

  let series = Object.values(groupByMonth).map((group) => {
    return {
      x: monthNames[group[0].month],
      y: parseInt(group.reduce((acc, currenVal) => acc + currenVal.amount, 0)),
    };
  });
  return series;
}
