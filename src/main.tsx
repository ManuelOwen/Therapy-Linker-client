import { StrictMode } from 'react'
import { router } from './App.tsx'
import { createRoot } from 'react-dom/client'
import { persistedStore, store } from './app/Store.ts'
import './index.css'

// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
    <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
