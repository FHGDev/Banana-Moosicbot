module.exports.run = (bot, message, args) => {
  const em = new embed()
  .setTitle("Help Menu")
  .setDescription("Hey! Here's a list of my commands and what they do.")
  .setTimestamp()
  .setColor("GREEN")
  
  for (const [key,value] of bot.commands) {
    em.addField("Command Name: "+key, `Usage: ${value.usage}\nInfo: ${value.info}`)
  }
  
  message.channel.send({embed: em})
}

module.exports.help = {name: "help", usage: "b.help", info: "Shows you a list of my commands."}
