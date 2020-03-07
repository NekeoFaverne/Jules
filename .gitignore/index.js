const Discord = require('discord.js')
const client = new Discord.Client()

var nb = Math.floor(Math.random() * 2);

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
        msg.reply('pong ! Je doute que tu gagnes... :smirk:');
        msg.react('🏓');
        const filter = (reaction, user) => {
            return ['🏓'].includes(reaction.emoji.name) && user.id === msg.author.id;
        };        
        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '🏓') {
                    nb = Math.floor(Math.random() * 2);
                    if (nb === 1) {
                    msg.reply('Smash ! Quelle belle frappe ! Tu as gagné... 😓');
                    } else {
                        msg.reply('Smash ! Héhé, tu as perdu ! 🏓');
                    }
                } else {
                    msg.reply('laisse tomber...');
                }
            })
            .catch(collected => {
                msg.reply("tu n'a rien compris, il fallait mettre la réaction...");
            });
    }
});

client.on('message', msg => {
    if (msg.content === 'Ping') {
        msg.reply("pong ! J'ai plus d'un tour dans mon sac... :smirk:");
        msg.react('🏓');
        const filter = (reaction, user) => {
            return ['🏓'].includes(reaction.emoji.name) && user.id === msg.author.id;
        };        
        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '🏓') {
                    nb = Math.floor(Math.random() * 2);
                    if (nb === 1) {
                    msg.reply('Smash ! Quelle belle frappe ! Tu as gagné... 😓');
                    } else {
                        msg.reply('Smash ! Héhé, tu as perdu ! 🏓');
                    }
                } else {
                    msg.reply('laisse tomber...');
                }
            })
            .catch(collected => {
                msg.reply("tu n'a rien compris, il fallait mettre la réaction...");
            });
    }
});

client.on('message', msg => {
    if (msg.content === 'Pong ! Tu ne peux pas me vaincre. :smirk:') {
        msg.react('🏆');
    }
});

client.on('message', msg => {
    if (msg.content === 'pong') {
        msg.channel.send("C'est moi qui le fait ça... :thumbsdown: ");
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
