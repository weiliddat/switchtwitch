<script lang="ts">
  import { onMount } from "svelte";

  let aboutModal;
  let modalOpen = false;

  onMount(() => {
    fetch("/about.html")
      .then((r) => r.text())
      .then((t) => (aboutModal = t));
  });
</script>

<about>
  <div>Switch Twitch</div>

  <div>
    An <a
      href="https://github.com/weiliddat/switchtwitch"
      target="_blank"
      rel="nofollow noreferrer">open source</a
    >
    Twitch channel quick switcher
  </div>

  <div>
    by <a href="https://twitter.com/weiliddat" rel="nofollow noreferrer"
      >@weiliddat</a
    >
  </div>

  <div>
    <a
      href="/about.html"
      target="_blank"
      on:click|preventDefault={() => (modalOpen = true)}>About</a
    >
  </div>

  <div id="about-modal" class:modalOpen on:click={() => (modalOpen = false)}>
    <div id="about-modal-content">
      {@html aboutModal}
    </div>
  </div>
</about>

<style>
  about {
    padding: 25px 10px;
    text-align: center;
    color: #ccc;
  }

  #about-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 4;

    display: none;

    align-items: center;
    justify-content: center;
  }

  #about-modal.modalOpen {
    display: flex;
  }

  #about-modal-content {
    width: 80%;
    height: 80%;
    padding: 25px;

    background: rgba(0, 0, 0, 0.8);
    text-align: left;

    overflow-y: auto;
  }
</style>
