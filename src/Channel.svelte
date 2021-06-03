<script lang="ts">
  import { onMount } from "svelte";
  import debounce from "lodash/debounce";

  export let channelName = "";

  let playerWrapper: HTMLElement;
  let isPreview = false;
  let transitionMs = 400;
  let embed: Twitch.Embed;
  let initialX: number;
  let initialY: number;

  const previewChannel = () => {
    isPreview = true;

    embed.getPlayer().setQuality("720p");

    transformPlayer();
  };

  const stopPreview = () => {
    isPreview = false;

    embed.getPlayer().setQuality("160p");

    unTransformPlayer();
  };

  const transformPlayer = debounce(
    () => {
      const rect = playerWrapper.getBoundingClientRect();
      console.log(rect);
      const deltaY = window.innerHeight / 2 - rect.height / 2 - initialY;
      const deltaX = 420 + rect.width / 3;
      playerWrapper.style.transform = `matrix(1.5, 0, 0, 1.5, ${deltaX}, ${deltaY})`;
      playerWrapper.style.position = "fixed";
    },
    transitionMs * 2,
    {
      leading: true,
      trailing: false,
    },
  );

  const unTransformPlayer = () => {
    playerWrapper.style.transform = "";
    playerWrapper.style.position = "";
  };

  onMount(() => {
    const rect = playerWrapper.getBoundingClientRect();
    initialX = rect.x;
    initialY = rect.y;

    const options: Twitch.EmbedOptions = {
      width: 400,
      height: 360,
      autoplay: true,
      muted: true,
      parent: ["switchtwitch.com"],
      channel: channelName,
      layout: "video",
    };

    embed = new Twitch.Embed(`channel-${channelName}`, options);

    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
      const player = embed.getPlayer();

      player.setQuality("160p");
    });
  });
</script>

<div class="channel">
  <div
    class="channel-overlay"
    class:isPreview
    on:mouseover={previewChannel}
    on:mouseout={stopPreview}
  >
    <div class="channel-overlay-delete">
      <span class="material-icons">delete</span>
    </div>

    <div class="channel-overlay-preview">
      <span class="material-icons">visibility</span>
    </div>
  </div>

  <div
    id="channel-{channelName}"
    class="channel-player-wrapper"
    bind:this={playerWrapper}
  />
</div>

<style>
  .channel {
    flex: 0 0 1;
    width: 400px;
    height: 360px;
    margin: 5px;
    position: relative;
  }

  .channel-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    transition: opacity 0.4s;
    opacity: 0;

    background: rgba(0, 0, 0, 0.5);

    cursor: pointer;
  }

  .channel-overlay.isPreview {
    opacity: 0.8;
  }

  .channel-player-wrapper {
    transition: transform 0.4s;
  }
</style>
