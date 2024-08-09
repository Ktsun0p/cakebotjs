const { SlashCommandBuilder, EmbedBuilder, Interaction} = require('discord.js')
const {byName } = require('../functions/getPlayerByName')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player')
        .setDescription('🎮 Gets a Minecraft java player info..')
        .setDescriptionLocalizations({
            "es-419":'🎮 Obtén información de un jugador de Minecraft Java.',
            "es-ES":'🎮 Obtén información de un jugador de Minecraft Java.'
        })
        .addSubcommand(subcommand=>
            subcommand
                .setName('info')
                .setDescription('🎮 Gets a Minecraft java player info.')
                .setDescriptionLocalizations({
                    "es-419":'🎮 Obtén información de un jugador de Minecraft Java.',
                    "es-ES":'🎮 Obtén información de un jugador de Minecraft Java.'
                })
                .addStringOption(option =>option.setName('name')
                .setNameLocalizations({
                    "es-419":'nombre',
                    "es-ES":'nombre'
                }).setDescription('The player name.')
                .setDescriptionLocalizations({
                    "es-419":'El nombre del jugador.',
                    "es-ES":'El nombre del jugador.'
                }).setRequired(true))
        )
        .addSubcommand(subcommand=>
            subcommand
                .setName('head')
                .setDescription('🎮 Get a Minecraft java player head.')
                .setDescriptionLocalizations({
                    "es-419":'🎮 Obtén la cabeza de un jugador de Minecraft Java.',
                    "es-ES":'🎮 Obtén la cabeza de un jugador de Minecraft Java.'
                })
                .addStringOption(option =>option.setName('name')
                .setNameLocalizations({
                    "es-419":'nombre',
                    "es-ES":'nombre'
                }).setDescription('The player name.')
                .setDescriptionLocalizations({
                    "es-419":'El nombre del jugador.',
                    "es-ES":'El nombre del jugador.'
                }).setRequired(true))
        )
        .addSubcommand(subcommand=>
            subcommand
                .setName('skin')
                .setDescription('🎮 Get a Minecraft java player skin.')
                .setDescriptionLocalizations({
                    "es-419":'🎮 Obtén la skin de un jugador de Minecraft Java.',
                    "es-ES":'🎮 Obtén la skin de un jugador de Minecraft Java.'
                })
                .addStringOption(option =>option.setName('name')
                .setNameLocalizations({
                    "es-419":'nombre',
                    "es-ES":'nombre'
                }).setDescription('The player name.')
                .setDescriptionLocalizations({
                    "es-419":'El nombre del jugador.',
                    "es-ES":'El nombre del jugador.'
                }).setRequired(true))
        ),
    /**
     * 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(interaction){
        await interaction.deferReply();
    
        const subcommand = interaction.options.getSubcommand();
        const player_name = interaction.options.getString('name');
        try {
        player_info = await byName(player_name);
        } catch (error) {
            const emb = new EmbedBuilder()
            .setAuthor({name:"Specified player doesn't exists."})
            .setColor('LuminousVividPink');
            return await interaction.editReply({embeds:[emb]});
        }
        let player_embed;
        switch (subcommand) {
            case 'info':
                player_embed = new EmbedBuilder()
                .setAuthor({name:`${player_info.username}`,iconURL:player_info.faceURL})
                .addFields(
                    {name:'UUID',value:player_info.UUID},
                    {name:'Skin',value:`[**Download**](${player_info.skinURL})`},
                    {name:'NameMc page',value:`[**Click here**](${player_info.namemcURL})`}
                )
                .setColor("LuminousVividPink")
                .setThumbnail(player_info.frontBodyURL);

                break;
            case 'head':
                player_embed = new EmbedBuilder()
                .setColor("LuminousVividPink")
                .setAuthor({name:`${player_info.username}'s Head.`,iconURL:player_info.faceURL,url:player_info.faceURL})
                .setThumbnail(player_info.faceURL)
                .setImage(player_info.headURL)
                .setDescription(`\`${player_info.headGiveCommand}\``);

                break;
            case 'skin':
                player_embed = new EmbedBuilder()
                .setColor("LuminousVividPink")
                .setAuthor({name:`${player_info.username}'s Skin.`,iconURL:player_info.faceURL,url:player_info.faceURL})
                .setThumbnail(player_info.frontBodyURL)
                .setImage(player_info.fullBodyURL)
                .setDescription(`[Download](${player_info.skinURL})`);

                break;
            default:
                break;
        }
          return await interaction.editReply({embeds:[player_embed]});
    }
}