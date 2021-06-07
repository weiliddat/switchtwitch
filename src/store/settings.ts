import { writable } from "svelte/store";

export interface SettingsInterface {
  usePreview: boolean;
  loadChat: boolean;
  reducedAnimations: boolean;
  qualitySidebar: Qualities;
  qualityPreview: Qualities;
  qualityMain: Qualities;
}

export enum Qualities {
  "160p" = "160p",
  "360p" = "360p",
  "480p" = "480p",
  "720p60" = "720p60",
  "source" = "chunked",
  "auto" = "auto",
}

export const qualities = Object.keys(Qualities).map((label) => ({
  label,
  value: Qualities[label],
}));

const defaultSettings: SettingsInterface = {
  usePreview: true,
  loadChat: false,
  reducedAnimations: false,
  qualitySidebar: Qualities["360p"],
  qualityPreview: Qualities["480p"],
  qualityMain: Qualities.source,
};

const loadSettings = () => {
  const data: SettingsInterface = { ...defaultSettings };

  data.usePreview =
    localStorage.getItem("usePreview") !== null
      ? localStorage.getItem("usePreview") === "true"
      : defaultSettings.usePreview;

  data.loadChat =
    localStorage.getItem("loadChat") !== null
      ? localStorage.getItem("loadChat") === "true"
      : defaultSettings.loadChat;

  data.reducedAnimations =
    localStorage.getItem("reducedAnimations") !== null
      ? localStorage.getItem("reducedAnimations") === "true"
      : defaultSettings.reducedAnimations;

  data.qualitySidebar =
    (localStorage.getItem("qualitySidebar") as Qualities) ??
    defaultSettings.qualitySidebar;

  data.qualityPreview =
    (localStorage.getItem("qualityPreview") as Qualities) ??
    defaultSettings.qualityPreview;

  data.qualityMain =
    (localStorage.getItem("qualityMain") as Qualities) ??
    defaultSettings.qualityMain;

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
