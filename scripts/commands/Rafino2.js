const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
  "https://i.imgur.com/DgUv9zU.mp4",
  "https://i.imgur.com/wlWkBDm.mp4",
  "https://i.imgur.com/2vgTNgi.mp4",
  "https://i.imgur.com/8Bkw0ld.mp4",
  "https://i.imgur.com/J72QutR.mp4",
  "https://i.imgur.com/QieYVDq.mp4",
  "https://i.imgur.com/LQzmo3p.mp4",
  "https://i.imgur.com/K66OZMa.mp4",
  "https://i.imgur.com/rI9g2o5.mp4",
  "https://i.imgur.com/ljteFwN.mp4",
  "https://i.imgur.com/OhXGMZn.mp4",
  "https://i.imgur.com/FKoXnRi.mp4",
  "https://i.imgur.com/yxR9HTe.mp4",
  "https://i.imgur.com/ZO4ybCm.mp4",
  "https://i.imgur.com/77Q6QAJ.mp4",
  "https://i.imgur.com/Ui0fDw8.mp4",
  "https://i.imgur.com/swek7gL.mp4",
  "https://i.imgur.com/e9ZYR12.mp4",
  "https://i.imgur.com/cOrfZtb.mp4",
  "https://i.imgur.com/cOrfZtb.mp4"
];

module.exports.config = {
  name: "🤗",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  category: "no prefix", 
  usages: "🤗",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.handleEvent = async ({ api, event, Threads }) => {
  if (event.body.startsWith("🤗")) {
    const rahad = [
       "-ভালোবাসা সুন্দর🖤 MOHAMMAD KABIR🖤",
      "_নিড'এ রাজকন্যা ☺️🌻 MOHAMMAD KABIR🌻"
    
    ];
    const rahad2 = rahad[Math.floor(Math.random() * rahad.length)];

    const callback = () => api.sendMessage({
      body: `${rahad2}`,
      attachment: fs.createReadStream(__dirname + "/cache/2024.mp4")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.mp4"), event.messageID);
    
    const requestStream = request(encodeURI(link[Math.floor(Math.random() * link.length)]));
    requestStream.pipe(fs.createWriteStream(__dirname + "/cache/2024.mp4")).on("close", () => callback());
    return requestStream;
  }
};

module.exports.languages = {
  "vi": {
    "on": "Dùng sai cách rồi lêu lêu",
    "off": "sv ngu, đã bão dùng sai cách",
    "successText": `🧠`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["🤗"] === "undefined" || data["🤗"]) data["🤗"] = false;
  else data["🤗"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["🤗"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}
