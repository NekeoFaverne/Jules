const Discord = require('discord.js')
const client = new Discord.Client()
var currentHour = new Date().getHours();
var currentMin = new Date().getMinutes();

client.on('ready', () => {
    console.log("Connecté en tant que " + client.user.tag + " !")

    client.user.setPresence({
        game: {
            name: 'a stream! 😱',
            type: "STREAMING",
            url: "https://www.twitch.tv/Nekewo"
        }
    });
})

setInterval(function(){
    currentHour = new Date().getHours();
    currentMin = new Date().getMinutes();
}, 1000);

client.on("message", (message) => {

if(message.content == "&heure" || message.content == "&hour") {
    if(currentMin<10){
        message.channel.send("Il est actuellement " + currentHour + "h0" + currentMin + " " + message.author + " !");
    }
    else{
        message.channel.send("Il est actuellement " + currentHour + "h" + currentMin + " " + message.author + " !");
    }
}
});

client.on('message', msg => {
    if (msg.content.includes("LOL") || msg.content.includes("lol") || msg.content.includes("Lol") || msg.content.includes("MDR ") || msg.content.includes("Mdr") || msg.content.includes("mdr") || msg.content.includes("😂") || msg.content.includes("😆") || msg.content.includes("🤣") || msg.content.includes("xD") || msg.content.includes("xd") || msg.content.includes("XD") || msg.content.includes("x)")) {
        if (msg.author.bot) return;
        em = Math.floor(Math.random() * 4 + 1);
        if (em === 1) {
            msg.react('😂');
        }
        if (em === 2) {
            msg.react('😆');
        }
        if (em === 3) {
            msg.react('🤣');
        }
    }
});

client.on('message', msg => {
    if (msg.content.includes("Bonjour") || msg.content.includes("bonjour") || msg.content.includes("BONJOUR") || msg.content.includes("Salut") || msg.content.includes("salut") || msg.content.includes("SALUT") || msg.content.includes("Bonsoir") || msg.content.includes("bonsoir") || msg.content.includes("BONSOIR") || msg.content.includes("Hei") || msg.content.includes("hei") || msg.content.includes("HEI") || msg.content.includes("Hey") || msg.content.includes("hey ") || msg.content.includes("HEY") || msg.content.includes("Hello") || msg.content.includes("hello") || msg.content.includes("HELLO")) {
        if (msg.author.bot) return;
        bo = Math.floor(Math.random() * 4 + 1);
        if (bo === 1) {
            msg.react('👋')
            msg.channel.sendMessage('Bonjour ' + msg.author + " !");
        }
        if (bo === 2) {
            msg.react('👋')
            msg.channel.sendMessage('Hei ' + msg.author + " !");
        }
        if (bo === 3) {
            msg.react('👋')
            msg.channel.sendMessage('Salut ' + msg.author + " !");
        }
        if (bo === 4) {
            msg.react('👋')
            msg.channel.sendMessage('Hello ' + msg.author + " !");
        }
        if (bo === 5) {
            msg.react('👋')
            msg.channel.sendMessage('Hey ' + msg.author + " !");
        }
        if (bo === 6) {
            msg.react('👋')
            msg.channel.sendMessage('Yop ' + msg.author + " !");
        }
    }
});

