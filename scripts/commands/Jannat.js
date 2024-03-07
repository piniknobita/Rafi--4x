module.exports.config = {
  name: "Jannat",
  version: "0.0.2",
  permission: 0,
  prefix: false,
  credits: "Nayan",
  description: "sad video",
  category: "admin",
  usages: "",
    cooldowns: 5,
};





module.exports.run = async function({ api, event, args, Users }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    const prompt = args.join(" ");
 
    const res = await axios.get(`http://game2.jagoanvps.cloud:5059/sim?type=ask&ask=${prompt}`);
  console.log(res.data)
  
    const response = res.data.data.msg;


        return api.sendMessage({
            body: response

        }, event.threadID, event.messageID);
    }
