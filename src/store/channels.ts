import { tick } from "svelte";
import { writable } from "svelte/store";
import { flip } from "../utils/flip";

export interface ChannelInterface {
  name: string;
  playerWrapper: HTMLElement;
  embed: Twitch.Embed;
  viewIntent: boolean;
  deleteIntent: boolean;
  onMainPlayer: boolean;
  quality: string;
  muted: boolean;
  playing: boolean;
}

const defaultChannelOptions = {
  playerWrapper: null,
  embed: null,
  viewIntent: false,
  deleteIntent: false,
  onMainPlayer: false,
  quality: "360p",
  muted: true,
  playing: false,
};

const createChannelStore = function () {
  const channelStore = writable<ChannelInterface[]>([]);

  const addChannel = (input) => {
    const parsed: string = input.includes("twitch.tv")
      ? new URL(input).pathname.slice(1)
      : input.trim();

    channelStore.update((cs) => {
      if (parsed && !cs.find((c) => c.name === parsed)) {
        return [...cs, { name: parsed, ...defaultChannelOptions }];
      }
      return cs;
    });
  };

  const startTwitchEmbed = (channelName: string) =>
    channelStore.update((cs) => {
      const channel = cs.find((c) => c.name === channelName);

      if (channel) {
        const options: Twitch.EmbedOptions = {
          width: "100%",
          height: "100%",
          autoplay: true,
          muted: true,
          parent: ["switchtwitch.com"],
          channel: channel.name,
          layout: "video",
        };

        channel.embed = new Twitch.Embed(`channel-${channel.name}`, options);

        channel.embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
          const player = channel.embed.getPlayer();

          player.setQuality("360p");
          player.setVolume(0.5);
        });
      }

      return cs;
    });

  const updateChannel = (
    channelName: string,
    data: Partial<ChannelInterface>,
  ) =>
    channelStore.update((cs) => {
      let channel = cs.find((c) => c.name === channelName);

      if (channel) {
        for (const key in data) {
          channel[key] = data[key];
        }
      }

      return cs;
    });

  const deleteChannel = (channelName: string) =>
    channelStore.update((cs) => cs.filter((c) => c.name !== channelName));

  const previewChannel = (channelName: string) =>
    channelStore.update((cs) => {
      const channel = cs.find((c) => c.name === channelName);

      if (channel && channel.playerWrapper) {
        flip(channel.playerWrapper, async () => {
          channel.viewIntent = true;
          channel.embed.getPlayer().setQuality("480p");
          channel.embed.getPlayer().setMuted(false);

          await tick();
        });
      }

      return cs;
    });

  const stopPreviewingChannel = (channelName: string) =>
    channelStore.update((cs) => {
      const channel = cs.find((c) => c.name === channelName);

      if (channel && channel.playerWrapper) {
        flip(channel.playerWrapper, async () => {
          channel.viewIntent = false;
          channel.embed.getPlayer().setQuality("360p");
          channel.embed.getPlayer().setMuted(true);

          await tick();
        });
      }

      return cs;
    });

  const viewChannel = (channelName) =>
    channelStore.update((cs) => {
      const channel = cs.find((c) => c.name === channelName);

      if (channel && channel.playerWrapper) {
        cs.filter((c) => c !== channel && c.onMainPlayer).forEach((c) => {
          flip(c.playerWrapper, async () => {
            c.onMainPlayer = false;
            c.viewIntent = false;
            c.embed.getPlayer().setQuality("360p");
            c.embed.getPlayer().setMuted(true);

            await tick();
          });
        });

        flip(channel.playerWrapper, async () => {
          channel.onMainPlayer = true;
          channel.embed.getPlayer().setQuality("chunked");
          channel.embed.getPlayer().setMuted(false);

          await tick();
        });
      }

      return cs;
    });

  const stopViewingChannel = (channelName) =>
    channelStore.update((cs) => {
      const channel = cs.find((c) => c.name === channelName);

      if (channel && channel.playerWrapper) {
        flip(channel.playerWrapper, async () => {
          channel.onMainPlayer = false;

          channel.embed.getPlayer().setQuality("360p");
          channel.embed.getPlayer().setMuted(true);

          await tick();
        });
      }

      return cs;
    });

  return {
    subscribe: channelStore.subscribe,
    addChannel,
    updateChannel,
    startTwitchEmbed,
    deleteChannel,
    previewChannel,
    stopPreviewingChannel,
    viewChannel,
    stopViewingChannel,
  };
};

export const channels = createChannelStore();
