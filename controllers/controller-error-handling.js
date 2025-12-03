const isTopic = (topic) => {
  const topics = ["coding", "cooking", "football", "mitch", "cats"];

  if (!topic) return;

  if (!topics.includes(topic)) {
    throw { status: 404, message: "Topic not found" };
  }

  return topic;
};
const validId = (id) => {
  if (isNaN(Number(id))) {
    throw { status: 400, message: "Please enter a numerical id" };
  } return id
};

module.exports = { isTopic, validId };
