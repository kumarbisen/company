import { resolveRoute } from "./navigation/routes"

function App() {
  return resolveRoute(window.location.pathname)
}

export default App
