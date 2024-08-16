const fetch = require('node-fetch');
/**
 * @param {String} player_name 
 */
async function byName(player_name) {
    if(!player_name) throw new Error('Missing argument: player name.')

    player = player_name.toLocaleLowerCase();

    let apiUrl = await (await fetch(`https://api.mojang.com/users/profiles/minecraft/${player}`)).json();
    
    if(apiUrl.errorMessage) throw new Error(apiUrl.errorMessage)
    const UUID = apiUrl.id;

    const textures_encoded = (await (await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`)).json()).properties[0].value;
    const textures_decoded = JSON.parse(Buffer.from(textures_encoded,'base64').toString('utf-8'));

    const skin_url = textures_decoded.textures.SKIN.url;
    let body_url = `https://vzge.me/front/300/${UUID}.png`;
    let full_body_url = `https://vzge.me/full/832/${UUID}.png`;
    let face_url = `https://vzge.me/face/512/${UUID}`;
    let head_url = `https://vzge.me/head/512/${UUID}`;
    let namemc_url = `https://es.namemc.com/profile/${UUID}`;
    let head_give_command = `/give @s minecraft:player_head{SkullOwner:"${apiUrl.name}"}`;
    let new_give_command = `/give @p minecraft:player_head[profile={name:"${apiUrl.name}"}]`;
    const cape_url = textures_decoded.textures.CAPE ? textures_decoded.textures.CAPE.url : false;
    const cape_render = cape_url ? `https://vzge.me/full/832/${apiUrl.name}.png?y=140` : false;
    const back_render = cape_url ? `https://vzge.me/full/832/${apiUrl.name}.png?y=160` : false;
    return playerInfo ={
        username: apiUrl.name,
        UUID: UUID,
        headGiveCommand: head_give_command,
        new_headGiveCommand:new_give_command,
        headURL: head_url,
        faceURL: face_url,
        frontBodyURL: body_url,
        fullBodyURL: full_body_url,
        skinURL: skin_url,
        namemcURL: namemc_url,
        cape:{
            url:cape_url,
            render:cape_render,
            back_render: back_render
        }
        }
};
module.exports = {byName}