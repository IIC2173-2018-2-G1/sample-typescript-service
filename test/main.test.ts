import request from "supertest"
import { app } from "../src/app"

describe("/", () => {
  test("GET: / should greet the world", async done => {
    const response = await request(app)
      .get("/")
      .expect(200)

    expect(response.text).toBe("Hello World!")
    done()
  })
})
