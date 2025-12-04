const isTopic = (topic) => {
  const topics = ["coding", "cooking", "football", "mitch", "cats"];

  if (!topics.includes(topic)) {
    throw { status: 404, message: "Topic not found" };
  }

  return topic;
};
const validNumber = (id) => {
  if (isNaN(Number(id))) {
    throw { status: 400, message: "Please enter a number" };
  } return id
};

module.exports = { isTopic, validNumber };
