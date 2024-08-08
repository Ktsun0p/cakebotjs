const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('🎉 invite CakeBot to your server!'),
    async execute(interaction){
        const embed = new EmbedBuilder()
        .setColor(`LuminousVividPink`)
        .setAuthor({name:`Add me to your server!`,iconURL:interaction.client.user.avatarURL()})
        .setDescription(`You can invite me to your server by clicking **[here](https://discord.com/api/oauth2/authorize?client_id=763116966566166558&permissions=2048&scope=bot%20applications.commands)** or my profile!`)
        .addFields({name:"Commands:",value:"**https://kats.uno/cakebot/#commands**",inline:true})
        .setFooter({text:"Thank you!",iconURL:interaction.user.displayAvatarURL()})
        
         return interaction.reply({embeds:[embed]});
    }
}