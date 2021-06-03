<script lang="ts">
  export let channelName: string = "";

  let embed: Twitch.Embed;
  let mainPlayerWrapper: HTMLElement;

  $: {
    if (channelName) {
      if (!embed) {
        const wrapperRect = mainPlayerWrapper.getBoundingClientRect();

        console.log("wrapperRect", wrapperRect);

        const options: Twitch.EmbedOptions = {
          width: wrapperRect.width,
          height: wrapperRect.height,
          autoplay: false,
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

          player.play();
        });
      } else {
        embed.getPlayer().setChannel(channelName);
      }
    }
  }
</script>

<div id="main-player-wrapper" bind:this={mainPlayerWrapper}>
  <div id="main-player" />
</div>

<style>
  #main-player-wrapper {
    flex: 1 1 auto;
    margin: 5px;
    background: rgba(0, 0, 0, 0.8);
  }
</style>
