import { APIRequestContext } from "@playwright/test";
import { BaseAPIClient } from "./BaseAPIClient";
import { API_ROUTES } from "../constants/apiRoutes";

export class NotesController extends BaseAPIClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   Check the health of the API Notes service
   */
  async getHealthStatus() {
    return await this.request.get(API_ROUTES.healthCheck);
  }

  /**
   * Register a new user account
   * @param userData Object containing name, email, and password
   */
  async registerUser(userData: Record<string, string>) {
    return await this.request.post(API_ROUTES.users.register, {
      data: userData,
    });
  }

  /**
   Log in user account
   */

  async loginUser(userData: Record<string, string>) {
    return await this.request.post(API_ROUTES.users.login, {
      data: userData,
    });
  }

  /**
   Verify token
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

  /**
   Password
   */
  async forgotPassword(payload: { email: string }) {
    const response = await this.request.post(API_ROUTES.users.forgotPassword, {
      data: payload,
    });
    return response;
  }

  async verifyResetPasswordToken(payload: { token: string }) {
    const response = await this.request.post(
      API_ROUTES.users.verifyResetToken,
      {
        data: payload,
      },
    );
    return response;
  }

  async resetPassword(payload: Record<string, string>) {
    const response = await this.request.post(API_ROUTES.users.resetPassword, {
      data: payload,
    });
    return response;
  }

  async changePassword(token: string, payload: Record<string, string>) {
    const response = await this.request.post(API_ROUTES.users.changePassword, {
      headers: {
        "x-auth-token": token,
      },
      data: payload,
    });
    return response;
  }
}
