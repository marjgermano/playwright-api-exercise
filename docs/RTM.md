# Requirement Traceability Matrix (RTM)

**Project:** Expand Testing Notes API  
**Automation Framework:** Playwright (TypeScript)

### Status Legend

- 🟢 **Completed:** Scripted, locally verified, and passing cleanly in CI/CD.
- ⚪ **Pending:** Framework structure ready, waiting for execution scripting.

---

| Req ID          | Test Case ID | Component / Module | Business Requirement Description      | HTTP Method | API Endpoint                         | Status       |
| :-------------- | :----------- | :----------------- | :------------------------------------ | :---------- | :----------------------------------- | :----------- |
| **REQ-HLTH-01** | `TC-HLTH-01` | **Health**         | Verify core service availability.     | `GET`       | `/health-check`                      | 🟢 Completed |
| **REQ-USER-01** | `TC-USER-01` | **Users**          | Account registration engine.          | `POST`      | `/users/register`                    | ⚪ Pending   |
| **REQ-USER-02** | `TC-USER-01` | **Users**          | Session authentication engine.        | `POST`      | `/users/login`                       | ⚪ Pending   |
| **REQ-USER-03** | `TC-USER-02` | **Users**          | View secure profile details.          | `GET`       | `/users/profile`                     | ⚪ Pending   |
| **REQ-USER-04** | `TC-USER-02` | **Users**          | Update profile information.           | `PATCH`     | `/users/profile`                     | ⚪ Pending   |
| **REQ-USER-05** | `TC-USER-03` | **Users**          | Request a password reset link.        | `POST`      | `/users/forgot-password`             | ⚪ Pending   |
| **REQ-USER-06** | `TC-USER-03` | **Users**          | Verify password reset tokens.         | `POST`      | `/users/verify-reset-password-token` | ⚪ Pending   |
| **REQ-USER-07** | `TC-USER-03` | **Users**          | Reset password with token.            | `POST`      | `/users/reset-password`              | ⚪ Pending   |
| **REQ-USER-08** | `TC-USER-04` | **Users**          | Change password while active.         | `POST`      | `/users/change-password`             | ⚪ Pending   |
| **REQ-USER-09** | `TC-USER-01` | **Users**          | Secure session termination (Logout).  | `DELETE`    | `/users/logout`                      | ⚪ Pending   |
| **REQ-USER-10** | `TC-USER-05` | **Users**          | Permanent account destruction.        | `DELETE`    | `/users/delete-account`              | ⚪ Pending   |
| **REQ-NOTE-01** | `TC-NOTE-01` | **Notes**          | Create a brand new note entry.        | `POST`      | `/notes`                             | ⚪ Pending   |
| **REQ-NOTE-02** | `TC-NOTE-01` | **Notes**          | Fetch all notes for active session.   | `GET`       | `/notes`                             | ⚪ Pending   |
| **REQ-NOTE-03** | `TC-NOTE-01` | **Notes**          | Fetch one single note by its ID.      | `GET`       | `/notes/{id}`                        | ⚪ Pending   |
| **REQ-NOTE-04** | `TC-NOTE-01` | **Notes**          | Full text update of an existing note. | `PUT`       | `/notes/{id}`                        | ⚪ Pending   |
| **REQ-NOTE-05** | `TC-NOTE-01` | **Notes**          | Toggle completion status patch.       | `PATCH`     | `/notes/{id}`                        | ⚪ Pending   |
| **REQ-NOTE-06** | `TC-NOTE-01` | **Notes**          | Delete a single note by its ID.       | `DELETE`    | `/notes/{id}`                        | ⚪ Pending   |
