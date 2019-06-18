console.clear()
console.log("Loading Banana Moosicbot...")

const discord = require('discord.js')
const mongoose = require('mongoose')
const bot = new discord.Client()

bot.commands = new discord.Collection()
bot.player = new (require('discord.js-musicplayer').Player)(bot)
bot.prefix = "b."
bot.owner;
bot.invite;
global.embed = discord.RichEmbed
global.user = require('./util/models/user')

setTimeout(() => {
  mongoose.connect(`mongodb+srv://FHGDev:${process.env.atlaspass}@cluster0-ra6vb.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongoose connected.");
  })
  .catch(err => console.error(err))
}, 2500)

require('fs').readdir("./commands/", (err, files) => {
  files.filter(f => f.split(".").pop() === "js").forEach((f,i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`))
  })
})

bot.on('ready', () => {
  console.log("Banana Moosicbot is ready for action!")
  bot.user.setActivity(`for ${bot.prefix}help | ${bot.guilds.size} servers`, {type: "WATCHING"})
  
  bot.fetchApplication("@me")
  .then(app => bot.owner = app.owner)
  
  bot.generateInvite(["ADMINISTRATOR"])
  .then(inv => bot.invite = inv)
})

bot.on('message', message => {
  if (!message.content.startsWith(bot.prefix)) return;
  if (!message.guild) return;
  if (message.author.bot) return;
  
  const mArray = message.content.split(" ")
  const args = mArray.slice(1)
  const cmd = bot.commands.get(mArray[0].slice(bot.prefix.length))
  
  if (cmd) {
    user.findOne({userId: message.author.id}, (err,data) => {
      if (data) {
        if (data.blacklisted) {
          return;
        } else {
          cmd.run(bot, message, args)
          console.log(`${message.author.username} used the ${cmd.help.name} command.`)
        }
      } else {
        const newUser = new user({
          userId: message.author.id,
          coins: 0,
          blacklisted: false
        })
        newUser.save()
      }
    })
  }
})

bot.login(process.env.token)
