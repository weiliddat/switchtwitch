<script lang="ts">
  import ChannelBar from "./ChannelBar.svelte";
  import MainPlayer from "./MainPlayer.svelte";

  let mainChannelName = "";
  const viewChannel = ({ detail: channelName }) => {
    mainChannelName = channelName;
  };
</script>

<main>
  <ChannelBar on:VIEW_CHANNEL={viewChannel} />
  <MainPlayer channelName={mainChannelName} />
</main>

<style>
  main {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
  }
</style>
