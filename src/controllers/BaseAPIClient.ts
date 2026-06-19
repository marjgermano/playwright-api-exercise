import { APIRequestContext } from "@playwright/test";

export class BaseAPIClient {
  protected request: APIRequestContext;
  protected token: string | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public setAuthToken(token: string): void {
    this.token = token;
  }

  protected getHeaders(
    customHeaders?: Record<string, string>,
  ): Record<string, string> {
    const headers: Record<string, string> = { ...customHeaders };
    if (this.token) {
      headers["x-auth-token"] = this.token;
    }
    return headers;
  }
}
