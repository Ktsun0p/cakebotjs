const dotenv = require('dotenv').config();
const {Client, GatewayIntentBits, Collection} = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const client = new Client({intents:[GatewayIntentBits.Guilds]});
const TOKEN = process.env.TOKEN;

client.commands = new Collection();
client.cooldowns = new Collection();

const commandsPath = path.join(__dirname,'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));
const eventsPath = path.join(__dirname,'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles){
    const filePath = path.join(commandsPath,file);
    const command =  require(filePath);
    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    }else{
        console.warn(`The command at ${filePath} is missing a required "data" or "execute" property`);
    }
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(TOKEN);