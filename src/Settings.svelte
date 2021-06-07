<script lang="ts">
  import { settings } from "./store/settings";
</script>

<div on:click|stopPropagation>
  <label for="lastPlaylist">Previous Stream Playlist</label>
  <input
    name="lastPlaylist"
    id="lastPlaylist"
    type="input"
    bind:value={$settings.lastPlaylist}
  />

  <label for="usePreview">Use Preview Box</label>
  <input
    name="usePreview"
    id="usePreview"
    type="checkbox"
    bind:checked={$settings.usePreview}
  />
</div>

<style>
</style>
