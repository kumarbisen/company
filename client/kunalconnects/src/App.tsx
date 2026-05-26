import { resolveRoute } from "./routes/routes"

function App() {
  return resolveRoute(window.location.pathname)
}

export default App

