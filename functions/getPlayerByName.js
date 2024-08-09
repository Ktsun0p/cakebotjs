const fetch = require('node-fetch');
/**
 * @param {String} player_name 
 */
async function byName(player_name) {
    if(!player_name) throw new Error('Missing argument: player name.')

    player = player_name.toLocaleLowerCase();

    let apiUrl = await fetch(`https://api.mojang.com/users/profiles/minecraft/${player}`);
    apiUrl = await apiUrl.json();

    if(apiUrl.errorMessage) throw new Error(apiUrl.errorMessage)
    
    let bodyurl = `https://visage.surgeplay.com/front/300/${apiUrl.id}.png`
    let fullbodyurl = `https://visage.surgeplay.com/full/832/${apiUrl.id}.png`
    let faceurl = `https://visage.surgeplay.com/face/512/${apiUrl.id}`
    let headurl = `https://visage.surgeplay.com/head/512/${apiUrl.id}`
    let skinurl = `https://minotar.net/download/${apiUrl.id}`
    let namemcurl = `https://es.namemc.com/profile/${apiUrl.id}`
    let headgivecommand = `/give @s minecraft:player_head{SkullOwner:"${apiUrl.name}"}`
    
    let playerInfo ={
        username: apiUrl.name,
        UUID: apiUrl.id,
        headGiveCommand: headgivecommand,
        headURL: headurl,
        faceURL: faceurl,
        frontBodyURL: bodyurl,
        fullBodyURL: fullbodyurl,
        skinURL: skinurl,
        namemcURL: namemcurl
        }
    return playerInfo
};
module.exports = {byName}