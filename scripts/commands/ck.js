const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

module.exports.config = {
    name: "ck",
    version: "1.0.0",
    permission: 0,
    credits: "Rahad",
    description: "Talk to Ana",
    prefix: true, 
    category: "sim simi fun", 
    usages: "mini",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};


module.exports.run = async ({ api, event }) => {
    try {
        const attachmentUrl = event.messageReply.attachments[0]?.url;
        if (!attachmentUrl) return api.sendMessage('Please reply to an image or video with /imgur', event.threadID, event.messageID);

        const fileExtension = attachmentUrl.split('.').pop().toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
        const isVideo = ['mp4', 'mov', 'avi', 'mkv'].includes(fileExtension);

        if (!isImage && !isVideo) return api.sendMessage('Unsupported file format. Please upload an image or video.', event.threadID, event.messageID);

        // Download the attachment
        const { path } = await download(attachmentUrl);

        console.log('Attachment downloaded:', path);

        const formData = new FormData();
        formData.append('type', isImage ? 'image' : 'video');
        formData.append(isImage ? 'image' : 'video', fs.createReadStream(path));

        console.log('Uploading to Imgur...');

        const uploadResponse = await axios.post('https://api.imgur.com/3/upload', formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Client-ID c76eb7edd1459f3` // Replace with your Imgur client ID
            }
        });

        console.log('Upload response:', uploadResponse.data);

        const imgurLink = uploadResponse.data.data.link;

        console.log('Imgur link:', imgurLink);

        return api.sendMessage(`Uploaded ${isImage ? 'image' : 'video'}: ${imgurLink}`, event.threadID, event.messageID);
    } catch (error) {
        console.error('Error:', error.response.data);
        return api.sendMessage('An error occurred while uploading the image/video.', event.threadID, event.messageID);
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
            const ext = response.headers['content-type'].split('/')[1];
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
