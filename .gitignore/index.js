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
        return msg.reply('tu veux que je Ping tout le monde avec le @everyone ? :scream:');
    }
});

client.on('message', msg => {
    if (msg.content === 'pong') {
        msg.channel.send("C'est ma réponse ça... :thumbsdown: ");
    }
});

client.on('message', msg => {
    if (msg.content === 'Mdr') {
        msg.channel.send(":joy:");
    }
});
client.on('message', msg => {
    if (msg.content === 'mdr') {
        msg.channel.send(":joy:");
    }
});

client.login(process.env.TOKEN)
