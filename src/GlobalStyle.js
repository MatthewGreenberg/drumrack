import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  :root {
    --util-ease: cubic-bezier(.19,1,.22,1);
  }

  html {
    overflow-y: scroll;
  }
  
  body {
    color: "#2D2D2D";
    margin:0;
    padding:0;
    font-weight: 300;
  }
  a {
    color: "#2D2D2D";
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0 !important;
  }
`

export default GlobalStyle
