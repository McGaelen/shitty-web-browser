<script lang="ts">
  import {tick} from "svelte";
  import {app_state, closeTab} from "../state/state.svelte";

  let { tab_id } = $props<{tab_id: string}>()

  let omnibox: HTMLInputElement

  let src = $state('https://www.google.com')
  let omniboxVal = $state('https://www.google.com')
  let showUrlBar = $state(false)
  let pageTitle = $state('')
  let favicons = $state([])

  function search() {
    if (src === omniboxVal) return
    src = `https://www.google.com/search?q=${decodeURIComponent(omniboxVal)}`
  }

  function onkeyup(e: KeyboardEvent) {
    e.stopImmediatePropagation()
    e.preventDefault()
    if (e.key === 'Enter') {
      search()
      omnibox.blur()
    }
  }

  async function onclick(e: MouseEvent) {
    if (app_state.active_tab_id === tab_id) {
      showUrlBar = true
      await tick()
      omnibox.focus()
      omnibox.select()
    } else {
      app_state.active_tab_id = tab_id
    }
  }
</script>

<div class="tab">
  <button class="tab" {onclick} class:active={app_state.active_tab_id === tab_id}>
    {#if showUrlBar}
      <input bind:this={omnibox} bind:value={omniboxVal} onkeypress={e => e.stopImmediatePropagation()} {onkeyup} onclick={e => e.stopPropagation()} onblur={() => showUrlBar = false}/>
    {:else}
      {#if favicons[0]}
        <img src={favicons[0]} style="width: 20px; height: 20px; margin-right: 10px;"/>
      {/if}
      <p style="white-space: nowrap; text-overflow: ellipsis">{pageTitle}</p>
    {/if}
  </button>
  <button onclick={() => closeTab(tab_id)} style="height: 100%;">X</button>
</div>

<webview
    {src}
    class:hide={app_state.active_tab_id !== tab_id}
    style="position:absolute; top: {app_state.headerHeight}px; left: 0px; width: {app_state.wvWidth}px; height: {app_state.wvHeight}px;"
    ondid-finish-load={() => console.log('finished loading')}
    onpage-title-updated={({title}) => pageTitle = title}
    onpage-favicon-updated={({favicons: list}) => favicons = list}
    ondid-navigate={({url}) => omniboxVal = url}
></webview>

<style>
  .tab {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .tab.active {
    background-color: #3c3c3c;
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