<script lang="ts">
  import { onMount } from "svelte";

  export let channelName = "";

  onMount(() => {
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

    const embed = new Twitch.Embed("channel-wrapper", options);

    embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {
      console.log(embed.getPlayer().getQualities());

      embed.getPlayer().setQuality("360p");
    });
  });
</script>

<div id="channel-wrapper"></div>
