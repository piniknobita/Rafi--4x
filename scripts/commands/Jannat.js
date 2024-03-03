const axios = require("axios");

module.exports.config = {
  name: "jannat",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "Talk to Ana",
  prefix: true,
  category: "sim simi fun",
  usages: "mini",
  cooldowns: 5,
  dependencies: {}
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body || !(event.body.indexOf("Jannat") === 0 || event.body.indexOf("jannat") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

  const content = args.join(" ");
  if (!content) return api.sendMessage(" hm bolo bby😸 ...", event.threadID, event.messageID);

  try {
    const response = await axios.post("https://api.simsimi.vn/v1/simtalk", {
      text: content,
      lc: "en",
      key: "848362ba-ce7f-4eba-b90d-c5f5f6ce999f",
    });

    if (response.status === 200 && response.data) {
      const simSimiResponse = response.data.text;
      api.sendMessage(simSimiResponse, event.threadID);
    } else {
      api.sendMessage("An error occurred while communicating with SimSimi.", event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while communicating with SimSimi.", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};
