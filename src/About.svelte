<script lang="ts">
  import { onMount } from "svelte";
  import Settings from "./Settings.svelte";

  let aboutModal;
  let aboutModalOpen = false;
  let settingsModalOpen = false;

  onMount(() => {
    fetch("/about.html")
      .then((r) => r.text())
      .then((t) => (aboutModal = t));
  });
</script>

<about>
  <div>
    Switch Twitch by <a
      href="https://twitter.com/weiliddat"
      rel="nofollow noreferrer">@weiliddat</a
    >
  </div>

  <div class="meta-nav">
    <button
      href="/about.html"
      target="_blank"
      on:click|preventDefault={() => (aboutModalOpen = true)}
    >
      <span class="material-icons">info</span>
    </button>

    <button on:click|preventDefault={() => (settingsModalOpen = true)}>
      <span class="material-icons">settings</span>
    </button>
  </div>

  <div
    id="about-modal"
    class="modal"
    class:modal-open={aboutModalOpen}
    on:click={() => (aboutModalOpen = false)}
  >
    <div id="about-modal-content">
      {@html aboutModal}
    </div>
  </div>

  <div
    id="settings-modal"
    class="modal"
    class:modal-open={settingsModalOpen}
    on:click={() => (settingsModalOpen = false)}
  >
    <div id="settings-modal-content">
      <Settings />
    </div>
  </div>
</about>

<style>
  about {
    width: 100%;
    padding: 25px;
    color: #ccc;

    display: flex;
    justify-content: space-between;
  }

  about > * {
    width: 30%;
  }

  .meta-nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 4;
    display: none;
  }

  .modal.modal-open {
    display: flex;
  }

  #about-modal,
  #settings-modal {
    align-items: center;
    justify-content: center;
  }

  #about-modal-content,
  #settings-modal-content {
    width: 80%;
    height: 80%;
    padding: 25px;

    background: rgba(0, 0, 0, 0.8);
    text-align: left;

    overflow-y: auto;
  }
</style>
