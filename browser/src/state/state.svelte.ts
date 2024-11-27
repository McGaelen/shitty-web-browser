interface State {
  active_tab_id: string
  active_webview: any
  tab_ids: string[]
  wvWidth: number
  wvHeight: number
  headerHeight: number
}

export const app_state = $state<State>({
  active_tab_id: '',
  active_webview: null,
  tab_ids: [],
  wvHeight: 800,
  wvWidth: 600,
  headerHeight: 30,
})

export function setWvDimensions() {
  app_state.wvWidth = window.innerWidth
  app_state.wvHeight = window.innerHeight - app_state.headerHeight
}

export function closeTab(id: string) {
  app_state.tab_ids = app_state.tab_ids.filter(tab_id => tab_id !== id)
  app_state.active_tab_id = app_state.tab_ids.at(-1) ?? ''
}
