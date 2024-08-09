const {Events} = require('discord.js')

module.exports = {
    name: Events.ClientReady,
    once:true,
    execute(client){
        client.user.setPresence({ activities: [{ name: 'Minecraft 1.21' }], status: 'dnd' });
        console.log(`Successfully logged in as ${client.user.tag}`)
    }
}