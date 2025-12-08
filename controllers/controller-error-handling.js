
const validNumber = (id) => {
  if (isNaN(Number(id))) {
    throw { status: 400, message: "Please enter a number" };
  } return id
};

module.exports = { validNumber };
