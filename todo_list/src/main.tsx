import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './views/App';

import './views/styles/reset.scss';
import './views/styles/common.scss';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
