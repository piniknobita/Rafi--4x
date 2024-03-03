const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const url = require('url');

module.exports.config = {
    name: "imgur",
    version: "1.0.0",
    permission: 0,
    credits: "Rahad",
    description: "Uploads replied attachment to Imgur",
    prefix: true, 
    category: "Video and images Imgur upload", 
    usages: "imgur",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async ({ api, event }) => {
    try {
        const attachmentUrl = event.messageReply.attachments[0]?.url || event.messageReply.attachments[0];
        if (!attachmentUrl) return api.sendMessage('Please reply to an image or video with /ck', event.threadID, event.messageID);

        
        const { path } = await download(attachmentUrl);

        console.log('Attachment downloaded:', path);

        // Upload to Imgur
        const imgurLink = await uploadToImgur(path);

        console.log('Imgur link:', imgurLink);

        // Send Imgur link with custom formatting
        const replyMessage = `╔═══════▣𝚁𝚊𝚑𝚊𝚍𝙱𝚘𝚝▣═══════╗\n\n     ${imgurLink}\n\n ╚═══════▣𝚁𝚊𝚑𝚊𝚍𝙱𝚘𝚝▣═══════╝`;
        return api.sendMessage(replyMessage, event.threadID, event.messageID);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return api.sendMessage('An error occurred while processing the attachment.', event.threadID, event.messageID);
    }
};

async function download(url) {
    return new Promise((resolve, reject) => {
        let path;
        axios({
            url,
            method: 'GET',
            responseType: 'stream'
        }).then(response => {
            const parsedUrl = new URL(url);
            const ext = parsedUrl.pathname.split('.').pop().toLowerCase();
            path = `./${Date.now()}.${ext}`;
            response.data.pipe(fs.createWriteStream(path));
            response.data.on('end', () => {
                console.log('Download completed:', path);
                resolve({ path });
            });
        }).catch(error => {
            console.error('Download error:', error);
            reject(error);
        });
    });
}

async function uploadToImgur(path) {
    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(path));

        console.log('Uploading to Imgur...');

        const uploadResponse = await axios.post('https://api.imgur.com/3/upload', formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Client-ID c76eb7edd1459f3` // Replace with your Imgur client ID
            }
        });

        console.log('Upload response:', uploadResponse.data);

        return uploadResponse.data.data.link;
    } catch (error) {
        console.error('Imgur upload error:', error.response?.data || error.message);
        throw new Error('An error occurred while uploading to Imgur.');
    }
}
