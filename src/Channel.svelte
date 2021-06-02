<script lang="ts">
  import { onMount } from "svelte";
  import debounce from "lodash/debounce";

  export let channelName = "";

  let playerWrapper: HTMLElement;
  let isPreview = false;
  let isPreviewing = false;
  let transitionMs = 500;
  let embed: Twitch.Embed;

  const previewChannel = () => {
    isPreview = true;
    isPreviewing = true;

    transformPlayer();
  };

  const stopPreview = () => {
    isPreview = false;

    unTransformPlayer();

    setTimeout(() => {
      isPreviewing = false;
    }, transitionMs);
  };

  const transformPlayer = debounce(
    () => {
      const rect = playerWrapper.getBoundingClientRect();
      const middleY = window.innerHeight / 2 - rect.height / 2 - rect.y;
      const middleX = 480;
      playerWrapper.style.transform = `matrix(1.5, 0, 0, 1.5, ${middleX}, ${middleY})`;
    },
    transitionMs * 2,
    {
      leading: true,
    },
  );

  const unTransformPlayer = () => {
    playerWrapper.style.transform = "";
  };

  onMount(() => {
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

    // @todo rework events - currently looping since set quality triggers video_play
    embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {
      // console.log(`Checking for qualities`)
      // const qualities = embed.getPlayer().getQualities();
      // console.log({ qualities });
      // embed.getPlayer().setQuality("360p");
    });
    
    // maybe VIDEO_READY
    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
      // console.log(`Checking for qualities`)
      // const qualities = embed.getPlayer().getQualities();
      // console.log({ qualities });
      embed.getPlayer().setQuality("360p");
    });
  });
</script>

<div class="channel" class:isPreview>
  <div
    class="channel-overlay"
    on:mouseover={previewChannel}
    on:mouseout={stopPreview}
  />
  <!-- <div class="channel-click-text" class:isPreview>
    Click to play on main player
  </div> -->

  <div
    id="channel-{channelName}"
    class="channel-player-wrapper"
    class:isPreview
    class:isPreviewing
    bind:this={playerWrapper}
  />

  <!-- <div class="channel-player-controls">
    <span class="material-icons material-icons-outlined">delete</span>
  </div> -->
</div>

<style>
  .channel {
    width: 400px;
    min-width: 400px;
    height: 360px;
    min-height: 360px;
    margin: 5px;
    position: relative;
    cursor: pointer;
  }

  .channel-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .channel.isPreview {
    background: rgba(0, 0, 0, 0.5);
  }

  .channel-player-wrapper {
    transition: transform 0.5s;
  }

  .channel-player-wrapper.isPreviewing {
    position: fixed;
  }

  .channel-player-wrapper.isPreview {
    position: fixed;
    /* transform: translate(480px, 0); */
  }

  .channel-click-text {
    position: absolute;
    top: 0;
    left: 0;

    text-align: center;

    opacity: 0;

    transition: opacity 0.5s;
  }

  .channel-click-text.isPreview {
    opacity: 1;
  }

  .channel-player-controls {
    width: 100%;
    height: 30px;
  }
</style>
