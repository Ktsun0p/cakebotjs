const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
module.exports = {
    cooldown:2,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong! 🎂'),
    async execute(interaction){
        const embed = new EmbedBuilder()
        .setColor("LuminousVividPink")
        .setImage("https://c.tenor.com/7ygCjFJ9I9kAAAAC/cat-ping-pong.gif")
        
          return interaction.reply({content:"**🏓¡Pong!**",embeds:[embed]})
    }
}