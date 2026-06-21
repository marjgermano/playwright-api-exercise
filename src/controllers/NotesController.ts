import { APIRequestContext } from "@playwright/test";
import { BaseAPIClient } from "./BaseAPIClient";
import { API_ROUTES } from "../constants/apiRoutes";

export class NotesController extends BaseAPIClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * REQ-HLTH-01: Check the health of the API Notes service
   */
  async getHealthStatus() {
    return await this.request.get(API_ROUTES.healthCheck);
  }

  /**
   * REQ-USER-01: Register a new user account
   * @param userData Object containing name, email, and password
   */
  async registerUser(userData: Record<string, string>) {
    return await this.request.post(API_ROUTES.users.register, {
      data: userData,
    });
  }

  async loginUser(userData: Record<string, string>) {
    return await this.request.post(API_ROUTES.users.login, {
      data: userData,
    });
  }
}
