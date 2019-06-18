module.exports.run = async (bot, message, args) => {
  const [bool,id] = args
  if (!id) return message.channel.send("You must provide a user ID for me to operate on.");
  if (!bool) return message.channel.send("I don't know what to do! Tell me with `add` or `del`.")
  const u = await bot.fetchUser(id)
  
  if (bool == "add") {
    user.findOne({userId: u.id}, (err,data) => {
      if (data) {
        if (data.isAdmin) return message.channel.send("You can't blacklist admins!");
        if (u == bot.owner) return message.channel.send("You can't blacklist the owner!")
        if (u.bot == true) return message.channel.send("You can't blacklist bots!");
        if (data.blacklisted) return message.channel.send(`${u.username} is already blacklisted.`);
        
        data.blacklisted = true
        data.save()
        
        message.channel.send(`I added ${u.username} to my user blacklist.`)
      } else {
        const newUser = new user({
          userId: u.id,
          coins: 0,
          blacklisted: true,
          isAdmin: false
        })
        
        newUser.save()
        
        message.channel.send(`I added ${u.username} to my user blacklist.`)
      }
    })
  } else if (bool == "del") {
    user.findOne({userId: u.id}, (err,data) => {
      if (data) {
        if (!data.blacklisted) return message.channel.send(`${u.username} isn't blacklisted.`);
        
        data.blacklisted = false
        data.save()
        
        message.channel.send(`I removed ${u.username} from my user blacklist.`)
      } else {
        const newUser = new user({
          userId: u.id,
          coins: 0,
          blacklisted: false,
          isAdmin: false
        })
        
        newUser.save()
        
        message.channel.send(`I removed ${u.username} from my user blacklist.`);
      }
    })
  }
  
}

module.exports.help = {
  name: "ubl",
  usage: "ubl add/del 242734840829575169",
  info: "Modifies the UBL system."
}
