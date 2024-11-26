interface State {
  active_tab_id: string
  tab_ids: string[]
  wvWidth: number
  wvHeight: number
  headerHeight: number
}

export const app_state = $state<State>({
  active_tab_id: '',
  tab_ids: [],
  wvHeight: 800,
  wvWidth: 600,
  headerHeight: 40,
})

export function setWvDimensions() {
  app_state.wvWidth = window.innerWidth
  app_state.wvHeight = window.innerHeight - app_state.headerHeight
}
