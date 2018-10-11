import { app } from "./app"

const PORT = 5000
const HOSTNAME = "0.0.0.0"

app.listen(PORT, HOSTNAME, () => {
  // Success callback
  console.log(`Listening at http://${HOSTNAME}:${PORT}/`)
})
