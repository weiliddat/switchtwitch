<script lang="ts">
  import { keyHandler } from "./actions/keyHandler";
  import { channels } from "./store/channels";

  let channelInput: string = "";

  const addChannel = () => {
    channels.addChannel(channelInput);

    channelInput = "";
  };
</script>

<channel-input>
  <label for="channel-input">Channel Names</label>
  <input
    type="text"
    id="channel-input"
    use:keyHandler
    bind:value={channelInput}
    on:keydown_Enter={addChannel}
    placeholder="Enter channel names here!"
  />
</channel-input>

<style>
  channel-input {
    width: 80%;
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  input {
    flex: 1 1 auto;
  }
</style>
