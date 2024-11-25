<script lang="ts">
  const headerHeight = 40;

  let src = $state('https://www.google.com')
  let value = $state('https://www.google.com')
  let wvWidth = $state(800)
  let wvHeight = $state(600)
  let hovered = $state(false)
  let pageTitle = $state('')
  let favicons = $state([])

  $effect(setWvDimensions)

  function go() {
    src = value
  }

  function setWvDimensions() {
    wvWidth = window.innerWidth
    wvHeight = window.innerHeight - headerHeight
  }

  function onkeyup(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      go()
    }
  }
</script>

<svelte:window on:resize={setWvDimensions}></svelte:window>

<div class="header" style="height: {headerHeight}px;">
  <div class="drag-space"></div>

  <!-- {#each tabs as tab} -->
  <button class="tab" onmouseenter={() => hovered = true} onmouseleave={() => hovered = false}>
  {#if hovered}
    <input bind:value {onkeyup}/>
  {:else}
    {#if favicons[0]}
      <img src={favicons[0]} style="width: 20px; height: 20px; margin-right: 10px;"/>
    {/if}
    <p>{pageTitle}</p>
  {/if}
  </button>
  <!-- {/each} -->

  <!-- todo: new tab button: -->
<!--  <button style="width: 20px; margin: 0 5px;">+</button>-->

  <div class="window-controls">
    <button onclick={() => window.windowControls.minimize()}>-</button>
    <button onclick={() => window.windowControls.maximize()}>+</button>
    <button onclick={() => window.windowControls.close()}>X</button>
  </div>
</div>

<webview
  {src}
  style="width: {wvWidth}px; height: {wvHeight}px;"
  ondid-finish-load={() => console.log('finished loading')}
  onpage-title-updated={({title}) => pageTitle = title}
  onpage-favicon-updated={({favicons: list}) => favicons = list}
  ondid-start-navigation={({url}) => value = url}
></webview>

<style>
  .header {
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px black;
  }



  .tab {
    display: flex;
    align-items: center;
    height: 100%;
    flex-grow: 1;
  }
  input {
    flex-grow: 1;
  }


  .drag-space {
    app-region: drag;
    width: 50px;
    height: 100%;
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



  webview {
    width: 800px;
    height: 600px;
  }
</style>
