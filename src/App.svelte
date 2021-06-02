<script lang="ts">
  import { keyHandler } from "./actions/keyHandler";

  let channelName: string = "";

  const loadPlayerToChannelBar = (e) => {
    const options: Twitch.EmbedOptions = {
      width: 400,
      height: 360,
      autoplay: true,
      muted: true,
      parent: ["switchtwitch.com"],
      channel: channelName,
      layout: "video",
    };

    channelName = "";

    const embed = new Twitch.Embed("channels", options);

    embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {
      console.log(embed.getPlayer().getQualities());

      embed.getPlayer().setQuality("360p");
    });
  };
</script>

<main>
  <div id="channel-bar">
    <div id="channels" />
    <input
      type="text"
      id="channel-input"
      use:keyHandler
      bind:value={channelName}
      on:keydown_Enter={loadPlayerToChannelBar}
      placeholder="Add Channel Name"
    />
  </div>
  <div id="main-player" />
</main>

<style>
  main {
    height: 100%;
    width: 100%;
  }

  #channel-bar {
    min-width: 420px;
    width: 15%;
    height: 100%;

    border-right: 2px solid #fff;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-x: hidden;
    overflow-y: auto;
  }

  #channel-input {
    margin: 20px 0;
  }
</style>
