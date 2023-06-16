const fs = require('fs');
const path = require('path');

const { SlashCommandBuilder } = require('discord.js');
const { get } = require('http');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data.json')));

const addKill = (victim, abuser) => {
    let victimId = victim.id;
    let abuserId = abuser.id;

    if (!data[abuserId]) {
        data[abuserId] = {
            kills: {}
        };
    }

    if (data[abuserId].kills[victimId]) {
        data[abuserId].kills[victimId] += 1;
    } else {
        data[abuserId].kills[victimId] = 1;
    }

    try {
        fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(data));

        return data[abuserId].kills[victimId];
    } catch (error) {
        console.error(error);
        return 'Unknown'
    }
}

const getKills = (userId) => {
    if (data[userId]) {
        return data[userId];
    } else {
        return 0;
    }
}

module.exports = {
    cooldown: '10',
    data: new SlashCommandBuilder()
        .setName('tk')
        .setDescription('Addes a kill to the user who teamkilled you.')
        .addUserOption(option => option.setName('abuser').setDescription('Who perpetrated the warcrime?').setRequired(true)),
    async execute(interaction) {
        let abuser = interaction.options.getUser('abuser');
        let victim = interaction.user;

        let kills = addKill(victim, abuser);

        if (victim.id === abuser.id) {
            return await interaction.reply(`${victim} has kurt cobained ${kills} times.`);
        }

        await interaction.reply(`${abuser} has killed you ${kills} times.`);
    },
};