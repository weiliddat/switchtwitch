import { tick } from "svelte";
import { writable } from "svelte/store";
import { flip } from "../utils/flip";
import { settings as settingsStore, SettingsInterface } from "./settings";

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

const createChannelStore = function () {
  let settings: SettingsInterface;

  const settingsUnsubscribe = settingsStore.subscribe((s) => (settings = s));

  const defaultChannelOptions = {
    playerWrapper: null,
    embed: null,
    viewIntent: false,
    deleteIntent: false,
    onMainPlayer: false,
    quality: settings.qualitySidebar,
    muted: true,
    playing: false,
  };

  const hash = window.location.hash;
  const prevChannels = hash
    .slice(1)
    .split(",")
    .filter((c) => c)
    .map((name) => ({ name, ...defaultChannelOptions }));

  const channelStore = writable<ChannelInterface[]>(
    prevChannels,
    () => () => settingsUnsubscribe(),
  );

  const addChannel = (input) => {
    const parsed: string = input.includes("twitch.tv")
      ? new URL(input).pathname.replace(/\//g, "")
      : input.trim();

    channelStore.update((cs) => {
      if (parsed && !cs.find((c) => c.name === parsed)) {
        const channels = [...cs, { name: parsed, ...defaultChannelOptions }];
        const channelHash = channels.map((c) => c.name).join(",");
        window.history.pushState(
          { channel: parsed },
          parsed,
          `#${channelHash}`,
        );
        return channels;
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
          channel: channel.name,
          layout: "video",
        };

        channel.embed = new Twitch.Embed(`channel-${channel.name}`, options);

        channel.embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
          const player = channel.embed.getPlayer();

          console.log(player.getQualities());

          player.setQuality(settings.qualitySidebar);
          player.setVolume(0.5);
        });

        channel.embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {
          console.log(channel.embed.getPlayer().getQualities());
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

      const run = async () => {
        if (settings.usePreview) {
          channel.viewIntent = true;
        }

        channel.embed.getPlayer().setQuality(settings.qualityPreview);
        channel.embed.getPlayer().setMuted(false);

        await tick();
      };

      if (channel && channel.playerWrapper) {
        if (!settings.reducedAnimations) {
          flip(channel.playerWrapper, run);
        } else {
          run();
        }
      }

      return cs;
    });

  const stopPreviewingChannel = (channelName: string) =>
    channelStore.update((cs) => {
      const channel = cs.find((c) => c.name === channelName);

      const run = async () => {
        channel.viewIntent = false;
        channel.embed.getPlayer().setQuality(settings.qualitySidebar);
        channel.embed.getPlayer().setMuted(true);

        await tick();
      };

      if (channel && channel.playerWrapper) {
        if (!settings.reducedAnimations) {
          flip(channel.playerWrapper, run);
        } else {
          run();
        }
      }

      return cs;
    });

  const viewChannel = (channelName) =>
    channelStore.update((cs) => {
      const channel = cs.find((c) => c.name === channelName);

      if (channel && channel.playerWrapper) {
        cs.filter((c) => c !== channel && c.onMainPlayer).forEach((c) => {
          const run = async () => {
            c.onMainPlayer = false;
            c.viewIntent = false;

            c.embed.getPlayer().setQuality(settings.qualitySidebar);
            c.embed.getPlayer().setMuted(true);

            await tick();
          };

          if (!settings.reducedAnimations) {
            flip(channel.playerWrapper, run);
          } else {
            run();
          }
        });

        const run = async () => {
          channel.onMainPlayer = true;
          channel.embed.getPlayer().setQuality(settings.qualityMain);
          channel.embed.getPlayer().setMuted(false);

          await tick();
        };

        if (!settings.reducedAnimations) {
          flip(channel.playerWrapper, run);
        } else {
          run();
        }
      }

      return cs;
    });

  const stopViewingChannel = (channelName) =>
    channelStore.update((cs) => {
      const channel = cs.find((c) => c.name === channelName);

      if (channel && channel.playerWrapper) {
        const run = async () => {
          channel.onMainPlayer = false;

          channel.embed.getPlayer().setQuality(settings.qualityPreview);
          channel.embed.getPlayer().setMuted(true);

          await tick();
        };

        if (!settings.reducedAnimations) {
          flip(channel.playerWrapper, run);
        } else {
          run();
        }
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
