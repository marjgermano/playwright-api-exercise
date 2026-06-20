import { test, expect } from "@playwright/test";
import { NotesController } from "../../src/controllers/NotesController";

test.describe("User", () => {
  let notesApi: NotesController;

  test.beforeEach(async ({ request }) => {
    notesApi = new NotesController(request);
  });

  test("TC-USER-01: Verify successful user registration with valid payload", async () => {
    // Generate unique user credentials using a timestamp
    const uniqueId = Date.now();
    const testPayload = {
      name: "QA Engineer",
      email: `qa_test_${uniqueId}@example.com`,
      password: "SecurePassword123!",
    };

    // Action: Send POST registration request
    const response = await notesApi.registerUser(testPayload);

    // Assert 1: Validate network transport layer protocol (201 Created)
    expect(response.status()).toBe(201);

    // Assert 2: Validate the response payload schema contract structure resiliently
    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.status).toBe(201);
    expect(typeof body.message).toBe("string");
    expect(body.message.length).toBeGreaterThan(0);

    // Assert 3: Validate the data payload integrity nested inside the object
    expect(body.data).toMatchObject({
      name: testPayload.name,
      email: testPayload.email.toLowerCase(), // APIs often normalize emails to lowercase
    });

    expect(typeof body.data.id).toBe("string");
  });
});
