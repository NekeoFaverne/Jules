const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require("./configuration/config.json");

let customprefix = require("./configuration/prefix.json");
let guildconfig = require("./configuration/guilds.json");
let lang = require("./configuration/lang.json");
let vote = require("./configuration/vote.json");
let ping = require("./configuration/ping.json");

let baseprefix = config.prefix
let gledeversion = "1.0.0"

var currentHour = new Date().getHours();
var currentMin = new Date().getMinutes();

client.on('ready', () => {
  console.log(client.user.username + " connected!")

  client.user.setPresence({
    game: {
      name: 'a stream! 😱',
      type: "STREAMING",
      url: "https://www.twitch.tv/Nekewo"
    }
  });
});

//EMOJIS
function emoji(id) {
  return client.emojis.get(id).toString();
}

//LANCER LES REGLES
client.on('message', msg => {
  if (msg.author.id == config.ownerID) {
    if ((msg.content.startsWith(baseprefix + "rules"))) {
      msg.channel.send('**__To enter the server, you must accept the rules below:__**\n__http://bit.do/GledeDiscord__\n\n**Of course, you can read them again later!**\n**To continue, click on the emoji** ' + emoji("709059490997075998") + ' **below!**')
        .then(function(msg) {
          msg.react("709059490997075998")
        })
    }
  } else {
    return
  }
})

