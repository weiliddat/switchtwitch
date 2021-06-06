<script lang="ts">
  import { keyHandler } from "./actions/keyHandler";
  import About from "./About.svelte";
  import Channel from "./Channel.svelte";
  import { channels } from "./store/channels";

  let channelInput: string = "";

  const addChannel = () => {
    channels.addChannel(channelInput);

    channelInput = "";
  };
</script>

<div id="channel-bar">
  {#each $channels as c (c)}
    <Channel channel={c} />
  {/each}

  <input
    type="text"
    id="channel-input"
    use:keyHandler
    bind:value={channelInput}
    on:keydown_Enter={addChannel}
    placeholder="Channel name, then Enter"
  />

  <div class="spacer" />

  <About />
</div>

<style>
  #channel-bar {
    width: 420px;

    border-right: 2px solid #fff;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-x: hidden;
    overflow-y: scroll;
  }

  #channel-bar::-webkit-scrollbar {
    width: 10px;
  }

  #channel-bar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.2);
  }

  #channel-bar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
  }

  #channel-bar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.2);
  }

  #channel-input {
    width: 80%;
    margin: 20px 0;
  }
</style>
