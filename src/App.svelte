<script lang="ts">
  import ChannelBar from "./ChannelBar.svelte";
  import MainPlayer from "./MainPlayer.svelte";
</script>

<main>
  <ChannelBar />
  <MainPlayer />
</main>

<style>
  main {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
  }
</style>
