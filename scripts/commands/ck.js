const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

module.exports.config = {
    name: "ck",
    version: "1.0.0",
    permission: 0,
    credits: "Rahad",
    description: "Uploads replied attachment to Imgur",
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
        const attachment = event.messageReply.attachments[0];
        if (!attachment) return api.sendMessage('Please reply to an image or video with /ck', event.threadID, event.messageID);

        const attachmentUrl = attachment.url;
        const fileExtension = attachmentUrl.split('.').pop().toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
        const isVideo = ['mp4', 'mov', 'avi', 'mkv'].includes(fileExtension);

        if (!isImage && !isVideo) return api.sendMessage('Unsupported file format. Please upload an image or video.', event.threadID, event.messageID);

        // Download the attachment
        const { path } = await download(attachmentUrl);

        console.log('Attachment downloaded:', path);

        // Upload to Imgur
        const imgurLink = await uploadToImgur(path);

        console.log('Imgur link:', imgurLink);

        // Send Imgur link as attachment
        return api.sendMessage(imgurLink, event.threadID, event.messageID);
    } catch (error) {
        console.error('Error:', error.response.data);
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
        console.error('Imgur upload error:', error.response.data);
        throw new Error('An error occurred while uploading to Imgur.');
    }
}
