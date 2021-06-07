<script lang="ts">
  import { Qualities, qualities, settings } from "./store/settings";
</script>

<div on:click|stopPropagation>
  <div>
    <input
      name="usePreview"
      id="usePreview"
      type="checkbox"
      bind:checked={$settings.usePreview}
    />
    <label for="usePreview">Use Preview Box</label>
  </div>

  <!-- not ready yet -->
  <!-- <div>
    <input
      name="loadChat"
      id="loadChat"
      type="checkbox"
      bind:checked={$settings.loadChat}
    />
    <label for="loadChat">Load Chat</label>
  </div> -->

  <div>
    <input
      name="reducedAnimations"
      id="reducedAnimations"
      type="checkbox"
      bind:checked={$settings.reducedAnimations}
    />
    <label for="reducedAnimations">Reduced Animations</label>
  </div>

  <span>Quality Settings</span>

  <div>
    <label for="quality-sidebar">sidebar</label>
    <select
      name="quality-sidebar"
      id="quality-sidebar"
      bind:value={$settings.qualitySidebar}
    >
      {#each qualities as q}
        <option value={q.value}>{q.label}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="quality-preview">preview</label>
    <select
      name="quality-preview"
      id="quality-preview"
      bind:value={$settings.qualityPreview}
    >
      {#each qualities as q}
        <option value={q.value}>{q.label}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="quality-main">main</label>
    <select
      name="quality-main"
      id="quality-main"
      bind:value={$settings.qualityMain}
    >
      {#each qualities as q}
        <option value={q.value}>{q.label}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  label,
  input {
    display: unset;
  }
</style>
