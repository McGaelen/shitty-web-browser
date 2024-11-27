<script>
  import {app_state} from "../state/state.svelte";
  import Tab from "./Tab.svelte";
  import {onMount} from "svelte";

  onMount(() => newTab())

  function newTab() {
    const newtab_id = crypto.randomUUID()
    app_state.tab_ids.push(newtab_id)
    app_state.active_tab_id = newtab_id
  }
</script>

<div class="header" style="height: {app_state.headerHeight}px;">
  <div class="drag-space"></div>

  <div style="display: flex; gap: 2px;">
    <button disabled={!app_state.active_webview} onclick={() => app_state.active_webview.goBack()}>&lt;</button>
    <button disabled={!app_state.active_webview} onclick={() => app_state.active_webview.goForward()}>&gt;</button>
  </div>

  <div class="tabs">
    {#each app_state.tab_ids as tab_id}
      <Tab {tab_id}/>
    {/each}
  </div>

  <button style="white-space: nowrap" onclick={newTab}>new tab</button>

  <div class="window-controls">
    <button onclick={() => window.windowControls.minimize()}>-</button>
    <button onclick={() => window.windowControls.maximize()}>+</button>
    <button onclick={() => window.windowControls.close()}>X</button>
  </div>
</div>

<style>
  .header {
    background-color: var(--background-color);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: 100vw;
    max-width: 100vw;
  }

  .drag-space {
    app-region: drag;
    width: 50px;
    min-width: 50px;
    max-width: 50px;
    height: 100%;
  }

  .tabs {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 3px;
    flex: 0 1 100%;
  }

  .window-controls {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-right: 10px;
  }
  .window-controls button {
    width: 30px;
  }

</style>