const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connecté en tant que " + client.user.tag + " !")

    client.user.setPresence({
        game: {
            name: "l'inécoutable.",
            type: 2,
        }
    });
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong ! Tu ne peux pas me vaincre. :smirk:');
        msg.react('🏓');
    }
});

client.on('message', msg => {
    if (msg.content === 'Ping') {
        msg.reply('Pong ! Tu ne peux pas me vaincre. :smirk:');
        msg.react('🏓');
    }
});

client.on('message', msg => {
    if (msg.content === 'Pong ! Tu ne peux pas me vaincre. 😏') {
        msg.react('🏆');
    }
});

client.on('message', msg => {
    if (msg.content === 'pong') {
        msg.channel.send("C'est moi qui le fait ça... :thumbsdown: ");
        msg.react('😤');
    }
});

client.on('message', msg => {
    if (msg.content === 'Mdr') {
        msg.react('😂');
    }
});

client.on('message', msg => {
    if (msg.content === 'mdr') {
        msg.react('😂');
    }
});

client.login(process.env.TOKEN)
