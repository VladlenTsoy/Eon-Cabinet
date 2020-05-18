
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle<any>`
  .warning { color: ${props => props.theme.color_warning}; }
  .success { color: ${props => props.theme.color_success}; }
  .danger { color: ${props => props.theme.color_danger}; }
  .second { color: ${props => props.theme.color_second}; }
`;