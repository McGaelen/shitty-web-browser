<script lang="ts">
  import {app_state} from "../state/state.svelte";

  let { tab_id } = $props<{tab_id: string}>()

  let webview: any = $state(null)

  let src = $state('https://www.google.com')
  let currentUrl = $state('https://www.google.com')
  let hovered = $state(false)
  let pageTitle = $state('')
  let favicons = $state([])

  function go() {
    src = currentUrl
  }

  function onkeyup(e: KeyboardEvent) {
    console.log('keyup')
    if (e.key === 'Enter') {
      go()
    }
  }
</script>

<button class="tab" onmouseenter={() => hovered = true} onmouseleave={() => hovered = false} onclick={() => {
    app_state.active_tab_id = tab_id
    console.log(tab_id)
}}>
  {#if hovered}
    <input bind:value={currentUrl} {onkeyup} onclick={e => e.stopPropagation()}/>
  {:else}
    {#if favicons[0]}
      <img src={favicons[0]} style="width: 20px; height: 20px; margin-right: 10px;"/>
    {/if}
    <p>{pageTitle}</p>
  {/if}
</button>


<webview
    bind:this={webview}
    {src}
    class:hide={app_state.active_tab_id !== tab_id}
    style="position:absolute; top: {app_state.headerHeight}px; left: 0px; width: {app_state.wvWidth}px; height: {app_state.wvHeight}px;"
    ondid-finish-load={() => console.log('finished loading')}
    onpage-title-updated={({title}) => pageTitle = title}
    onpage-favicon-updated={({favicons: list}) => favicons = list}
    ondid-navigate={({url}) => currentUrl = url}
></webview>

<style>
  .tab {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  input {
    width: 100%;
  }

  webview {
    width: 800px;
    height: 600px;
  }
  .hide {
    visibility: hidden;
  }
</style>