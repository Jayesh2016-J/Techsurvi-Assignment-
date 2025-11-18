import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Inter, system-ui, -apple-system, Roboto, 'Segoe UI', sans-serif; background:#f8fafc; color:#0f172a; }
  a { text-decoration: none; color: inherit; }
`

export default GlobalStyle
