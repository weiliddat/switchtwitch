<script lang="ts">
  import { permalink } from "./store/channels";

  const copyPermalinkToClipboard = () => {
    navigator.clipboard.writeText($permalink);
  };
</script>

<div id="permalink">
  <label for="permalink">Permalink: </label>
  <input
    type="text"
    id="permalink"
    name="permalink"
    readonly
    bind:value={$permalink}
  />
  <button on:click={copyPermalinkToClipboard}>
    <span class="material-icons">content_copy</span>
  </button>
</div>

<style>
  #permalink {
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  label {
    flex: 0 0 auto;
    width: 100%;
  }

  input {
    flex: 1 1 auto;
    margin-right: 0.25em;
  }
</style>
