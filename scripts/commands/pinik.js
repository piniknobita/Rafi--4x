const axios = require("axios");

module.exports.config = {
  name: "pinik",
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
    if (!event.body || !(event.body.indexOf("pinik") === 0 || event.body.indexOf("Pinik") === 0)) return;
    const args = event.body.split(/\s+/);
    args.shift();

    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
        mid = messageID;
    const content = args.join(" ");
    if (!content) return api.sendMessage(" hm bolo bby😸 ...", tid, mid);
    try {
        const response = await axios.post("https://api.simsimi.vn/v1/simtalk", {
            key: "7080992WRBmXi",
            message: content,
            // You can add more parameters here if required
        });
        
        if (response.data && response.data.success) {
            api.sendMessage(response.data.success, tid, mid);
        } else {
            api.sendMessage("An error occurred while fetching the data.", tid, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};

module.exports.run = async function ({ api, event }) {};
