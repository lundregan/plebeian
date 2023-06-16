const fs = require('fs');
const path = require('path');

const { SlashCommandBuilder } = require('discord.js');
const { get } = require('http');
const { listenerCount } = require('events');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data.json')));

const getKillsForEachUser = () => {
    let resultArray = [];

    for (const [key, value] of Object.entries(data)) {
        let kills = 0;

        let killsObject = value.kills;

        for (const [key, value] of Object.entries(killsObject)) {
            kills += value;
        }

        resultArray.push(`${key} has committed ${kills} warcrimes.`);
    }

    return resultArray.join('\n');
}

module.exports = {
    cooldown: '10',
    data: new SlashCommandBuilder()
        .setName('tk-list')
        .setDescription('See who committed the most anne franks...'),
    async execute(interaction) {
        let list = getKillsForEachUser();

        await interaction.reply(list);
    },
};