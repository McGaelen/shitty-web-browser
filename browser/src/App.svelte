<script lang="ts">
  let src = $state('https://www.google.com')
  let value = $state('https://www.google.com')

  let wvWidth = $state(800)
  let wvHeight = $state(600)
  let hovered = $state(false)
  let pageTitle = $state('')

  $effect(setWvDimensions)

  function go() {
    src = value
  }

  function setWvDimensions() {
    wvWidth = window.innerWidth
    wvHeight = window.innerHeight - 60
  }

  function onkeyup(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      go()
    }
  }
</script>

<svelte:window on:resize={setWvDimensions}></svelte:window>

<div class="header" onmouseenter={() => hovered = true} onmouseleave={() => hovered = false}>
  {#if hovered}
    <input bind:value {onkeyup}/>
  {:else}
    <p>{pageTitle}</p>
  {/if}
</div>

<webview
  {src}
  style="width: {wvWidth}px; height: {wvHeight}px;"
  ondid-finish-load={() => console.log('finished loading')}
  onpage-title-updated={({title}) => pageTitle = title}
></webview>

<style>
  .header {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid red;
    height: 60px;
  }

  webview {
    width: 800px;
    height: 600px;
  }

  input {
    width: 100%;
  }
</style>
