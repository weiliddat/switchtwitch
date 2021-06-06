import { writable } from "svelte/store";

export interface SettingsInterface {
  lastPlaylist: string;
  usePreview: boolean;
}

const defaultSettings: SettingsInterface = {
  lastPlaylist: "",
  usePreview: true,
};

const loadSettings = () => {
  const data: SettingsInterface = { ...defaultSettings };

  data.lastPlaylist =
    localStorage.getItem("lastPlaylist") ?? defaultSettings.lastPlaylist;

  data.usePreview =
    localStorage.getItem("usePreview") !== null
      ? localStorage.getItem("usePreview") === "true"
      : defaultSettings.usePreview;

  return data;
};

function createSettingsStore() {
  const settingsStore = writable<SettingsInterface>(loadSettings());

  const updateSettings = (data: Partial<SettingsInterface>) =>
    settingsStore.update((settings) => {
      for (const key in data) {
        settings[key] = data[key];
        localStorage.setItem(key, data[key]);
      }

      return settings;
    });

  return {
    subscribe: settingsStore.subscribe,
    set: updateSettings,
  };
}

export const settings = createSettingsStore();
