const isTopic = (topic) => {
  const topics = ["coding", "cooking", "football", "mitch", "cats"];

  if (!topic) return Promise.resolve();
  if (!topics.includes(topic)) {
    return Promise.reject({ status: 404, message: "Topic not found" });
  }

  return Promise.resolve(topic);
};

const validId = (id) => {
if (isNaN(Number(id))) {
    return Promise.reject({ status: 400, message: "Please enter a numerical id" });
  } return Promise.resolve(id)
}

module.exports = { isTopic, validId };