client.on('message', msg => {

  let prefix = config.prefix
  if (!customprefix[msg.guild.id]) {
    let prefix = config.prefix
  } else {
    prefix = customprefix[msg.guild.id]
  }

  if (msg.author.bot) return;
  if (msg.webhookID) return;
  if (msg.channel.type !== 'text') return;

  // languages
  if (msg.content.toLocaleLowerCase().startsWith(prefix + "language") || msg.content.toLocaleLowerCase().startsWith(prefix + "langue") || msg.content.toLocaleLowerCase().startsWith(prefix + "språk")) {
    const args = msg.content.slice(prefix.length).split(' ');
    if (!args[1]) return msg.channel.send("Type `" + prefix + "help language` for more help on this command.");
    // default
    if (!lang[msg.author.id]) {
      lang[msg.author.id] = "EN"
      fs.writeFile("./configuration/lang.json", JSON.stringify(lang), err => {
        if (err) throw err;
      });
    };
    // EN LANGUAGE
    if (args[1] === "EN") {
      if (lang[msg.author.id] === "EN") return msg.channel.send("Don't you recognize your language? Don't worry, it's already done. 😉");
      else {
        msg.channel.send("It's cool, this language is known by many people! I changed it for you. 😉")
        lang[msg.author.id] = "EN"
        fs.writeFile("./configuration/lang.json", JSON.stringify(lang), err => {
          if (err) throw err;
        });
      }
      // FR LANGUAGE
    } else if (args[1] === "FR") {
      if (lang[msg.author.id] === "FR") return msg.channel.send("Mdr quoi, tu ne reconnais même pas ta langue... Au cas où, je l'ai fais ne t'inquiètes pas.  😉");
      else {
        msg.channel.send("Pas mal, cette langue est subtile, bonne chance pour comprendre ! C'est fait. 😉")
        lang[msg.author.id] = "FR"
        fs.writeFile("./configuration/lang.json", JSON.stringify(lang), err => {
          if (err) throw err;
        });
      }
      // NO LANGUAGE
    } else if (args[1] === "NO") {
      if (lang[msg.author.id] === "NO") return msg.channel.send("Det er allerede på norsk... 😂");
      else {
        msg.channel.send("Bra valg, jeg elsker dette språket og dette landet, men det er bare personlig! Ok, det er endret. 😉")
        lang[msg.author.id] = "NO"
        fs.writeFile("./configuration/lang.json", JSON.stringify(lang), err => {
          if (err) throw err;
        });
      }
    } else return msg.channel.send("I don't speak that language, sorry... 😔")
  }

  // help
  if (msg.content.toLowerCase().startsWith(prefix + "help") || msg.content.toLowerCase().startsWith(prefix + "aide") || msg.content.toLowerCase().startsWith(prefix + "hjelp")) {
    const args = msg.content.slice(prefix.length).split(' ');
    if (!args[1]) {
      if (lang[msg.author.id] === "FR") {
        msg.channel.send({
          embed: {
            color: 1146986,
            author: {
              name: msg.guild.name + " | Commande d'aide",
              icon_url: msg.guild.iconURL
            },
            title: "Cliquez ici pour accéder au site officiel",
            url: "http://google.com",
            description: "Voici la liste des catégories de Glede ! \nPour voir les commandes des catégories, tapez `" + prefix + "aide [categorie]`.\nVous pouvez aussi taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
            fields: [{
                name: emoji("722879600480223234") + " Ping",
                value: "Savez-vous comment me défier au ping-pong au moins ?\n­"
              },
              {
                name: emoji("722879600480223234") + " Administration",
                value: "Et oui, je peux vous aider à gérer votre serveur Discord !\n­"
              },
              {
                name: emoji("722879600480223234") + " Customisation",
                value: "Saviez-vous que je pouvais changer l'ambiance de votre serveur ?\n­"
              },
              {
                name: emoji("722879600480223234") + " Divers",
                value: "Toujours plus de commandes !\n­"
              }
            ],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Demande d'aide demandé par " + msg.author.tag
            }
          }
        })
      } else if (lang[msg.author.id] === "NO") {
        msg.channel.send({
          embed: {
            color: 1146986,
            author: {
              name: msg.guild.name + " | Hjelpe kommando",
              icon_url: msg.guild.iconURL
            },
            title: "Klikk her for å gå til det offisielle nettstedet",
            url: "http://google.com",
            description: "Her er listen over Gledes kategorier! \nHvis du vil se listen over kommandoer i en kategori, skriver `" + prefix + "hjelpe [kategori]`.\nDu kan også skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
            fields: [{
                name: emoji("722879600480223234") + " Ping",
                value: "Vet du selv hvordan du i det minste skal utfordre meg til bordtennis?\n­"
              },
              {
                name: emoji("722879600480223234") + " Administrasjon",
                value: "Og ja, jeg kan hjelpe deg med å administrere serveren din!\n­"
              },
              {
                name: emoji("722879600480223234") + " Tilpasning",
                value: "Visste du at jeg kunne endre stemningen på serveren din?\n­"
              },
              {
                name: emoji("722879600480223234") + " Diverse",
                value: "For alltid flere kommandoer!\n­"
              }
            ],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Hjelpe kommando forespurt av " + msg.author.tag
            }
          }
        })
      } else {
        msg.channel.send({
          embed: {
            color: 1146986,
            author: {
              name: msg.guild.name + " | Help command",
              icon_url: msg.guild.iconURL
            },
            title: "Click here to go to the official website",
            url: "http://google.com",
            description: "Here is the list of Glede's categories! \nTo see the list of commands in a category, type `" + prefix + "help [category]`.\nYou can also type `" + prefix + "help language` to find out how to change my language.\n­",
            fields: [{
                name: emoji("722879600480223234") + " Ping",
                value: "Do you even know how to challenge me to ping-pong at least?\n­"
              },
              {
                name: emoji("722879600480223234") + " Administration",
                value: "And yes, I can help you manage your server!\n­"
              },
              {
                name: emoji("722879600480223234") + " Customization",
                value: "Did you know I could change the mood of your server?\n­"
              },
              {
                name: emoji("722879600480223234") + " Misc",
                value: "For always more commands!\n­"
              }
            ],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Help command requested by " + msg.author.tag
            }
          }
        })
      }
    }
    // categories
    if (args[1] === "ping") {
      // ping
    } else if (args[1] === "administration" || args[1] === "administrasjon") {
      // administration
      if (lang[msg.author.id] === "FR") {
        msg.channel.send({
          embed: {
            color: 1146986,
            author: {
              name: msg.guild.name + " | Commande d'aide",
              icon_url: msg.guild.iconURL
            },
            title: "Cliquez ici pour accéder au site officiel",
            url: "http://google.com",
            description: "Voici la catégorie d'administration, avec toute ses commandes ! \nPour avoir la détaille d'une commande, tapez `" + prefix + "aide [commande]`.\nVous pouvez aussi taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
            fields: [{
                name: prefix + "ban @[utilisateur]",
                value: "Permet de bannir l'utilisateur.\n­"
              },
              {
                name: prefix + "exclure @[utilisateur]",
                value: "Permet d'exclure l'utilisateur.\n­"
              }
            ],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Commande d'aide demandé par " + msg.author.tag
            }
          }
        })
      } else if (lang[msg.author.id] === "NO") {
        msg.channel.send({
          embed: {
            color: 1146986,
            author: {
              name: msg.guild.name + " | Hjelpe kommando",
              icon_url: msg.guild.iconURL
            },
            title: "Klikk her for å gå til det offisielle nettstedet",
            url: "http://google.com",
            description: "Her er listen over Gledes kategorier! \nHvis du vil se listen over kommandoer i en kategori, skriver `" + prefix + "hjelpe [kategori]`.\nDu kan også skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
            fields: [{
                name: emoji("722879600480223234") + " Ping",
                value: "Vet du selv hvordan du i det minste skal utfordre meg til bordtennis?\n­"
              },
              {
                name: emoji("722879600480223234") + " Administrasjon",
                value: "Og ja, jeg kan hjelpe deg med å administrere serveren din!\n­"
              },
              {
                name: emoji("722879600480223234") + " Tilpasning",
                value: "Visste du at jeg kunne endre stemningen på serveren din?\n­"
              },
              {
                name: emoji("722879600480223234") + " Diverse",
                value: "For alltid flere kommandoer!\n­"
              }
            ],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Hjelpe kommando forespurt av " + msg.author.tag
            }
          }
        })
      } else {
        msg.channel.send({
          embed: {
            color: 1146986,
            author: {
              name: msg.guild.name + " | Help command",
              icon_url: msg.guild.iconURL
            },
            title: "Click here to go to the official website",
            url: "http://google.com",
            description: "Here is the list of Glede's categories! \nTo see the list of commands in a category, type `" + prefix + "help [category]`.\nYou can also type `" + prefix + "help language` to find out how to change my language.\n­",
            fields: [{
                name: emoji("722879600480223234") + " Ping",
                value: "Do you even know how to challenge me to ping-pong at least?\n­"
              },
              {
                name: emoji("722879600480223234") + " Administration",
                value: "And yes, I can help you manage your server!\n­"
              },
              {
                name: emoji("722879600480223234") + " Customization",
                value: "Did you know I could change the mood of your server?\n­"
              },
              {
                name: emoji("722879600480223234") + " Misc",
                value: "For always more commands!\n­"
              }
            ],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Help command requested by " + msg.author.tag
            }
          }
        })
      }
      // ping help commands
    } else if (args[1] === "ping") {
      // ping is also a command without prefix for start...
      // administration help commands
      // custom help commands
    } else if (args[1] === "prefix" || args[1] === "préfix" || args[1] === "prefiks") {
      if (lang[msg.author.id] === "FR") {
        msg.channel.send({
          embed: {
            color: 2067276,
            author: {
              name: msg.guild.name + " | Commande d'aide",
              icon_url: msg.guild.iconURL
            },
            fields: [{
              name: prefix + "préfix",
              value: "Permet de changer le préfix en faisant `­" + prefix + "préfix [nouveau préfix]`\nIl faut avoir la permission d'administrateur pour effectuer cette commande !\n­"
            }],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Comamande d'aide demandé par " + msg.author.tag
            }
          }
        })
      } else if (lang[msg.author.id] === "NO") {
        msg.channel.send({
          embed: {
            color: 2067276,
            author: {
              name: msg.guild.name + " | Hjelp kommando",
              icon_url: msg.guild.iconURL
            },
            fields: [{
              name: prefix + "préfix",
              value: "Lar deg endre prefikset ved å gjøre `­" + prefix + "prefiks [nytt prefiks]`\nAdministrator tillatelse er nødvendig for å utføre denne kommandoen !\n­"
            }],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Hjelpe kommando forespurt av " + msg.author.tag
            }
          }
        })
      } else {
        msg.channel.send({
          embed: {
            color: 2067276,
            author: {
              name: msg.guild.name + " | Help command",
              icon_url: msg.guild.iconURL
            },
            fields: [{
              name: prefix + "préfix",
              value: "Allows you to change the prefix by doing `­" + prefix + "prefix [new prefix]`\nAdministrator permission is required to perform this command !\n­"
            }],
            timestamp: gledeversion,
            footer: {
              icon_url: msg.author.avatarURL,
              text: "Help command requested by " + msg.author.tag
            }
          }
        })
      }

    }
  };
  // help command end!

  // customization commands
  // custom prefix
  if (msg.content.toLowerCase().startsWith(prefix + "prefix")) {
    if (msg.member.permissions.has('ADMINISTRATOR')) {
      const args = msg.content.slice(prefix.length).split(' ');
      if (!args[1]) {
        msg.channel.send("Type `" + prefix + "help prefix` for more help on this command.")
      } else {
        customprefix[msg.guild.id] = args[1]
        fs.writeFile("./configuration/prefix.json", JSON.stringify(customprefix), err => {
          if (err) throw err;
        });
        if (lang[msg.author.id] === "FR") return msg.channel.send("Parfait, j'ai changé votre préfix en `" + args[1] + "`. 👍")
        else if (lang[msg.author.id] === "NO") return msg.channel.send("Perfect, I changed your prefix to `" + args[1] + "`. 👍")
        else return msg.channel.send("Perfekt, jeg endret prefikset ditt til `" + args[1] + "`. 👍");
      }
    } else if (lang[msg.author.id] === "FR") return msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande...");
    else if (lang[msg.author.id] === "NO") return msg.channel.send("Du har ikke tillatelse til å bruke denne kommandoen...");
    else return msg.channel.send("You do not have permission to use this command...");
  }


  // vote channels
  if (msg.content.toLowerCase() === (prefix + "channel vote") || msg.content.toLowerCase() === (prefix + "salon vote") || msg.content.toLowerCase() === (prefix + "kanal stemme")) {
    if (msg.member.permissions.has('ADMINISTRATOR')) {
      // default go on
      if (!vote[msg.channel.id]) {
        vote[msg.channel.id] = 1
        fs.writeFile("./configuration/vote.json", JSON.stringify(vote), err => {
          if (err) throw err;
        });
        if (lang[msg.author.id] === "FR") return msg.channel.send("Très bien, le salon est maintenant un salon de vote. 👍");
        else if (lang[msg.author.id] === "NO") return msg.channel.send("Ok, kanalen er nå en kanal for å stemme. 👍");
        else return msg.channel.send("All right, the channel is now a voting channel. 👍");
        // go on
      } else if (vote[msg.channel.id] === 0) {
        vote[msg.channel.id] = 1
        fs.writeFile("./configuration/vote.json", JSON.stringify(vote), err => {
          if (err) throw err;
        });
        if (lang[msg.author.id] === "FR") return msg.channel.send("Très bien, le salon est maintenant un salon de vote. 👍");
        else if (lang[msg.author.id] === "NO") return msg.channel.send("Ok, kanalen er nå en kanal for å stemme. 👍");
        else return msg.channel.send("All right, the channel is now a voting channel. 👍");
        // go off
      } else {
        vote[msg.channel.id] = 0
        fs.writeFile("./configuration/vote.json", JSON.stringify(vote), err => {
          if (err) throw err;
        });
        if (lang[msg.author.id] === "FR") return msg.channel.send("Très bien, le salon n'est plus un salon de vote. 👍");
        else if (lang[msg.author.id] === "NO") return msg.channel.send("Ok, kanalen er ikke lenger en kanal for å stemme. 👍");
        else return msg.channel.send("All right, the channel is no longer a voting channel. 👍");
      }
    } else if (lang[msg.author.id] === "FR") return msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande...");
    else if (lang[msg.author.id] === "NO") return msg.channel.send("Du har ikke tillatelse til å bruke denne kommandoen...");
    else return msg.channel.send("You do not have permission to use this command...");
  };
  // vote effects
  if (vote[msg.channel.id] === 1) {
    msg.react("723131377406574622")
    msg.react("723133008198238218")
  };



  // misc commands
  // invite
  if (msg.content.toLowerCase() === (prefix + "invite") || msg.content.toLowerCase() === (prefix + "invitation") || msg.content.toLowerCase() === (prefix + "invitere") || msg.content.toLowerCase() === (prefix + "invitasjon")) {
    if (lang[msg.author.id] === "FR") return msg.channel.send("Vous pouvez m'inviter sur votre serveur en cliquant ici : https://discord.com/oauth2/authorize?client_id=685838029209862154&permissions=473001191&scope=bot");
    else if (lang[msg.author.id] === "NO") return msg.channel.send("Du kan invitere meg på serveren din ved å klikke her: https://discord.com/oauth2/authorize?client_id=685838029209862154&permissions=473001191&scope=bot");
    else return msg.channel.send("You can invite me on your server by clicking here: https://discord.com/oauth2/authorize?client_id=685838029209862154&permissions=473001191&scope=bot");
  }


  // ping commands
  // ping
  if (msg.content.toLowerCase() === ("ping")) {
    if (!ping[msg.author.id]) {
      if (lang[msg.author.id] === "FR") return msg.channel.send("Merci de faire la commande `" + prefix + "inventaire` avant.")
      if (lang[msg.author.id] === "NO") return msg.channel.send("Du må gjøre kommandoen `" + prefix + "inventar` før det.")
      else return msg.channel.send("You have to do the command `" + prefix + "inventory` before that.")
    } else {
      msg.react('🏓');
      const filter = (reaction, user) => {
        return ['🏓'].includes(reaction.emoji.name) && user.id === msg.author.id;
      };
      msg.awaitReactions(filter, {
          max: 1,
          time: 5000,
          errors: ['time']
        })
        .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.name === '🏓') {
            if (ping[msg.author.id].Energy > 0) {
              // ping game
              if (ping[msg.author.id].Sneakers === 1) {
                // (win chance === Lvl 1)
                figure = Math.floor(Math.random() * 9 + 1); // * (max-min) + min (1 <-> 10 in this case)
                figure = 1;
                if (figure === 1) {
                  msg.channel.send({
                      embed: {
                        color: 2067276,
                        author: {
                          name: msg.guild.name + " | Partie de ping-pong",
                          icon_url: msg.author.avatarURL
                        },
                        fields: [{
                          name: "­",
                          value: "Vous avez osé me défier !"
                        }]
                      }
                    })
                    .then((sentMsg) => {
                      sentMsg.edit({
                        embed: {
                          color: 2067276,
                          author: {
                            name: msg.guild.name + " | Partie de ping-pong",
                            icon_url: msg.author.avatarURL
                          },
                          image: {
                            url: "https://cdn.pixabay.com/photo/2012/04/24/18/18/table-40793_960_720.png"
                          },
                          fields: [{
                            name: "­",
                            value: "Eh, vous avez bien perdu là ! Il n'y a pas plus bas..."
                          }, {
                            name: "Score:",
                            value: "0-13"
                          }]
                        }
                      });
                    });
                }
              } //else if figure === 2
            } else {
              if (lang[msg.author.id] === "FR") return msg.channel.send("Vous n'avez plus d'énergie... Récoltez les récompenses chaque heure et chaque jour pour être plus motivé.")
              if (lang[msg.author.id] === "NO") return msg.channel.send("Du har ingen energi igjen ... Samle belønningen hver time og dag for å få mer motivasjon.")
              else return msg.channel.send("You have no energy left... Collect the rewards every hour and day to get more motivation.")
            }
          }
        }).catch(collected => {
          msg.reply("mais... Tu ne l'as même pas frappé... 😂")
          msg.react("👎")
        });
    }
  }
  // inventory
  if (msg.content.toLowerCase() === (prefix + "i") || msg.content.toLowerCase() === (prefix + "inv") || msg.content.toLowerCase() === (prefix + "inventory") || msg.content.toLowerCase() === (prefix + "inventaire") || msg.content.toLowerCase() === (prefix + "inventar")) {
    if (!ping[msg.author.id]) {
      ping[msg.author.id] = {
        Wins: 0,
        XP: 0,
        Level: 0,
        Energy: 2,
        Force: 0,
        Intelligence: 0,

        Camera: 1,
        Glasses: 1,
        Wristband: 1,
        Shirt: 1,
        Short: 1,
        Sneakers: 1,

        Wallet: 25,
        Reputation: 0,
        Fanclub: 0
      }
      fs.writeFile("./configuration/ping.json", JSON.stringify(ping), err => {
        if (err) throw err;
      });
      if (lang[msg.author.id] === "FR") return msg.channel.send("Votre compte vient d'être enregistré, vous pouvez dès maintenant jouer !");
      else if (lang[msg.author.id] === "NO") return msg.channel.send("Kontoen din er nettopp registrert, du kan spille nå!");
      else return msg.channel.send("Your account has been registered, you can play now!");
    } else {
      if (lang[msg.author.id] === "FR") {
        msg.channel.send({
          embed: {
            color: 7162111,
            author: {
              name: "Inventaire de " + msg.author.username,
              icon_url: msg.author.avatarURL
            },
            fields: [{
              name: emoji("724285532682715136") + " Parties gagnés",
              value: ping[msg.author.id].Wins,
              inline: true
            }, {
              name: emoji("724288225421557809") + " Niveau",
              value: ping[msg.author.id].Level,
              inline: true
            }, {
              name: emoji("724288259668312134") + " Expérience",
              value: ping[msg.author.id].XP,
              inline: true
            }, {
              name: emoji("724288441952632832") + " Energie",
              value: ping[msg.author.id].Energy + "\n­",
              inline: true
            }, {
              name: emoji("724288663500095639") + " Force",
              value: ping[msg.author.id].Force + "\n­",
              inline: true
            }, {
              name: emoji("724288875056463873") + " Intelligence",
              value: ping[msg.author.id].Intelligence + "\n­",
              inline: true
            }, {
              name: emoji("724291843470131292") + " Caméra",
              value: "Niveau " + ping[msg.author.id].Camera,
              inline: true
            }, {
              name: emoji("724292115223543888") + " Lunettes",
              value: "Niveau " + ping[msg.author.id].Glasses,
              inline: true
            }, {
              name: emoji("724293094463504434") + " Bracelet de sport",
              value: "Niveau " + ping[msg.author.id].Wristband,
              inline: true
            }, {
              name: emoji("724292288175669318") + " Maillot",
              value: "Niveau " + ping[msg.author.id].Shirt,
              inline: true
            }, {
              name: emoji("724299854955806734") + " Pantalon court",
              value: "Niveau " + ping[msg.author.id].Short,
              inline: true
            }, {
              name: emoji("724293426979405844") + " Baskets",
              value: "Niveau " + ping[msg.author.id].Sneakers + "\n­",
              inline: true
            }, {
              name: emoji("724293555794870293") + " Portefeuille",
              value: "Vous avez " + ping[msg.author.id].Wallet + "€ sur votre compte."
            }, {
              name: emoji("724293728797458443") + " Réputation",
              value: "Vous avez " + ping[msg.author.id].Reputation + " point(s) de réputation."
            }, {
              name: emoji("724294057479897149") + " Club de supporters",
              value: "Il y a " + ping[msg.author.id].Fanclub + " club(s) de supporters pour vous."
            }]
          }
        })
      } else if (lang[msg.author.id] === "NO") {
        msg.channel.send({
          embed: {
            color: 7162111,
            author: {
              name: "Inventar av " + msg.author.username,
              icon_url: msg.author.avatarURL
            },
            fields: [{
              name: emoji("724285532682715136") + " Vant spill",
              value: ping[msg.author.id].Wins,
              inline: true
            }, {
              name: emoji("724288225421557809") + " Nivå",
              value: ping[msg.author.id].Level,
              inline: true
            }, {
              name: emoji("724288259668312134") + " Erfaring",
              value: ping[msg.author.id].XP,
              inline: true
            }, {
              name: emoji("724288441952632832") + " Energi",
              value: ping[msg.author.id].Energy + "\n­",
              inline: true
            }, {
              name: emoji("724288663500095639") + " Styrke",
              value: ping[msg.author.id].Force + "\n­",
              inline: true
            }, {
              name: emoji("724288875056463873") + " Intelligens",
              value: ping[msg.author.id].Intelligence + "\n­",
              inline: true
            }, {
              name: emoji("724291843470131292") + " Kamera",
              value: "Nivå " + ping[msg.author.id].Camera,
              inline: true
            }, {
              name: emoji("724292115223543888") + " Briller",
              value: "Nivå " + ping[msg.author.id].Glasses,
              inline: true
            }, {
              name: emoji("724293094463504434") + " Armbånd",
              value: "Nivå " + ping[msg.author.id].Wristband,
              inline: true
            }, {
              name: emoji("724292288175669318") + " Skjorte",
              value: "Nivå " + ping[msg.author.id].Shirt,
              inline: true
            }, {
              name: emoji("724299854955806734") + " Short",
              value: "Nivå " + ping[msg.author.id].Short,
              inline: true
            }, {
              name: emoji("724293426979405844") + " Joggesko",
              value: "Nivå " + ping[msg.author.id].Sneakers + "\n­",
              inline: true
            }, {
              name: emoji("724293555794870293") + " Lommebok",
              value: "Du har " + ping[msg.author.id].Wallet + "KR på kontoen din."
            }, {
              name: emoji("724293728797458443") + " Rykte",
              value: "Du har " + ping[msg.author.id].Reputation + " omdømme poeng."
            }, {
              name: emoji("724294057479897149") + " Fan Klubb",
              value: "Det er " + ping[msg.author.id].Fanclub + " fan klubb for deg."
            }]
          }
        })
      } else {
        msg.channel.send({
          embed: {
            color: 7162111,
            author: {
              name: "Inventory of " + msg.author.username,
              icon_url: msg.author.avatarURL
            },
            fields: [{
              name: emoji("724285532682715136") + " Won games",
              value: ping[msg.author.id].Wins,
              inline: true
            }, {
              name: emoji("724288225421557809") + " Level",
              value: ping[msg.author.id].Level,
              inline: true
            }, {
              name: emoji("724288259668312134") + " Experience",
              value: ping[msg.author.id].XP,
              inline: true
            }, {
              name: emoji("724288441952632832") + " Energy",
              value: ping[msg.author.id].Energy + "\n­",
              inline: true
            }, {
              name: emoji("724288663500095639") + " Strength",
              value: ping[msg.author.id].Force + "\n­",
              inline: true
            }, {
              name: emoji("724288875056463873") + " Intelligence",
              value: ping[msg.author.id].Intelligence + "\n­",
              inline: true
            }, {
              name: emoji("724291843470131292") + " Camera",
              value: "Level " + ping[msg.author.id].Camera,
              inline: true
            }, {
              name: emoji("724292115223543888") + " Glasses",
              value: "Level " + ping[msg.author.id].Glasses,
              inline: true
            }, {
              name: emoji("724293094463504434") + " Wristband",
              value: "Level " + ping[msg.author.id].Wristband,
              inline: true
            }, {
              name: emoji("724292288175669318") + " Shirt",
              value: "Level " + ping[msg.author.id].Shirt,
              inline: true
            }, {
              name: emoji("724299854955806734") + " Short",
              value: "Level " + ping[msg.author.id].Short,
              inline: true
            }, {
              name: emoji("724293426979405844") + " Sneakers",
              value: "Level " + ping[msg.author.id].Sneakers + "\n­",
              inline: true
            }, {
              name: emoji("724293555794870293") + " Wallet",
              value: "You have " + ping[msg.author.id].Wallet + "$ on your account."
            }, {
              name: emoji("724293728797458443") + " Reputation",
              value: "You have " + ping[msg.author.id].Reputation + " reputation point(s)."
            }, {
              name: emoji("724294057479897149") + " Fan Club",
              value: "There's " + ping[msg.author.id].Fanclub + " fan club(s) for you."
            }]
          }
        })
      };
    }
  }









});

