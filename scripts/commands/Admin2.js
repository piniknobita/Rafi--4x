module.exports.config = {
    name: "admin",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    prefix: true,
    description: "",
    category: "prefix",
    usages: "",
    cooldowns: 5,
    dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【hh:mm:ss】");
  
var callback = () => api.sendMessage({body:`•┄┅══❁≧◉≦𝐌𝐎𝐀𝐇𝐀𝐌𝐌𝐀𝐃"𝐊𝐀𝐁𝐈𝐑≧◉≦❁══┅┄• 

•—»✨𝐀𝐝𝐦𝐢𝐧 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧-!!✨

༊_۵༎-𝐂-𝐄-𝐎 🩷⃝🌼 𝐊𝐀𝐁𝐈𝐑<😻😽>] 🩷

𝐂𝐀𝐋𝐋 𝐌𝐄:𒁍 ⃝𓆩𝐌𝐀𝐅𝐈𝐘𝐀𓆪⸙🥷

•┄┅══❁𝐂𝐨𝐧𝐭𝐚𝐜𝐭❁══┅┄• 
𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 :https://www.facebook.com/profile.php?id=100084055394893
𝐓𝐄𝐋𝐈𝐆𝐑𝐀𝐌 :<𝐑𝐀𝐅𝐈1231
•—»✨𝐎𝐭𝐡𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧✨«—•

𝐀𝐃𝐑𝐄𝐒𝐒 : 𝐌𝐘𝐌𝐄𝐍𝐒𝐈𝐍𝐆 💜🍒

𝐒𝐓𝐄𝐓𝐔𝐒 : 𝐒𝐈𝐍𝐆𝐄𝐋.𝐏𝐑𝐎.𝐌𝐀𝐗👿
𝐓𝐔𝐏𝐄 / 𝐀𝐃𝐌𝐈𝐍 

𝐁𝐎𝐓 𝐏𝐑𝐄𝐅𝐈𝐗 : [${global.config.PREFIX}]

𝐓𝐎𝐃𝐀𝐘 𝐈𝐒 𝐓𝐈𝐌𝐄 : ${juswa} 

𝐁𝐎𝐓 𝐈𝐒 𝐑𝐔𝐍𝐍𝐈𝐍𝐆 ${hours}:${minutes}:${seconds}.

𝐓𝐡𝐚𝐧𝐤𝐬 𝐅𝐨𝐫 𝐔𝐬𝐢𝐧𝐠  ༄🌺\n[ 🩷 ]${global.config.BOTNAME}

•┄┅══❁≧◉≦𝐌𝐎𝐀𝐇𝐀𝐌𝐌𝐀𝐃"𝐊𝐀𝐁𝐈𝐑≧◉≦❁══┅┄• `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 
    fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(encodeURI(`https://graph.facebook.com/100084055394893/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
   };
