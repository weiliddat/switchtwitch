<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { ChannelEvent } from "./enums";

  export let channelName = "";

  const dispatch = createEventDispatcher();

  let playerWrapper: HTMLElement;
  let viewIntent = false;
  let deleteIntent = false;
  let embed: Twitch.Embed;

  const previewMouseover = () => {
    viewIntent = true;

    embed.getPlayer().setQuality("720p");
  };

  const previewMouseout = () => {
    viewIntent = false;

    embed.getPlayer().setQuality("160p");
  };

  const handleView = () => {
    dispatch(ChannelEvent.VIEW_CHANNEL, channelName);
  };

  const deleteMouseover = () => {
    deleteIntent = true;
  };

  const deleteMouseout = () => {
    deleteIntent = false;
  };

  const handleDelete = () => {
    dispatch(ChannelEvent.DELETE_CHANNEL, channelName);
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

    embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
      const player = embed.getPlayer();

      player.setQuality("160p");
    });
  });
</script>

<div class="channel">
  <div class="channel-overlay">
    <div
      class="channel-overlay-delete"
      on:mouseover={deleteMouseover}
      on:mouseout={deleteMouseout}
      on:click={handleDelete}
    >
      <span class="material-icons">delete</span>
    </div>

    <div
      class="channel-overlay-preview"
      on:mouseover={previewMouseover}
      on:mouseout={previewMouseout}
      on:click={handleView}
    >
      <span class="material-icons">visibility</span>
    </div>
  </div>

  <div
    id="channel-{channelName}"
    class="channel-player-wrapper"
    class:viewIntent
    class:deleteIntent
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

  .channel-player-wrapper.viewIntent {
    position: fixed;
    top: calc(50vh - 225px);
    left: 540px;
    transform: scale(1.5);
  }

  .channel-player-wrapper.deleteIntent {
    position: relative;
    left: 30%;
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

  .channel-overlay-delete,
  .channel-overlay-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    z-index: 10;
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
