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

    // 🕵️ SPY LAYER: Declare body ONCE and print out the successful response
    const body = await response.json();

    // Assert 2: Validate the response payload schema contract structure resiliently
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

  test("TC-USER-02: Verify registration fails with duplicate email address", async () => {
    // Generate a unique email base so this run is isolated
    const uniqueId = Date.now();
    const sharedEmail = `qa_duplicate_${uniqueId}@example.com`;

    const firstUserPayload = {
      name: "Original User",
      email: sharedEmail,
      password: "SecurePassword123!",
    };

    const duplicateUserPayload = {
      name: "Imposter User",
      email: sharedEmail, // Intentionally using the exact same email
      password: "DifferentPassword456!",
    };

    // 1. Setup Action: Register the first user to seed the database
    const firstResponse = await notesApi.registerUser(firstUserPayload);
    expect(firstResponse.status()).toBe(201);

    // 2. Core Test Action: Attempt to register again with the identical email
    const duplicateResponse = await notesApi.registerUser(duplicateUserPayload);

    // 🕵️ SPY LAYER: Declare body ONCE and print out the error response
    const body = await duplicateResponse.json();

    // Assert 2: Clean, compressed API contract schema validation
    expect(body).toMatchObject({
      success: false,
      status: 409,
      message: "An account already exists with the same email address",
    });
  });

  test("TC-USER-03: Verify registration fails with missing required fields / invalid data format", async () => {
    const invalidPayload = {};

    const response = await notesApi.registerUser(invalidPayload);

    const body = await response.json();

    expect(body).toMatchObject({
      success: false,
      status: 400,
      message: "User name must be between 4 and 30 characters",
    });
  });

  test("TC-USER-04: Verify successful login with correct registered credentials", async () => {
    const uniqueId = Date.now();
    const userCredentials = {
      name: "Login Tester",
      email: `qa_login_${uniqueId}@example.com`,
      password: "SecurePassword123!",
    };

    const registrationResponse = await notesApi.registerUser(userCredentials);
    expect(registrationResponse.status()).toBe(201);

    const loginPayload = {
      email: userCredentials.email,
      password: userCredentials.password,
    };

    const response = await notesApi.loginUser(loginPayload);
    const body = await response.json();

    expect(body).toMatchObject({
      success: true,
      status: 200,
      message: "Login successful",
    });
  });

  test("TC-USER-05: Verify login fails with incorrect or un-registered credentials", async () => {
    const unregisteredUser = {
      name: "Test User",
      email: "unregisteruser@example.com",
      password: "password123",
    };

    const response = await notesApi.loginUser(unregisteredUser);
    const body = await response.json();

    expect(response.status()).toBe(401);
    expect(body).toMatchObject({
      success: false,
      status: 401,
      message: "Incorrect email address or password",
    });
  });

  test("TC-USER-06: Verify profile retrieval fails if `x-auth-token` is missing or invalid", async () => {
    const uniqueId = Date.now();
    const userCredentials = {
      name: "Test User",
      email: `qa_profile_${uniqueId}@example.com`,
      password: "SecurePassword123!",
    };
    //Register user
    const registrationResponse = await notesApi.registerUser(userCredentials);
    expect(registrationResponse.status()).toBe(201);

    //Login user
    const loginResponse = await notesApi.loginUser({
      email: userCredentials.email,
      password: userCredentials.password,
    });
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    const authToken = loginBody.data.token;

    const response = await notesApi.getUserProfile(authToken);
    const body = await response.json();

    // Assert 1: Validate network transport layer protocol (200 OK)
    expect(response.status()).toBe(200);

    // Assert 2: Clean, compressed API contract schema validation
    expect(body).toMatchObject({
      success: true,
      status: 200,
      message: "Profile successful",
      data: {
        name: userCredentials.name,
        email: userCredentials.email.toLowerCase(),
      },
    });

    // Assert 3: Ensure sensitive details like system internal IDs exist and are healthy
    expect(typeof body.data.id).toBe("string");
  });

  test("TC-USER-07: Verify profile retrieval fails if `x-auth-token` is missing or invalid", async () => {
    const missingTokenResponse = await notesApi.getUserProfile("");

    const missingTokenBody = await missingTokenResponse.json();
    expect(missingTokenResponse.status()).toBe(401);
    expect(missingTokenBody).toMatchObject({
      success: false,
      status: 401,
      message: "No authentication token specified in x-auth-token header",
    });
  });

  test("TC-USER-08: Verify updating profile information with a valid payload.", async () => {
    const uniqueId = Date.now();
    const userCredentials = {
      name: "Before update name",
      email: `qa_update_${uniqueId}@example.com`,
      password: "SecurePassword123!",
    };

    const updatedPayload = {
      name: "Fully updated name",
      phone: "1234567890",
      company: "QA Automation Corp",
    };

    //Register the user
    const registrationResponse = await notesApi.registerUser(userCredentials);
    expect(registrationResponse.status()).toBe(201);

    //Log in user
    const loginResponse = await notesApi.loginUser({
      email: userCredentials.email,
      password: userCredentials.password,
    });
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    const authToken = loginBody.data.token;

    const response = await notesApi.updateUserProfile(
      authToken,
      updatedPayload,
    );
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toMatchObject({
      success: true,
      status: 200,
      message: "Profile updated successful",
      data: {
        name: updatedPayload.name,
        email: userCredentials.email.toLowerCase(), // Email shouldn't change
        phone: updatedPayload.phone,
        company: updatedPayload.company,
      },
    });
  });

  test("TC-USER-09: Verify profile updates fail if payload values fail validation rules", async () => {
    const uniqueId = Date.now();
    const userCredentials = {
      name: "Validator Test User",
      email: `qa_update_${uniqueId}@example.com`,
      password: "SecurePassword123!",
    };

    const invalidPayload = {
      name: "Valid Name",
      phone: "invalid-phone-letters",
      company: "Valid Company Name",
    };

    //Register the user
    const registrationResponse = await notesApi.registerUser(userCredentials);
    expect(registrationResponse.status()).toBe(201);

    //Log in user
    const loginResponse = await notesApi.loginUser({
      email: userCredentials.email,
      password: userCredentials.password,
    });
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    const authToken = loginBody.data.token;

    const response = await notesApi.updateUserProfile(
      authToken,
      invalidPayload,
    );
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body).toMatchObject({
      success: false,
      status: 400,
      message: "Phone number should be between 8 and 20 digits",
    });
  });

  test("TC-USER-10: Verify requesting a password reset link with a valid user email", async () => {
    const testPayload = {
      email: "testEmail@example.com",
    };

    const response = await notesApi.forgotPassword(testPayload);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body).toMatchObject({
      success: true,
      status: 200,
      message:
        "Password reset link successfully sent to testEmail@example.com. Please verify by clicking on the given link",
    });
  });
});
