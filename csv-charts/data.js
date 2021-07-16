async function loadData(url) {
  let response = await axios.get(url);

  // csv object is available from csvtojson package
  let json = await csv().fromString(response.data);
  console.log(json);
  return transformData(json);
}

// transfrom raw json data to format that apex chart can display
function transformData(rawData) {
  rawData.map((row) => {
    row.crude_birth_rate = Math.round(parseFloat(row.crude_birth_rate));
  });
  // transform into x and y
  const transformedData = {
    // totalBirthsByYear: {},
    // totalBirthsByEthnicity: {},
    // birthsForChinese: [],
    // birthsForIndians: [],
    // birthsForOthers: [],
    // birthsForMalays: [],
  };
  // let series = [];
  // groupbyEthnicity will return an object of arrays, the key will be the ethnic group, and the value is an array of objects
  const groupByEthnicity = groupBy(rawData, "ethnic_group");
  console.log(groupByEthnicity);
  // mapObjectToYearAndBirthRate takes in an object in this case an object of arrays of objects and maps each object in the arrays
  // such that each object has the format {year: ..., birthRate: }
  transformedData.birthsForChinese = mapObjectToYearAndBirthRate(
    groupByEthnicity["Chinese"]
  );
  transformedData.birthsForMalays = mapObjectToYearAndBirthRate(
    groupByEthnicity["Malays"]
  );
  transformedData.birthsForIndians = mapObjectToYearAndBirthRate(
    groupByEthnicity["Indians"]
  );
  transformedData.birthsForOthers = mapObjectToYearAndBirthRate(
    groupByEthnicity["Others"]
  );

  //   let series = Object.values(groups).map(function (group, month) {
  //     return {
  //       x: monthNames[month],
  //       y: group.reduce((acc, datanum) => acc + datanum.amount, 0),
  //     };
  //   });
  // Group By Year returns an object with nested objects. the key of each nested object is the year, and the value is an array of 4 objects
  const groupByYear = groupBy(rawData, "year");
  // Object.values is a method that returns an array of the object's enumerable property values, in this case each value/group is an array of 4 objects
  // map will return an array of objects with the structure {x: ..., y:...}
  transformedData.totalBirthsByYear = Object.values(groupByYear).map(
    (group) => {
      return {
        x: parseInt(group[0].year),
        y: group.reduce(
          (acc, datanum) => acc + parseFloat(datanum.crude_birth_rate),
          0
        ),
      };
    }
  );

  // for (let datnum of rawData) {
  //   const year = parseInt(datnum.year);
  //   const birthRate = parseFloat(datnum.crude_birth_rate);

  //   if (transformedData.totalBirthsByYear[year]) {
  //     transformedData.totalBirthsByYear[year] += birthRate;
  //   } else {
  //     transformedData.totalBirthsByYear[year] = birthRate;
  //   }
  //series.push({
  //       x: parseInt(datnum.year),
  //       y: parseFloat(datnum.live_births),
  //    // });
  //   }

  //return transformedData;
  console.log(transformedData);
  return transformedData;
}

function mapObjectToYearAndBirthRate(object) {
  return object.map((row) => {
    return {
      x: parseInt(row.year),
      y: parseFloat(row.crude_birth_rate),
    };
  });
}

// function filterByEthnicityAndMap(object, ethnicity) {
//   return object
//     .filter((row) => {
//       return row.ethnic_group === ethnicity;
//     })
//     .map((row) => {
//       return {
//         x: parseInt(row.year),
//         y: parseFloat(row.crude_birth_rate),
//       };
//     });
// }

// function transformObjectToSeries(object) {
//   const series = [];
//   for (const [key, value] of Object.entries(object)) {
//     series.push({
//       x: key,
//       y: value,
//     });
//   }
//   console.log(series);
//   return series;
// }

var groupBy = function (data, key) {
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
