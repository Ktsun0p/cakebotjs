const { SlashCommandBuilder, EmbedBuilder, Interaction, ButtonBuilder, ButtonStyle, ActionRowBuilder, time, ComponentType} = require('discord.js')
const {byName } = require('../functions/getPlayerByName')

module.exports = {
    cooldown:5,
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

        const head_btn = new ButtonBuilder()
            .setCustomId('head')
            .setLabel('Head')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('1034949874417942538');
        const skin_btn = new ButtonBuilder()
            .setCustomId('skin')
            .setLabel('Skin')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('1034949555000705124');
        const row = new ActionRowBuilder()
            .addComponents(skin_btn,head_btn);

        const player_skin_embed = new EmbedBuilder()
            .setColor("LuminousVividPink")
            .setAuthor({name:`${player_info.username}'s Skin.`,iconURL:player_info.faceURL,url:player_info.faceURL})
            .setThumbnail(player_info.frontBodyURL)
            .setImage(player_info.fullBodyURL)
            .setDescription(`[Download](${player_info.skinURL})`);
        const player_head_embed = new EmbedBuilder()
            .setColor("LuminousVividPink")
            .setAuthor({name:`${player_info.username}'s Head.`,iconURL:player_info.faceURL,url:player_info.faceURL})
            .setThumbnail(player_info.faceURL)
            .setImage(player_info.headURL)
            .setDescription(`\`${player_info.headGiveCommand}\``);
        const player_info_embed = new EmbedBuilder()
            .setAuthor({name:`${player_info.username}`,iconURL:player_info.faceURL})
            .addFields(
                {name:'UUID',value:player_info.UUID},
                {name:'Skin',value:`[**Download**](${player_info.skinURL})`},
                {name:'NameMc page',value:`[**Click here**](${player_info.namemcURL})`}
            )
            .setColor("LuminousVividPink")
            .setThumbnail(player_info.frontBodyURL);

  
        switch (subcommand) {
            case 'info':
                const collectorFilter = i => i.user.id === interaction.user.id;
                const response = await interaction.editReply({embeds:[player_info_embed],components:[row]});
                try {
                    const selection = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
                  
                    if(selection.customId==='head'){
                        await selection.update({embeds:[player_head_embed],components:[]})
                    }else if(selection.customId === 'skin'){
                        await selection.update({embeds:[player_skin_embed],components:[]})
                    }
                } catch (error) {
                    row.components.forEach(b=>b.setDisabled(true));
                    await interaction.editReply({components:[row]});
                }
                break;
            case 'head':
                return await interaction.editReply({embeds:[player_head_embed]});
            case 'skin':
                return await interaction.editReply({embeds:[player_skin_embed]});
            default:
                break;
        }
     
    }
}