<script lang="ts">
  import { onMount } from "svelte";
  import { channels } from "./store/channels";
  import type { ChannelInterface } from "./store/channels";

  export let channel: ChannelInterface;

  onMount(() => {
    channels.startTwitchEmbed(channel.name);
  });
</script>

<div class="channel">
  <div class="channel-overlay">
    <div
      class="channel-overlay-delete"
      on:mouseover={() =>
        channels.updateChannel(channel.name, { deleteIntent: true })}
      on:mouseleave={() =>
        channels.updateChannel(channel.name, { deleteIntent: false })}
      on:click={() => channels.deleteChannel(channel.name)}
    >
      <span class="material-icons">delete</span>
    </div>

    {#if channel.onMainPlayer}
      <div
        class="channel-overlay-preview"
        on:click={() => channels.stopViewingChannel(channel.name)}
      >
        <span class="material-icons">close_fullscreen</span>
      </div>
    {:else}
      <div
        class="channel-overlay-preview"
        on:mouseover={() => channels.previewChannel(channel.name)}
        on:mouseleave={() => channels.stopPreviewingChannel(channel.name)}
        on:click={() => channels.viewChannel(channel.name)}
      >
        <span class="material-icons">visibility</span>
      </div>
    {/if}

    <div class="channel-overlay-name">
      {channel.name}
    </div>
  </div>

  <div
    id="channel-{channel.name}"
    class="channel-player-wrapper"
    class:viewIntent={channel.viewIntent}
    class:deleteIntent={channel.deleteIntent}
    class:onMainPlayer={channel.onMainPlayer}
    bind:this={channel.playerWrapper}
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
    z-index: 2;
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
    z-index: 3;
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
