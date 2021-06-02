<script lang="ts">
  import { keyHandler } from "./actions/keyHandler";

  let channelName: string = "";

  const loadPlayer = () => {
    const options: Twitch.PlayerOptions = {
      width: 600,
      height: 400,
      autoplay: true,
      muted: false,
      parent: ["switchtwitch.com"],
      channel: channelName,
    };

    const player = new Twitch.Player("main-player", options);

    player.setVolume(0.5);
  };
</script>

<main>
  <div id="main-player" />
  <input
    type="text"
    use:keyHandler
    bind:value={channelName}
    on:keydown_Enter={loadPlayer}
  />
</main>

<style>
</style>