setInterval(function() {
  currentHour = new Date().getHours();
  currentMin = new Date().getMinutes();
}, 1000);

client.on("message", (message) => {

  if ((message.content.startsWith(baseprefix + "heure"))) {
    currentHour = new Date().getHours();
    currentMin = new Date().getMinutes();
    if (currentMin < 10) {
      message.channel.send("Il est actuellement " + currentHour + "h0" + currentMin + " " + message.author + " !");
    } else {
      message.channel.send("Il est actuellement " + currentHour + "h" + currentMin + " " + message.author + " !");
    }
  }

  if ((message.content.startsWith(baseprefix + "time"))) {
    currentHour = new Date().getHours();
    currentMin = new Date().getMinutes();
    if (currentHour <= 12) {
      if (currentMin < 10) {
        message.channel.send("It is currently " + currentHour + ":0" + currentMin + " AM " + message.author + " !");
      } else {
        message.channel.send("It is currently " + currentHour + ":" + currentMin + " AM " + message.author + " !");
      }
    } else {
      currentHourEN = currentHour - 12
      if (currentMin < 10) {
        message.channel.send("It is currently " + currentHourEN + ":0" + currentMin + " PM " + message.author + " !");
      } else {
        message.channel.send("It is currently " + currentHourEN + ":" + currentMin + " PM " + message.author + " !");
      }
    }
  }
});
/*
//ROLE REACTION
client.on('raw', event => {
    const eventName = event.t;
    if (eventName === 'MESSAGE_REACTION_ADD') {
        //CHANGER L'ID DU COUP MDR
        if (event.d.message_id === '709065388662456352') {
            var reactionChannel = client.channels.get(event.d.channel_id);
            if (reactionChannel.messages.has(event.d.message_id))
                return;
            else {
                reactionChannel.fetchMessage(event.d.message_id)
                    .then(msg => {
                        var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                        var user = client.users.get(event.d.user_id);
                        client.emit('messageReactionAdd', msgReaction, user);
                    }).catch(err => console.log(err));
            }

        }
    }
})

//ROLE REACTION
client.on('messageReactionAdd', (messageReaction, user) => {

    var roleName = messageReaction.emoji.name;
    var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === role.name.toLowerCase());

    if (role) {
        var member = messageReaction.message.guild.members.find(member => member.id === user.id);
        if (member) {
            if (messageReaction.message.channel.id === "709065363027001425") {
                member.addRole("709040764281421856");
            } else {
                member.addRole(role.id);
            }

        }
    }

})
*/

