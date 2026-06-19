export const API_ROUTES = {
  // --- HEALTH CATEGORY ---
  healthCheck: "health-check", // Removed leading slash

  // --- USERS CATEGORY ---
  users: {
    register: "users/register", // Removed leading slash
    login: "users/login", // Removed leading slash
    profile: "users/profile",
    forgotPassword: "users/forgot-password",
    verifyResetToken: "users/verify-reset-password-token",
    resetPassword: "users/reset-password",
    changePassword: "users/change-password",
    logout: "users/logout",
    deleteAccount: "users/delete-account",
  },

  // --- NOTES CATEGORY ---
  notes: {
    base: "notes", // Removed leading slash
    byId: (id: string) => `notes/${id}`,
  },
} as const;
