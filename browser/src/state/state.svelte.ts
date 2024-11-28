import {z} from "zod";

interface State {
  active_tab_id: string
  tab_ids: string[]
  wvWidth: number
  wvHeight: number
  headerHeight: number
}

const validateState = z.object({
  active_tab_id: z.string(),
  tab_ids: z.array(z.string()),
  wvWidth: z.number(),
  wvHeight: z.number(),
  headerHeight: z.number()
})

const defaultState = {
  active_tab_id: '',
  active_webview: null,
  tab_ids: [],
  wvHeight: 800,
  wvWidth: 600,
  headerHeight: 30,
}

export const app_state = $state<State>(getInitialState())

$effect.root(() => {
  $effect(() => {
    localStorage.setItem('app_state', JSON.stringify(app_state))
  })
})

export function setWvDimensions() {
  app_state.wvWidth = window.innerWidth
  app_state.wvHeight = window.innerHeight - app_state.headerHeight
}

export function closeTab(id: string) {
  app_state.tab_ids = app_state.tab_ids.filter(tab_id => tab_id !== id)
  app_state.active_tab_id = app_state.tab_ids.at(-1) ?? ''
}

function getInitialState(): State {
  const savedStateStr = localStorage.getItem('app_state')

  if (savedStateStr) {
    let savedState: State = JSON.parse(savedStateStr)

    try {
      validateState.parse(savedState)
      return savedState
    } catch (e) {
      console.warn('Saved state was invalid - will reset to default values.')
      return defaultState
    }
  } else {
    console.log('No saved state in localStorage - using default values')
    return defaultState
  }
}
