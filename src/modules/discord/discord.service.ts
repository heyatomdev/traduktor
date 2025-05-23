import { Injectable, Logger } from '@nestjs/common';
import { Context, On, Once, ContextOf } from 'necord';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  EmbedBuilder,
} from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);

  public constructor(
    private readonly client: Client,
    private readonly configService: ConfigService,
  ) {}

  @Once('ready')
  public onReady(@Context() [client]: ContextOf<'ready'>) {
    client.user.setActivity(`Translating your text!`, { type: 4 });
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }

  /**
   * Send a message to a specific channel
   * @param channelId
   * @param message
   */
  public async sendMessage(channelId: string, message: string): Promise<void> {
    const channel = this.client.channels.cache.get(channelId) as any;
    if (channel) {
      await channel.send(message);
    } else {
      this.logger.error(
        `Channel with ID ${channelId} not found or is not a text channel.`,
      );
    }
  }

  /**
   * Send an embedded message to a specific channel
   * @param channelId
   * @param content
   */
  public async sendEmbedded(channelId: string, content: any): Promise<void> {
    const channel = this.client.channels.cache.get(channelId) as any;
    const bot = await this.client.users.fetch('1273993825253330996');
    const botAvatar = bot.avatarURL({ size: 256 }) || '';
    if (channel) {
      const embed = new EmbedBuilder()
        .setTitle(content.title)
        .setURL(content.url)
        .setColor(content.color)
        .setThumbnail(content.src)
        .setDescription(content.description)
        .setTimestamp()
        .addFields(
          {
            name: '🧭 Navigation',
            value:
              'Access `#daily-image` for daily drops and `#general` to connect with other observers.',
            inline: false,
          },
          {
            name: '⏰ Transmission Schedule',
            value:
              'Expect new visual data uploads around **11:00 UTC** each day.',
            inline: false,
          },
        )
        .setFooter({
          text: 'Transmission complete – Ethan 2954',
          iconURL: botAvatar,
        });

      await channel.send({ embeds: [embed] });
    } else {
      this.logger.error(
        `Channel with ID ${channelId} not found or is not a text channel.`,
      );
    }
  }

  /**
   * Send an embedded artwork message to a specific channel
   * @param channelId
   * @param content
   */
  public async sendEmbeddedArtwork(
    channelId: string,
    content: any,
  ): Promise<void> {
    const channel = this.client.channels.cache.get(channelId) as any;
    if (channel) {
      const embed = new EmbedBuilder()
        .setTitle(content.title)
        .setURL(content.url)
        .setColor(content.color)
        .setThumbnail(content.src)
        .setTimestamp()
        .setFields(content.fields)
        .setFooter(content.footer);

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel('View on DeviantArt')
          .setStyle(ButtonStyle.Link)
          .setURL(content.url),
      );

      await channel.send({ embeds: [embed], components: [row] });
    } else {
      this.logger.error(
        `Channel with ID ${channelId} not found or is not a text channel.`,
      );
    }
  }
}
