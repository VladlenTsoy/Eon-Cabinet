
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle<any>`
  .warning { color: ${props => props.theme.color_warning}; }
  .success { color: ${props => props.theme.color_success}; }
  .danger { color: ${props => props.theme.color_danger}; }
  .second { color: ${props => props.theme.color_second}; }
  
  .ant-drawer .ant-picker-clear, .ant-drawer .ant-slider-handle, .ant-drawer .ant-anchor-wrapper, .ant-drawer .ant-collapse-content, .ant-drawer .ant-timeline-item-head, .ant-drawer .ant-card {
    background: ${props => props.theme['@component-background']};
  }
`;