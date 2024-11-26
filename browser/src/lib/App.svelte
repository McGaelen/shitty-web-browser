<script lang="ts">
  import Tab from "./Tab.svelte";
  import {app_state, setWvDimensions} from "../state/state.svelte";
  import {onMount} from "svelte";

  let webview: any

  onMount(() => {
    setWvDimensions()
    newTab()
  })

  function newTab() {
    const newtab_id = crypto.randomUUID()
    app_state.tab_ids.push(newtab_id)
    app_state.active_tab_id = newtab_id
  }

</script>

<svelte:window on:resize={setWvDimensions}></svelte:window>

<div class="header" style="height: {app_state.headerHeight}px;">
  <div class="drag-space"></div>

  <button onclick={() => webview.goBack()}>back</button>
  <button onclick={() => webview.goForward()}>forward</button>

  <div class="tabs">
   {#each app_state.tab_ids as tab_id}
     <Tab {tab_id}/>
   {/each}
  </div>

  <button style="margin: 0 15px; white-space: nowrap" onclick={newTab}>new tab</button>


  <div class="window-controls">
    <button onclick={() => window.windowControls.minimize()}>-</button>
    <button onclick={() => window.windowControls.maximize()}>+</button>
    <button onclick={() => window.windowControls.close()}>X</button>
  </div>
</div>

<style>
  .header {
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px black;
    min-width: 100vw;
    max-width: 100vw;
    z-index: 99999;
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
    flex: 0 1 100%;
  }

  .window-controls {
    display: flex;
    align-items: center;
    gap: 2px;
    margin: 0 5px;
  }
  .window-controls button {
    width: 30px;
  }
</style>