client.on('message', msg => {
    if (msg.content === 'ping' || msg.content === 'Ping') {
        me = Math.floor(Math.random() * 2 + 1);
        if (me === 1) {
            msg.reply('pong ! Je doute que tu gagnes avec mon smash... 😏');
        }
        if (me == 2) {
            msg.reply("pong ! Tu as de la chance je n'ai pas mit toute ma force ! 😜");
        }
        if (me == 3) {
            msg.reply("pong ! Wow, franchement si tu rates celle là tu n'es pas doué... 😂");
        }
        msg.react('🏓');
        const filter = (reaction, user) => {
            return ['🏓'].includes(reaction.emoji.name) && user.id === msg.author.id;
        };        
        msg.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '🏓') {
                    nb = Math.floor(Math.random() * 14 + 1);
                    if (nb === 1) {
                        msg.channel.sendMessage("Tu viens de faire un smash ! Mon dieu quelle belle frappe ! Trop dur à contrer, tu as gagné... 😓")
                        msg.react("🏆")
                    }
                    if (nb === 2 || nb === 10 || nb === 11 || nb === 12)
                    {
                        msg.channel.sendMessage("Tu as fait un smash exeptionnel ! Mais je l'ai contré, à ton tour ! 😱")
                        .then(function(msge) {
                            msge.react("🏓")
                            msge.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();
                                if (reaction.emoji.name === '🏓') {
                                    nb = Math.floor(Math.random() * 9 + 1);
                                    if (nb === 1) {
                                        msge.channel.sendMessage("Beau smash ! Je l'ai ratée... Tu as gagné... 😓")
                                        msge.react("🏆")
                                    }
                                    if (nb === 2) {
                                        msge.channel.sendMessage("Pas mal ton contre ! Mais la balle était trop loin pour moi, tu as gagné... 😓")
                                        msge.react("🏆")
                                    }
                                    if (nb == 3 || nb == 4 || nb == 5) {
                                        msge.channel.sendMessage("Sympa ton smash ! Et bim ! Tu as raté le miens, trop vite pour toi ! 🏓")
                                        msge.react("🥴")
                                    }
                                    if (nb == 6 || nb == 7 || nb == 8 || nb == 9 || nb == 10) {
                                        msge.channel.sendMessage("Bien ton contre ! Et paff ! Tu as raté mon smash ! 🏓")
                                        msge.react("🥴")
                                    }
                                    
                                }})
                                .catch(collected => {
                                    msge.reply("tu viens de laisser tomber la balle... 😂")
                                    msge.react("👎")
                                });
                        })
                        
                    }
                    if (nb == 3 || nb == 4 || nb == 5 || nb === 13 || nb === 14) {
                        msg.channel.sendMessage("Tu as réussi à contrer ça, mais vas-tu réussir à faire de même pour mon smash ? 😏")
                        .then(function(message) {
                            message.react("🏓")
                            message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();
                                if (reaction.emoji.name === '🏓') {
                                    nb = Math.floor(Math.random() * 9 + 1);
                                    if (nb === 1) {
                                        message.channel.sendMessage("Beau smash ! Je l'ai ratée... Tu as gagné... 😓")
                                        message.react("🏆")
                                    }
                                    if (nb === 2) {
                                        message.channel.sendMessage("Pas mal ton contre ! Mais la balle était trop loin pour moi, tu as gagné... 😓")
                                        message.react("🏆")
                                    }
                                    if (nb == 3 || nb == 4 || nb == 5) {
                                        message.channel.sendMessage("Sympa ton smash ! Et bim ! Tu as raté le miens, trop vite pour toi ! 🏓")
                                        message.react("🥴")
                                    }
                                    if (nb == 6 || nb == 7 || nb == 8 || nb == 9 || nb == 10) {
                                        message.channel.sendMessage("Bien ton contre ! Et paff ! Tu as raté mon smash ! 🏓")
                                        message.react("🥴")
                                    }
                                    
                                }})
                                .catch(collected => {
                                    msg.reply("tu viens de laisser tomber la balle... 😂")
                                    msg.react("👎")
                                });
                        })
                    }
                    if (nb == 8 || nb == 9 || nb == 10) {
                        msg.channel.sendMessage("Ton contre était juste, mais tu as raté mon petit smash ! 🏓")
                        msg.react("🥴")
                    }
                    if (nb == 6 || nb == 7 || nb === 15) {
                        msg.channel.sendMessage("Bien tenté ton smash ! Tu as raté quand même ma frappe ! 🏓")
                        msg.react("🥴")
                    }
                }
            })
            .catch(collected => {
                msg.reply("Mais... Tu ne l'as même pas frappé... 😂")
                msg.react("👎")
            });
    }
});

client.on('message', message => {

    if(message.author.bot)
        return;

    if(message.content.toLowerCase().startsWith("&play"))
    {
        let VoiceChannel = message.guild.channels.find(channel => channel.id === "684865349682069560");
        if(VoiceChannel != null)
        {
            console.log(VoiceChannel.name + " a été trouvé et c'est un salon " + VoiceChannel.type + ".");
            message.channel.send(VoiceChannel.name + " a été trouvé !")
            VoiceChannel.join()
            .then(connection => {
                console.log("Salon vocal rejoint avec succès !")
            })
            .catch();
        }
    }
});

client.login(process.env.TOKEN)
