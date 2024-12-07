<script>
  import {app_state} from "../state/state.svelte";
  import Tab from "./Tab.svelte";
  import {Plus, Square, X, Minus, ArrowLeft, ArrowRight } from 'lucide-svelte'
  import {Button} from '$lib/components/ui/button'

  function newTab() {
    const newtab_id = crypto.randomUUID()
    app_state.tab_ids.push(newtab_id)
    app_state.active_tab_id = newtab_id
  }
</script>

<div class="header" style="height: {app_state.headerHeight}px;">
  <div style="display: flex; gap: 2px; height: 100%;">
    <Button variant="ghost" class="h-full rounded-none">
      <ArrowLeft strokeWidth={1} size={20} />
    </Button>
    <Button variant="ghost" class="h-full rounded-none">
      <ArrowRight strokeWidth={1} size={20} />
    </Button>
  </div>

  <div class="drag-space"></div>

  <div class="tabs">
    {#each app_state.tab_ids as tab_id}
      <Tab {tab_id}/>
    {/each}
  </div>

  <div class="drag-space"></div>

  <Button variant="ghost" class="h-full rounded-none" onclick={newTab}>
    <Plus absoluteStrokeWidth strokeWidth={1} size={20} />
  </Button>

  <div class="window-controls">
    <Button variant="ghost" class="h-full rounded-none" onclick={() => window.windowControls.minimize()}>
      <Minus absoluteStrokeWidth strokeWidth={1} size={20} />
    </Button>
    <Button variant="ghost" class="h-full rounded-none" onclick={() => window.windowControls.maximize()}>
      <Square absoluteStrokeWidth strokeWidth={1} size={16} />
    </Button>
    <Button variant="ghost" class="h-full rounded-none" onclick={() => window.windowControls.close()}>
      <X strokeWidth={1} size={22  } />
    </Button>
  </div>
</div>

<style>
  .header {
    background-color: var(--background-color);
    height: 100%;
    display: flex;
    /*gap: 10px;*/
    align-items: center;
    min-width: 100vw;
    max-width: 100vw;
  }

  .drag-space {
    app-region: drag;
    width: 40px;
    min-width: 40px;
    max-width: 40px;
    height: 100%;
  }

  .tabs {
    overflow-x: auto;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 3px;
    flex: 0 1 100%;
  }
  .tabs::-webkit-scrollbar {
    display: none;
  }

  .ms-btn {
    white-space: nowrap;
    height: 100%;
    min-width: 45px;
    max-width: 45px;
    background-color: var(--background-color);
    border: none;
    transition: all;
    transition-duration: 250ms;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ms-btn:hover {
    background-color: #555555;
  }
  .ms-btn:active {
    background-color: #6e6e6e;
  }

  .window-controls {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .window-controls button {
    width: 30px;
  }

</style>