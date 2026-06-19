import { test, expect } from "@playwright/test";
import { NotesController } from "../../src/controllers/NotesController";

test.describe("Health", () => {
  let notesApi: NotesController;

  test.beforeEach(async ({ request }) => {
    // Initialize our lean controller with Playwright's network context
    notesApi = new NotesController(request);
  });

  test("TC-HLTH-01: Verify core service availability and server responsiveness", async () => {
    // Action: Hit the health check endpoint using our isolated controller
    const response = await notesApi.getHealthStatus();

    // Assert 1: Validate network transport status layer protocol (200 OK)
    expect(response.status()).toBe(200);

    // Assert 2: Validate the response payload schema contract structure dynamically
    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.status).toBe(200);
    expect(typeof body.message).toBe("string");
    expect(body.message.length).toBeGreaterThan(0);
  });
});
