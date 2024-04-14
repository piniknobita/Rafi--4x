const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
  "https://i.imgur.com/T6sPl6q.mp4",
  "https://i.imgur.com/jm9fW2M.mp4",
  "https://i.imgur.com/vTda0vv.mp4",
  "https://i.imgur.com/ujIptP7.mp4",
  "https://i.imgur.com/JyLCyMZ.mp4",
  "https://i.imgur.com/wND256c.mp4",
  "https://i.imgur.com/RRBiUQo.mp4",
  "https://i.imgur.com/c1yzv5s.mp4",
  "https://i.imgur.com/1COPhJV.mp4",
  "https://i.imgur.com/5GodT0R.mp4",
  "https://i.imgur.com/hWiU5iu.mp4",
  "https://i.imgur.com/aPR3WSI.mp4",
  "https://i.imgur.com/gfbjgtP.mp4",
  "https://i.imgur.com/ZZIIIhM.mp4",
  "https://i.imgur.com/KPOePaD.mp4",
  "https://i.imgur.com/Lo5iWnf.mp4",
  "https://i.imgur.com/Lo5iWnf.mp4",
  "https://i.imgur.com/tiEAoOD.mp4",
  "https://i.imgur.com/Eje4Q5y.mp4",
  "https://i.imgur.com/0VEaM3Z.mp4"
];

module.exports.config = {
  name: "❤️",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  category: "no prefix", 
  usages: "❤️",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.handleEvent = async ({ api, event, Threads }) => {
  if (event.body.startsWith("❤️")) {
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
  if (typeof data["❤️"] === "undefined" || data["❤️"]) data["❤️"] = false;
  else data["❤️"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["❤️"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}
