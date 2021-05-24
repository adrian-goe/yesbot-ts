import {
  Client,
  Guild,
  Channel,
  GuildChannel,
  TextChannel,
  User,
  GuildMember,
  Message,
  MessageReaction,
  GuildManager,
  ChannelManager,
} from "discord.js";

export default class MockDiscord {
  private client!: Client;
  private guild!: Guild;
  private channel!: Channel;
  private guildChannel!: GuildChannel;
  private textChannel!: TextChannel;
  private user!: User;
  private guildMember!: GuildMember;
  private message!: Message;
  private messageReaction!: MessageReaction;
  private guildManager!: GuildManager;
  private channelManager!: ChannelManager;

  constructor() {
    this.mockClient();
    this.mockGuild();
    this.mockChannel();
    this.mockGuildChannel();
    this.mockTextChannel();
    this.mockUser();
    this.mockGuildMember();
    this.addMember();
    this.mockMessage();
    this.mockMessageReaction();
    this.mockGuildManager();
    this.mockChannelManager();
    this.mockChannel();
  }

  private addMember = () => {
    this.guild
      .addMember(this.user, { accessToken: "mockAccessToken" })
      .then((r) => r);
  };

  public getClient(): Client {
    return this.client;
  }

  public getGuild(): Guild {
    return this.guild;
  }

  public getChannel(): Channel {
    return this.channel;
  }

  public getGuildChannel(): GuildChannel {
    return this.guildChannel;
  }

  public getTextChannel(): TextChannel {
    return this.textChannel;
  }

  public getUser(): User {
    return this.user;
  }

  public getGuildMember(): GuildMember {
    return this.guildMember;
  }

  public getMessage(): Message {
    return this.message;
  }

  public getMessageReaction(): MessageReaction {
    return this.messageReaction;
  }

  public getGuildManager(): GuildManager {
    return this.guildManager;
  }

  private mockClient(): void {
    this.client = new Client();
    this.client.users.fetch = jest.fn(() => Promise.resolve(this.getUser()));
    this.client.login = jest.fn(() => Promise.resolve("LOGIN_TOKEN"));
    this.client.token = process.env.BOT_TOKEN;
    this.client.guilds = this.guildManager;
    this.client.channels.resolve = jest.fn(() => {
      return this.channel;
    });
  }

  private mockGuild(): void {
    this.guild = new Guild(this.client, {
      unavailable: false,
      id: "guild-id",
      name: "mocked js guild",
      icon: "mocked guild icon url",
      splash: "mocked guild splash url",
      region: "eu-west",
      member_count: 42,
      large: false,
      features: [],
      application_id: "application-id",
      afkTimeout: 1000,
      afk_channel_id: "afk-channel-id",
      system_channel_id: "system-channel-id",
      embed_enabled: true,
      verification_level: 2,
      explicit_content_filter: 3,
      mfa_level: 8,
      joined_at: new Date("2018-01-01").getTime(),
      owner_id: "owner-id",
      channels: [],
      roles: [],
      presences: [],
      voice_states: [],
      emojis: [],
    });
  }

  private mockGuildManager(): void {
    this.guildManager = new GuildManager(this.client);

    this.guildManager.resolve = jest.fn(() => this.guild);
  }

  private mockChannel(): void {
    this.channel = new Channel(this.client, {
      id: "channel-id",
    });
  }

  private mockGuildChannel(): void {
    this.guildChannel = new GuildChannel(this.guild, {
      ...this.channel,

      name: "guild-channel",
      position: 1,
      parent_id: "123456789",
      permission_overwrites: [],
    });
  }

  private mockTextChannel(): void {
    this.textChannel = new TextChannel(this.guild, {
      ...this.guildChannel,

      topic: "topic",
      nsfw: false,
      last_message_id: "123456789",
      lastPinTimestamp: new Date("2019-01-01").getTime(),
      rate_limit_per_user: 0,
    });
    this.textChannel.send = jest.fn();
  }

  private mockUser(): void {
    this.user = new User(this.client, {
      id: "222222222222222200",
      username: "user username",
      discriminator: "user#0000",
      avatar: "user avatar url",
      bot: false,
    });
  }

  private mockGuildMember(): void {
    this.guildMember = new GuildMember(
      this.client,
      {
        deaf: false,
        mute: false,
        self_mute: false,
        self_deaf: false,
        session_id: "session-id",
        channel_id: "channel-id",
        nick: "nick",
        joined_at: new Date("2020-01-01").getTime(),
        user: this.user,
        roles: [],
      },
      this.guild
    );
    this.getGuildMember().setNickname = jest.fn(() =>
      Promise.resolve(this.guildMember)
    );
  }

  private mockMessage(): void {
    this.message = new Message(
      this.client,
      {
        id: "message-id",
        type: "DEFAULT",
        content: "this is the message content",
        author: this.user,
        webhook_id: null,
        member: this.guildMember,
        pinned: false,
        tts: false,
        nonce: "nonce",
        embeds: [],
        attachments: [],
        edited_timestamp: null,
        reactions: [],
        mentions: [],
        mention_roles: [],
        mention_everyone: [],
        hit: false,
      },
      this.textChannel
    );
  }

  private mockMessageReaction(): void {
    this.messageReaction = new MessageReaction(
      this.client,
      {
        id: "messageReaction-id",
        author: this.user,
        count: 1,
        me: true,
        emoji: "🥰",
      },
      this.message
    );
  }

  private mockChannelManager(): void {
    this.channelManager = new ChannelManager(this.client, []);
    this.channelManager.fetch = jest.fn(() =>
      Promise.resolve(this.textChannel)
    );
  }
}
