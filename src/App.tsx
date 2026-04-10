import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppPaths } from './routes/paths'
import { routes } from './routes/routes'
import Layout from './layout/Layout'
import { useRealtimeSocket } from './hooks/useRealtimeSocket'

function App() {
  const shouldRedirectRoot = AppPaths.login !== '/'
  useRealtimeSocket()

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ id, path, Component, Guard, layoutType }) => (
          <Route
            path={path}
            element={
              <Guard>
                <Layout layoutType={layoutType}>
                  <Component />
                </Layout>
              </Guard>
            }
            key={id}
          />
        ))}
        {shouldRedirectRoot && <Route path="/" element={<Navigate to={AppPaths.dashboard} replace />} />}
        <Route path="*" element={<Navigate to={AppPaths.login} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
