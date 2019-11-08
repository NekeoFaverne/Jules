const Discord = require('discord.js')
const client = new Discord.Client()
const Mdr = [""];

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
        return msg.reply('pong ! Tu ne peux pas me vaincre. :smirk:');
    }
});

client.on('message', msg => {
    if (msg.content === 'pong') {
        msg.channel.send("C'est ma réponse ça... :thumbsdown: ");
    }
});

client.on('message', msg => {
    if (msg.content === 'Mdr') {
        msg.react("😂");
    }
});
client.on('message', msg => {
    if (msg.content === 'mdr') {
        msg.channel.send(":joy:");
    }
});

client.login(process.env.TOKEN)
