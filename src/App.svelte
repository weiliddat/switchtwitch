<script lang="ts">
  import ChannelBar from "./ChannelBar.svelte";
  import MainArea from "./MainArea.svelte";
</script>

<main>
  <ChannelBar />
  <MainArea />
</main>

<style>
  main {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
  }
</style>