//FICHIER JSON GUILDS
client.on('message', msg => {

  if (msg.author.bot)
    return;

  if (!guildconfig[msg.channel.id]) {
    guildconfig[msg.channel.id] = {
      RoleReaction: 0
    }
    fs.writeFile("./configuration/guilds.json", JSON.stringify(guildconfig), err => {
      if (err) throw err;
    });
  };


  if (msg.content === (baseprefix + "rolereaction on") || msg.content === (baseprefix + "RoleReaction on") || msg.content === (baseprefix + "Rolereaction on")) {
    if (guildconfig[msg.channel.id].RoleReaction === 0) {
      guildconfig[msg.channel.id] = {
        RoleReaction: 1
      }
      fs.writeFile("./configuration/guilds.json", JSON.stringify(guildconfig), err => {
        if (err) throw err;
      });
      msg.channel.send("RoleReaction désormais activé dans ce salon. ✅")
    } else {
      msg.channel.send("C'est déjà fait, pour le désactiver faites `" + baseprefix + "rolereaction off`.");
    }
  }

  if (msg.content === (baseprefix + "rolereaction off")) {
    if (guildconfig[msg.channel.id].RoleReaction === 0) {
      msg.channel.send("Vous n'avez même pas encore activé l'AutoRole. Faites `" + baseprefix + "autorole on` pour l'activer.")
    } else {
      guildconfig[msg.channel.id] = {
        RoleReaction: 0
      }
      fs.writeFile("./configuration/guilds.json", JSON.stringify(guildconfig), err => {
        if (err) throw err;
      });
      msg.channel.send("Très bien, le RoleReaction a été enlevé de ce salon.")
    }

  }

  if (msg.content === (baseprefix + "rolereaction")) {
    if (!guildconfig[msg.channel.id].RoleReaction) {
      msg.channel.send("Tapez `" + baseprefix + "help rolereaction` pour avoir plus d'aide sur la commande.\nCe salon à la fonction RoleReaction désactivée.")
    } else {
      msg.channel.send("Tapez `" + baseprefix + "help rolereaction` pour avoir plus d'aide sur la commande.\nCe salon à la fonction RoleReaction activée.")
    }
  }

})

client.login(config.token)
