import { writable } from "svelte/store";

const createChannelStore = function () {
  const channels = writable<string[]>([]);

  const addChannel = (input) => {
    const parsed = input.includes("twitch.tv")
      ? new URL(input).pathname.slice(1)
      : input.trim();

    channels.update((cs) => {
      if (parsed && !cs.includes(parsed)) {
        return [...cs, parsed];
      }
      return cs;
    });
  };

  const deleteChannel = (channel) =>
    channels.update((cs) => cs.filter((c) => c !== channel));

  const viewChannel = (channel) => channel;

  return {
    subscribe: channels.subscribe,
    addChannel,
    deleteChannel,
    viewChannel,
  };
};

export const channels = createChannelStore();
