const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };

  return { created_at: new Date(created_at), ...otherProperties };
};

exports.formatData = (data) => {
  const dataArr = [];
  data.map((object) => {
    const singleData = [];
    for (const keys in object) {
      singleData.push(object[keys]);
    }
    dataArr.push(singleData);
  });
  return dataArr;
};


