const fs = require("fs");

module.exports.config = {
  name: "poddoja",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "poddoja upornas",
  prefix: true, 
  category: " text", 
  usages: "<number page>",
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = async ({ api, event, args }) => {
  const filePath = "./All.json";
  
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const pages = JSON.parse(fileData);

    if (args.length === 0 || isNaN(args[0])) {
      return api.sendMessage("Please provide a valid page number.", event.threadID);
    }

    const pageNumber = parseInt(args[0]);
    if (!pages[`Page${pageNumber}`]) {
      return api.sendMessage("Page not found.", event.threadID);
    }

    const pageContent = pages[`Page${pageNumber}`];
    api.sendMessage(pageContent, event.threadID);
  } catch (error) {
    console.error("Error reading All.json:", error);
    return api.sendMessage("An error occurred while processing your request.", event.threadID);
  }
};
