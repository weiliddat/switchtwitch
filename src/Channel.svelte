<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { ChannelEvent } from "./enums";
  import { Flip } from "./utils/flip";

  export let channelName = "";

  const dispatch = createEventDispatcher();

  let playerWrapper: HTMLElement;
  let viewIntent = false;
  let deleteIntent = false;
  let onMainPlayer = false;
  let embed: Twitch.Embed;

  const previewMouseover = async () => {
    if (viewIntent === true) return;

    const playerWrapperFlip = new Flip(playerWrapper);

    playerWrapperFlip.flip(async () => {
      viewIntent = true;

      embed.getPlayer().setQuality("480p");
      embed.getPlayer().setMuted(false);

      await tick();
    });
  };

  const previewMouseleave = async () => {
    if (viewIntent === false) return;

    const playerWrapperFlip = new Flip(playerWrapper);

    playerWrapperFlip.flip(async () => {
      viewIntent = false;

      embed.getPlayer().setQuality("360p");
      embed.getPlayer().setMuted(true);

      await tick();
    });
  };

  const handleView = async () => {
    if (onMainPlayer === true) return;

    const playerWrapperFlip = new Flip(playerWrapper);

    playerWrapperFlip.flip(async () => {
      onMainPlayer = true;

      embed.getPlayer().setQuality("chunked");
      embed.getPlayer().setMuted(false);

      await tick();
    });
  };

  const handleClose = async () => {
    if (onMainPlayer === false) return;

    const playerWrapperFlip = new Flip(playerWrapper);

    playerWrapperFlip.flip(async () => {
      onMainPlayer = false;

      embed.getPlayer().setQuality("480p");
      embed.getPlayer().setMuted(false);

      await tick();
    });
  };

  const deleteMouseover = () => {
    deleteIntent = true;
  };

  const deleteMouseleave = () => {
    deleteIntent = false;
  };

  const handleDelete = () => {
    dispatch(ChannelEvent.DELETE_CHANNEL, channelName);
  };

  onMount(() => {
    const options: Twitch.EmbedOptions = {
      width: "100%",
      height: "100%",
      autoplay: true,
      muted: true,
      parent: ["switchtwitch.com"],
      channel: channelName,
      layout: "video",
    };

    embed = new Twitch.Embed(`channel-${channelName}`, options);

    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
      const player = embed.getPlayer();

      player.setQuality("360p");
      player.setVolume(0.5);
    });
  });
</script>

<div class="channel">
  <div class="channel-overlay">
    <div
      class="channel-overlay-delete"
      on:mouseover={deleteMouseover}
      on:mouseleave={deleteMouseleave}
      on:click={handleDelete}
    >
      <span class="material-icons">delete</span>
    </div>

    {#if onMainPlayer}
      <div class="channel-overlay-preview" on:click={handleClose}>
        <span class="material-icons">close_fullscreen</span>
      </div>
    {:else}
      <div
        class="channel-overlay-preview"
        on:mouseover={previewMouseover}
        on:mouseleave={previewMouseleave}
        on:click={handleView}
      >
        <span class="material-icons">visibility</span>
      </div>
    {/if}

    <div class="channel-overlay-name">
      {channelName}
    </div>
  </div>

  <div
    id="channel-{channelName}"
    class="channel-player-wrapper"
    class:viewIntent
    class:deleteIntent
    class:onMainPlayer
    bind:this={playerWrapper}
  />
</div>

<style>
  .channel {
    flex: 0 0 auto;
    width: 400px;
    height: 360px;
    margin: 5px;
    position: relative;
  }

  .channel-player-wrapper {
    width: 400px;
    height: 360px;
    position: relative;
  }

  .channel-player-wrapper.viewIntent {
    position: fixed;
    top: calc(50vh - 225px);
    left: 425px;
    width: 600px;
    height: 540px;
    z-index: 1;
  }

  .channel-player-wrapper.deleteIntent {
    position: relative;
    left: 30%;
  }

  .channel-player-wrapper.onMainPlayer {
    position: fixed;
    top: 5px;
    left: 425px;
    height: calc(100vh - 10px);
    width: calc(100vw - 430px);
    z-index: 1;
  }

  .channel-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: row;
  }

  .channel-overlay-name {
    position: absolute;
    bottom: 0;
    z-index: 1;

    width: 100%;
    padding: 5px;

    text-align: center;
    text-transform: uppercase;
  }

  .channel-overlay-delete,
  .channel-overlay-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    z-index: 2;
  }

  .channel-overlay-delete {
    width: 30%;
    opacity: 0.2;
  }

  .channel-overlay-preview {
    width: 70%;
    opacity: 0.2;
  }

  .channel-overlay-delete:hover {
    opacity: 1;
  }

  .channel-overlay-preview:hover {
    opacity: 1;
  }
</style>
