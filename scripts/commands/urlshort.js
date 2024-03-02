const axios = require("axios");

module.exports.config = {
  name: "short",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "Shorten a URL using TinyURL",
  prefix: true, 
  category: "utility", 
  usages: "[URL]",
  cooldowns: 5,
  dependencies: {}
};

module.exports.handleEvent = async function ({ api, event, args }) {
    if (args.length === 0) {
        api.sendMessage('Please provide a URL to shorten.', event.threadID, event.messageID);
        return;
    }

    const url = args.join(" ");

    try {
        const response = await axios.post("https://tinyurl.com/api-create.php", { url });
        
        if (response.status === 200) {
            api.sendMessage(response.data, event.threadID, event.messageID);
        } else {
            api.sendMessage('An error occurred while shortening the URL.', event.threadID, event.messageID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage('An error occurred while shortening the URL.', event.threadID, event.messageID);
    }
};

module.exports.run = async function ({ api, event }) {};
