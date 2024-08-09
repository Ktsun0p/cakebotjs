const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    cooldown:2,
    data: new SlashCommandBuilder()
        .setName('animal')
        .setDescription('Random animal photos! 🐈')
        .addStringOption(option=>
            option.setName('animal')
            .setDescription('Select the animal.')
            .setRequired(true)
            .addChoices(
                {name:'Cat',value:'cat'},
                {name:'Dog',value:'dog'},
                {name:'Fox',value:'fox'}
            )),
    async execute(interaction){
        await interaction.deferReply();
        const animal = interaction.options.getString('animal');

        let image = interaction.client.user.avatarURL();

        const embed = new EmbedBuilder()
            .setColor('LuminousVividPink')
            .setTimestamp();
        
        switch (animal) {
            case 'cat':
                let cat = await fetch("https://api.thecatapi.com/v1/images/search");
                cat = await cat.json();
                image = cat[0].url;
                break;
            case 'dog':
                let dog = await fetch("https://api.thedogapi.com/v1/images/search")
                dog = await dog.json();
                image = dog[0].url;
                break;
            case 'fox':
                let fox = await fetch("https://randomfox.ca/floof/?ref=apilist.fun");
                fox = await fox.json();
                image = fox.image;
                break;
        }
        embed.setImage(image)
        return await interaction.editReply({embeds:[embed]})
    }
}