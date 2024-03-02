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

module.exports.handleEvent = async function ({ api, event }) {
    if (!event.body || !(event.body.indexOf("short") === 0 || event.body.indexOf("Short") === 0)) {
        const args = event.body.split(/\s+/).slice(1); // Extract arguments from event body
        
        const url = args.join(" ");
        
        if (!url) {
            api.sendMessage('Please provide a URL to shorten.', event.threadID, event.messageID);
            return;
        }

        try {
            const response = await axios.get(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
            
            api.sendMessage(response.data, event.threadID, event.messageID); // Send the full API response data
        } catch (error) {
            console.error(error);
            api.sendMessage('An error occurred while shortening the URL. Please try again later.', event.threadID, event.messageID);
        }
    }
};

module.exports.run = async function ({ api, event }) {};
