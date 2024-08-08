const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('player')
        .setDescription('Pong! 🎂'),
    async execute(interaction){
        const embed = new EmbedBuilder()
        .setColor("LuminousVividPink")
        .setImage("https://c.tenor.com/7ygCjFJ9I9kAAAAC/cat-ping-pong.gif")
        //TODO: Add command to the bot (deploy-commands.js)
          return interaction.reply({content:"**🏓¡Pong!**",embeds:[embed]})
    }
}