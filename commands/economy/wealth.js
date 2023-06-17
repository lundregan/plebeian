const fs = require('fs');
const path = require('path');

const { SlashCommandBuilder } = require('discord.js');
const { get } = require('http');

const Database = require('../../Database.js');
const database = Database.getInstance();

const getUserWealth = async (user) => {
    let userEntry = await database.getUser(user);

    return userEntry.crypto;
}


module.exports = {
    cooldown: '10',
    data: new SlashCommandBuilder()
        .setName('wealth')
        .setDescription('Gets a users wealth.')
        .addUserOption(option => option.setName('user').setDescription("who's wealth do you wish to perv on?").setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('user');

        let wealth = await getUserWealth(user);

        await interaction.reply(`${user.username} has ₿${wealth}`);
    },
};