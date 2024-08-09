const { SlashCommandBuilder, EmbedBuilder, Interaction} = require('discord.js')
const {getServerInfo} = require('../functions/getServerInfo.js')

module.exports = {
    cooldown:5,
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('🎮 Gets a Minecraft java server info.')
        .setDescriptionLocalizations({
            "es-419":'🎮 Obtén información de un servidor de Minecraft Java.',
            "es-ES":'🎮 Obtén información de un servidor de Minecraft Java.'
        })
        .addStringOption(option =>option.setName('ip')
            .setDescription('Server IP')
            .setDescriptionLocalizations({
                "es-419":'La IP del servidor.',
                "es-ES":'La IP del servidor'
            }).setRequired(true)),
    /**
     * 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(interaction){
        await interaction.deferReply();
        const ip = interaction.options.getString('ip');

        let server_info;
        try {
            server_info = await getServerInfo(ip);
        } catch (error) {
            const emb = new EmbedBuilder()
                .setAuthor({name:"Specified server doesn't exists."})
                .setColor('LuminousVividPink');
            return await interaction.editReply({embeds:[emb]});
        }
        const embed = new EmbedBuilder()
          .setColor('LuminousVividPink')
          .setAuthor({name:server_info.hostname,iconURL:server_info.favicon})
          .addFields(
            {name:"Ip:",value:`${server_info.ip}:${server_info.port}`,inline:true},
            {name:"Players:",value:`${server_info.onlinePlayers}/${server_info.maxPlayers}`,inline:true},
            {name: "Version:",value:server_info.versions,inline:true},
          )
          .setDescription(`\`\`\`css\n${server_info.MOTD}\`\`\``)
          .setImage(server_info.banner)
        return await interaction.editReply({embeds:[embed]})
    }
}