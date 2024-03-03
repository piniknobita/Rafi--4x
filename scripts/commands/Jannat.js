const fetch = require('node-fetch');

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

    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
        mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage(" hm bolo bby😸 ...", tid, mid);

    try {
        console.log("Request:", `https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${content}&filter=true`);
        
        const response = await fetch(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${content}&filter=true`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            // Add any body data if needed
        });
        
        const data = await response.json();
        console.log("Response:", data);

        const respond = data.success;
        if (data.error) {
            api.sendMessage(`Error: ${data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚝𝚝𝚒𝚗𝚐 𝙳𝚊𝚝𝚊𝚋𝚊𝚜𝚎, 𝚜𝚘𝚛𝚛𝚢 𝚋𝚊𝚋𝚎 🥺", tid, mid);
    }
};

module.exports.run = async function ({ api, event }) {};
