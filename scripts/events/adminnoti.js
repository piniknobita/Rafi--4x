module.exports.config = {
  name: "adminNoti",
  eventType: [
    "log:thread-admins",
    "log:thread-name",
    "log:user-nickname",
    "log:thread-call",
    "log:thread-icon",
    "log:thread-color",
    "log:link-status",
    "log:magic-words",
    "log:thread-approval-mode",
    "log:thread-poll"
  ],
  version: "1.0.1",
  credits: "Mirai Team & mod by Yan Maglinte",
  description: "Group Information Update",
  envConfig: {
    autoUnsend: true,
    sendNoti: true,
    timeToUnsend: 10
  }
};

module.exports.run = async function({ event, api, Threads, Users }) {
  const { threadID, logMessageType, logMessageData } = event;
  const { setData } = Threads;

  try {
    let dataThread = (await Threads.getData(threadID)).threadInfo;

    switch (logMessageType) {
      case "log:thread-call": {
        if (logMessageData.event === "group_call_started") {
          // Join the group call automatically
          // Use the appropriate API method to join the call
          await api.joinGroupCall(threadID);

          const callerName = await Users.getNameUser(logMessageData.caller_id);
          api.sendMessage(`[ GROUP UPDATE ]\n❯ ${callerName} STARTED A ${(logMessageData.video) ? 'VIDEO ' : ''}CALL. Bot has joined the call.`, threadID);
        } else if (logMessageData.event === "group_call_ended") {
          const callDuration = logMessageData.call_duration;
          const hours = Math.floor(callDuration / 3600);
          const minutes = Math.floor((callDuration - (hours * 3600)) / 60);
          const seconds = callDuration - (hours * 3600) - (minutes * 60);
          const timeFormat = `${hours}:${minutes}:${seconds}`;
          api.sendMessage(`[ GROUP UPDATE ]\n❯ ${(logMessageData.video) ? 'Video' : ''} call has ended.\n❯ Call duration: ${timeFormat}`, threadID);
        } else if (logMessageData.joining_user) {
          const joiningUserName = await Users.getNameUser(logMessageData.joining_user);
          api.sendMessage(`❯ [ GROUP UPDATE ]\n❯ ${joiningUserName} Joined the ${(logMessageData.group_call_type == '1') ? 'Video' : ''} call.`, threadID);
        }
        break;
      }
    }

    await setData(threadID, { threadInfo: dataThread });
  } catch (error) {
    console.log(error);
  }
};
