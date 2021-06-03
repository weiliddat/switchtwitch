<script lang="ts">
  export let channelName: string = "";

  let embed: Twitch.Embed;

  $: {
    if (channelName) {
      if (!embed) {
        const options: Twitch.EmbedOptions = {
          width: "100%",
          height: "100%",
          autoplay: true,
          muted: true,
          parent: ["switchtwitch.com"],
          channel: channelName,
          layout: "video",
        };

        embed = new Twitch.Embed(`main-player`, options);

        embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
          const player = embed.getPlayer();

          player.setQuality("chunked");

          player.setMuted(false);
        });
      } else {
        embed.getPlayer().setChannel(channelName);
      }
    }
  }
</script>

<div id="main-player-wrapper">
  <div id="main-player" />
</div>

<style>
  #main-player-wrapper {
    flex: 1 1 auto;
    margin: 5px;
    background: rgba(0, 0, 0, 0.8);
    position: relative;

    display: flex;
    align-items: stretch;
    align-content: stretch;
  }

  #main-player {
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
  }
</style>
