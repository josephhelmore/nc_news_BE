const isFound = (data) => {
  if (data.length === 0) {
    throw {
      status: 404,
      message: "This data does not exist",
    };
  }
};

module.exports = { isFound };
