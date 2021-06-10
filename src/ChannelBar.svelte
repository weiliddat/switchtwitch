<script lang="ts">
  import About from "./About.svelte";
  import Channel from "./Channel.svelte";
  import ChannelInput from "./ChannelInput.svelte";
  import Permalink from "./Permalink.svelte";
  import { channels } from "./store/channels";
</script>

<div id="channel-bar">
  {#each $channels as c (c)}
    <Channel channel={c} />
  {/each}

  <ChannelInput />
  <Permalink />

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
</style>
