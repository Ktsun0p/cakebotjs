const fetch = require("node-fetch");
/**
 * @param {String} serverIP Minecraft server ip
 */
 async function getServerInfo(serverIP){
    let serverPing = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    serverPing = await serverPing.json();
    if(serverPing.ip === "127.0.0.1") throw new Error("Specified server is offline or doesn't exist");
    let hostname = serverPing.hostname || serverPing.ip+"/"+serverPing.port;
const serverIcon = `https://api.minetools.eu/favicon/${serverIP.replace(":", "/")}`;
const serverBanner = `http://status.mclive.eu/MinecraftServer/${hostname.replace(":", "/")}/banner.png`;
const serverIPs = serverPing.ip;
const serverPort = serverPing.port;
const onlinePlayers = serverPing.players.online;
const serverMax = serverPing.players.max;
const serverVersions = serverPing.version;
const serverMOTD = serverPing.motd.clean;
    let serverInfo ={
        ip: serverIPs,
        port: serverPort,
        onlinePlayers: onlinePlayers,
        maxPlayers: serverMax,
        hostname:hostname,
        versions: serverVersions,
        MOTD: serverMOTD,
        favicon: serverIcon,
        banner: serverBanner,
    };
    return serverInfo;
}
module.exports = {getServerInfo};