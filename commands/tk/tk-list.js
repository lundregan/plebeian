const fs = require('fs');
const path = require('path');

const { SlashCommandBuilder } = require('discord.js');
const { get } = require('http');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data.json')));

const getList = () => {
    data.array.forEach(person => {
        console.log(``)
    });
}

module.exports = {
    cooldown: '10',
    data: new SlashCommandBuilder()
        .setName('tk-list')
        .setDescription('Lists everyones current TKs'),
    async execute(interaction) {
        await interaction.reply(`${abuser} has killed you ${kills} times.`);
    },
};