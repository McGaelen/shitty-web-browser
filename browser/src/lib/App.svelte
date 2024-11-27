<script lang="ts">
  import {app_state, setWvDimensions} from "../state/state.svelte";
  import {onMount} from "svelte";
  import Header from "./Header.svelte";

  onMount(() => setWvDimensions())
</script>

<svelte:window on:resize={setWvDimensions}></svelte:window>

<div id="app-container" style="height: {app_state.wvHeight + app_state.headerHeight}px">

  <Header></Header>

  <div class="no-tabs" style="height: {app_state.wvHeight}px;">
    you have no tabs open bro
  </div>
</div>

<style>
  .no-tabs {
    background-color: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
