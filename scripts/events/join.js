module.exports.config = {
  name: "join",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Mirai-Team", // FIXED BY YAN Nayan
  description: "GROUP UPDATE NOTIFICATION"
};

const fs = require('fs-extra');
const { loadImage, createCanvas, registerFont } = require("canvas");
const request = require('request');
//const { join } = require('path');
const axios = require('axios');
const jimp = require("jimp")
const fontlink = 'https://drive.google.com/u/0/uc?id=10XFWm9F6u2RKnuVIfwoEdlav2HhkAUIB&export=download'
let PRFX = `${global.config.PREFIX}`;

module.exports.circle = async (image) => {
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}

let suffix;

module.exports.run = async function({ api, event, Users }) {
  var fullYear = global.client.getTime("fullYear");
  var getHours = await global.client.getTime("hours");
  var session = `${getHours < 3 ? "midnight" : getHours < 8 ? "Early morning" : getHours < 12 ? "noon" : getHours < 17 ? "afternoon" : getHours < 23 ? "evening" : "midnight"}`
  const moment = require("moment-timezone");
  var thu = moment.tz('Asia/dhaka').format('dddd');
  if (thu == 'Sunday') thu = 'Sunday'
  if (thu == 'Monday') thu = 'Monday'
  if (thu == 'Tuesday') thu = 'Tuesday'
  if (thu == 'Wednesday') thu = 'Wednesday'
  if (thu == "Thursday") thu = 'Thursday'
  if (thu == 'Friday') thu = 'Friday'
  if (thu == 'Saturday') thu = 'Saturday'
  const time = moment.tz("Asia/dhaka").format("HH:mm:ss - DD/MM/YYYY");
  const hours = moment.tz("Asia/dhaka").format("HH");
  const { commands } = global.client;
  const { threadID } = event;
  let threadInfo = await api.getThreadInfo(event.threadID);
  let threadName = threadInfo.threadName;
  if (!event.logMessageData.addedParticipants || !Array.isArray(event.logMessageData.addedParticipants)) {
    return;
  }
  if (event.logMessageData.addedParticipants && Array.isArray(event.logMessageData.addedParticipants) && event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    //api.changeNickname(`𝗕𝗢𝗧 ${(!global.config.BOTNAME) ? "Buddy" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());

    let gifUrl = 'https://drive.google.com/uc?id=1QrSCgq16zgsLddZFyM6Tj-9W2iW5psVT';
let gifPath = __dirname + '/Nayan/join/join.gif';

axios.get(gifUrl, { responseType: 'arraybuffer' })
.then(response => {
    fs.writeFileSync(gifPath, response.data);
    return api.sendMessage("𝐈𝐌 𝐊𝐀𝐁𝐈𝐑 𝐂𝐎𝐌𝐄😍", event.threadID, () => api.sendMessage({ body: `${global.config.BOTNAME} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ↤
🌱আ্ঁ'স্ঁ'সা্ঁ'লা্ঁ'মু্ঁ ও্ঁ'য়া্ঁ'লা্ঁ'ই্ঁ'কু্ঁ'ম্ঁ🥀🌼
<------------------------------>  
𝗕𝗼𝘁 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹 !!! 

𝗔𝗽𝗽𝗿𝗼𝘃𝗮𝗹 𝗔𝗹𝗹𝗼𝘄 𝗜𝗻 𝗧𝗵𝗶𝘀 𝗚𝗿𝗼𝘂𝗽 !!!
<------------------------------>

𝗨𝘀𝗲 𝗛𝗲𝗹𝗽 𝗧𝗼 𝗦𝗲𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 
\n\n𝗨𝘀𝗲 ${global.config.PREFIX}𝗛𝗲𝗹𝗽 𝗧𝗼 𝗦𝗲𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀.\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n${global.config.PREFIX}𝗛𝗮𝗱𝗶𝘀(𝗧𝗲𝘅𝘁)\n${global.config.PREFIX}𝗦𝘁𝗮𝘁𝘂𝘀 (𝗦𝘁𝗮𝘁𝘂𝘀 𝘃𝗶𝗱𝗲𝗼)\n${global.config.PREFIX}𝗛𝗲𝗹𝗽 (𝗖𝗼𝗺𝗺𝗮𝗻𝗱)\n${global.config.PREFIX}𝗜𝗻𝗳𝗼 
<<<<<------------------------------>>>>>
𝗔𝗻𝗱 𝗙𝗼𝗿 𝗔𝗻𝘆 𝗥𝗲𝗽𝗼𝗿𝘁 𝗢𝗿 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 𝗕𝗼𝘁 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿

۞ 𝗢𝘄𝗻𝗲𝗿 : 𝐌𝐨𝐡𝐚𝐦𝐦𝐚𝐝_𝐊𝐚𝐛𝐢𝐫

✷ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: https://www.facebook.com/profile.php?id=1000


❊ 𝗣𝗮𝗿𝘀𝗼𝗻𝗮𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : m.me/100084055393

✲ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺: t.me/Ra'fu Oke'yh 

❁ 𝗘𝗺𝗮𝗶𝗹: mohamedkabir01619@gmail.co

✿ 𝗪𝗣: 01619452338`, attachment: fs.createReadStream(gifPath)}, threadID));
})
.catch(error => {
    console.error(error);
});
  }
  else {
    try {
      if (!fs.existsSync(__dirname + `/Nayan/font/Semi.ttf`)) {
        let getfont = (await axios.get(fontlink, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/Nayan/font/Semi.ttf`, Buffer.from(getfont, "utf-8"));
      };
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
      var abx = [];
      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName; iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        memLength.push(participantIDs.length - i++);
        console.log(userName)
      }
      // console.log(event.logMessageData.addedParticipants)
      var id = [];
      for (let o = 0; o < event.logMessageData.addedParticipants.length; o++) {
        let pathImg = __dirname + `/Nayan/join/${o}.png`;
        let pathAva = __dirname + `/Nayan/join/avt.png`;
        let avtAnime = (await
