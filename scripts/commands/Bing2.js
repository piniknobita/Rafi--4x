 module.exports = {
  config: {
    name: "bing",
    version: "1.0.0",
    permission: 0,
    credits: "Nayan",
    description: "",
    prefix: 'awto',
    category: "auto prefix",
    usages: "bing prompt",
    cooldowns: 10,
},

   languages: {
   "vi": {},
       "en": {
           "missing": 'use : /bing cat'
       }
   },

start: async function({ nayan, events, args, lang}) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const prompt = args.join(" ");
    const key = this.config.credits;
    const apis = await axios.get('https://raw.githubusercontent.com/MR-NAYAN-404/NAYAN-BOT/main/api.json')
  const n = apis.data.api2
    if(!prompt) return nayan.reply(lang('missing'), events.threadID, events.messageID)

  const rndm = ['1t2RO9frUBNdA5N0Aa5MLRsXB33yQaAwXoqiESqVd1nJFNDDRcp-u2Dvgs-aW6y1ZumLuKccyf0mOk_fz-ahxcnajkp_XwzQ9tp3NqenJPc9dEghA9gXvYKtYDAyQOKT_hBHBxSfbs73PzrGHv-yBaGCmyBK3wGrfK0VJ-zG_3ogBy1kaqWCPW9Z4-ca0YxRYAcJDloaMvkBOxshiR3xwFd-3gB13JbGeufzfdZKPCg8'] // input your cookie hare

  var cookie = rndm[Math.floor(Math.random() * rndm.length)];


    const res = await axios.get(`${n}/bing-img?key=${key}&cookie=${cookie}&prompt=${encodeURIComponent(prompt)}`);

  
  console.log(res.data)
    const data = res.data.result;
  const numberSearch = data.length
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/cache/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
    }

    
    nayan.reply({
        attachment: imgData,
        body: "🔍Bing Search Result🔍\n\n📝Prompt: " + prompt + "\n\n#️⃣Number of Images: " + numberSearch
    }, events.threadID, events.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)
    }
}
                       }
