const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, Permissions, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('This command unbans a user!')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option =>option.setName('userid').setDescription('The ID of the user you want to unban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for unbanning this user')),

    async execute(interaction) {
        const {channel, options} = interaction;

        const userId = interaction.options.getString('userid');

        try{ 

            const user = userId
            await interaction.guild.members.unban(user);

            const embed = new EmbedBuilder()
            .setDescription(`${userId} was successfully unbanned.`)
            .setColor('Red');

            await interaction.reply({
                embeds: [embed],
            });
        } catch(err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Please provide a valid member ID.`)
                .setColor('Red')

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}
