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

  /**
   * REQ-USER-02: Log in user account
   */

  async loginUser(userData: Record<string, string>) {
    return await this.request.post(API_ROUTES.users.login, {
      data: userData,
    });
  }

  /**
   * REQ-USER-03: Verify token
   */

  async getUserProfile(token: string) {
    const response = await this.request.get(API_ROUTES.users.profile, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response;
  }

  /**
   Verify profile update
   */

  /**
   * Update the secure user profile details
   * @param token The valid x-auth-token string
   * @param updatedData The payload containing the fields to update (e.g., name, phone, company)
   */
  async updateUserProfile(
    token: string,
    updatedData: { name?: string; phone?: string; company?: string },
  ) {
    const response = await this.request.patch(API_ROUTES.users.profile, {
      headers: {
        "x-auth-token": token,
      },
      data: updatedData,
    });

    return response;
  }
}
