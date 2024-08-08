const { SlashCommandBuilder, AttachmentBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mob')
        .setDescription('🖼️ Random Minecraft mob (creature) image!'),
    async execute(interaction){
        await interaction.deferReply();
        let number = Math.floor(Math.random()*165)+1;
        const image = new AttachmentBuilder(`https://kats.uno/cakebot/img/mob_images/${number}.png`,{name:`${number}.png`})
        return await interaction.editReply({files:[image]})
    }
}