const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "join3",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Rahad",
  description: "Join the group that bot is in",
  category: "user",
  usages: "[]",
  cooldowns: 5,
  dependencies: {}
};

module.exports.handleEvent = async ({ api, event }) => { 
  if (event.body.startsWith("join")) {
    try {
      const groupList = await api.getThreadList(10, null, ['INBOX']);
      const filteredList = groupList.filter(group => group.threadName !== null);

      if (filteredList.length === 0) {
        api.sendMessage('No group chats found.', event.threadID);
      } else {
        const formattedList = filteredList.map((group, index) =>
          `│${index + 1}. ${group.threadName}\n│𝐓𝐈𝐃: ${group.threadID}\n│𝐓𝐨𝐭𝐚𝐥 𝐦𝐞𝐦𝐛𝐞𝐫𝐬: ${group.participantIDs.length}\n│`
        );
        const message = `╭─╮\n│𝐋𝐢𝐬𝐭 𝐨𝐟 𝐠𝐫𝐨𝐮𝐩 𝐜𝐡𝐚𝐭𝐬:\n${formattedList.map(line => `${line}`).join("\n")}\n╰───────────ꔪ\n𝐌𝐚𝐱𝐢𝐦𝐮𝐦 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 = 250\n\nReply to this message with the number of the group you want to join...`;

        const sentMessage = await api.sendMessage(message, event.threadID);
      }
    } catch (error) {
      console.error("Error listing group chats", error);
    }
  }
};

module.exports.onReply = async ({ api, event, Reply, args }) => {
  const { author, commandName } = Reply;

  if (event.senderID !== author) {
    return;
  }

  const groupIndex = parseInt(args[0], 10);

  if (isNaN(groupIndex) || groupIndex <= 0) {
    api.sendMessage('Invalid input.\nPlease provide a valid number.', event.threadID, event.messageID);
    return;
  }

  try {
    const groupList = await api.getThreadList(10, null, ['INBOX']);
    const filteredList = groupList.filter(group => group.threadName !== null);

    if (groupIndex > filteredList.length) {
      api.sendMessage('Invalid group number.\nPlease choose a number within the range.', event.threadID, event.messageID);
      return;
    }

    const selectedGroup = filteredList[groupIndex - 1];
    const groupID = selectedGroup.threadID;

    // Check if the user is already in the group
    const memberList = await api.getThreadInfo(groupID);
    if (memberList.participantIDs.includes(event.senderID)) {
      api.sendMessage(`Can't add you, you are already in the group chat: \n${selectedGroup.threadName}`, event.threadID, event.messageID);
      return;
    }

    // Check if group is full
    if (memberList.participantIDs.length >= 250) {
      api.sendMessage(`Can't add you, the group chat is full: \n${selectedGroup.threadName}`, event.threadID, event.messageID);
      return;
    }

    await api.addUserToGroup(event.senderID, groupID);
    api.sendMessage(`You have joined the group chat: ${selectedGroup.threadName}`, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error joining group chat", error);
    api.sendMessage('An error occurred while joining the group chat.\nPlease try again later.', event.threadID, event.messageID);
  }
};

module.exports.run = async({ api, event }) => {};
