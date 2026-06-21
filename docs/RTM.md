# Requirement Traceability Matrix (RTM)

**Project:** Expand Testing Notes API Automation  
**Automation Framework:** Playwright (TypeScript)

### Status Legend

- 🟢 **Completed:** Scripted, locally verified, and passing cleanly in CI/CD.
- ⚪ **Pending:** Framework structure ready, waiting for execution scripting.

---

| Req ID          | Test Case ID | Component | Business Requirement Description                                                      | HTTP Method | API Endpoint                         | Status |
| :-------------- | :----------- | :-------- | :------------------------------------------------------------------------------------ | :---------- | :----------------------------------- | :----: |
| **REQ-HLTH-01** | TC-HLTH-01   | Health    | Verify core service availability returns `200 OK`.                                    | GET         | `/health-check`                      |   🟢   |
| **REQ-USER-01** | TC-USER-01   | Users     | Verify successful user registration with valid payload (`201`).                       | POST        | `/users/register`                    |   🟢   |
| **REQ-USER-01** | TC-USER-02   | Users     | Verify registration fails with duplicate email address (`400`).                       | POST        | `/users/register`                    |   🟢   |
| **REQ-USER-01** | TC-USER-03   | Users     | Verify registration fails with missing required fields / invalid data format (`400`). | POST        | `/users/register`                    |   🟢   |
| **REQ-USER-02** | TC-USER-04   | Users     | Verify successful login with correct registered credentials (`200`).                  | POST        | `/users/login`                       |   ⚪   |
| **REQ-USER-02** | TC-USER-05   | Users     | Verify login fails with incorrect or un-registered credentials (`400`).               | POST        | `/users/login`                       |   ⚪   |
| **REQ-USER-03** | TC-USER-06   | Users     | Verify viewing secure profile details with valid `x-auth-token` (`200`).              | GET         | `/users/profile`                     |   ⚪   |
| **REQ-USER-03** | TC-USER-07   | Users     | Verify profile retrieval fails if `x-auth-token` is missing or invalid (`401`).       | GET         | `/users/profile`                     |   ⚪   |
| **REQ-USER-04** | TC-USER-08   | Users     | Verify updating profile information with a valid payload (`200`).                     | PATCH       | `/users/profile`                     |   ⚪   |
| **REQ-USER-04** | TC-USER-09   | Users     | Verify profile updates fail if payload values fail validation rules (`400`).          | PATCH       | `/users/profile`                     |   ⚪   |
| **REQ-USER-05** | TC-USER-10   | Users     | Verify requesting a password reset link with a valid user email (`200`).              | POST        | `/users/forgot-password`             |   ⚪   |
| **REQ-USER-06** | TC-USER-11   | Users     | Verify reset password token verification with a valid token (`200`).                  | POST        | `/users/verify-reset-password-token` |   ⚪   |
| **REQ-USER-07** | TC-USER-12   | Users     | Verify resetting password with valid token and strong password (`200`).               | POST        | `/users/reset-password`              |   ⚪   |
| **REQ-USER-08** | TC-USER-13   | Users     | Verify changing account password while logged in successfully (`200`).                | POST        | `/users/change-password`             |   ⚪   |
| **REQ-USER-09** | TC-USER-14   | Users     | Verify secure session termination invalidates token on logout (`200`).                | DELETE      | `/users/logout`                      |   ⚪   |
| **REQ-USER-10** | TC-USER-15   | Users     | Verify permanent account destruction deletes all user profile data (`200`).           | DELETE      | `/users/delete-account`              |   ⚪   |
| **REQ-NOTE-01** | TC-NOTE-01   | Notes     | Verify creating a brand new note entry with title, description, category (`200`).     | POST        | `/notes`                             |   ⚪   |
| **REQ-NOTE-01** | TC-NOTE-02   | Notes     | Verify note creation fails if title or description is missing from body (`400`).      | POST        | `/notes`                             |   ⚪   |
| **REQ-NOTE-02** | TC-NOTE-03   | Notes     | Verify fetching all notes linked to the active authenticated session (`200`).         | GET         | `/notes`                             |   ⚪   |
| **REQ-NOTE-02** | TC-NOTE-04   | Notes     | Verify filtering/searching notes using query parameters (e.g., category) (`200`).     | GET         | `/notes`                             |   ⚪   |
| **REQ-NOTE-03** | TC-NOTE-05   | Notes     | Verify fetching a single note entry using its unique resource ID (`200`).             | GET         | `/notes/{id}`                        |   ⚪   |
| **REQ-NOTE-03** | TC-NOTE-06   | Notes     | Verify single note fetch returns error if note ID does not exist (`404`).             | GET         | `/notes/{id}`                        |   ⚪   |
| **REQ-NOTE-03** | TC-NOTE-07   | Notes     | Verify note fetch fails with a `400` error if the ID format is malformed (`400`).     | GET         | `/notes/{id}`                        |   ⚪   |
| **REQ-NOTE-04** | TC-NOTE-08   | Notes     | Verify complete replacement/update of an existing note via PUT (`200`).               | PUT         | `/notes/{id}`                        |   ⚪   |
| **REQ-NOTE-05** | TC-NOTE-09   | Notes     | Verify partial patch of an existing note (e.g., toggle completed status) (`200`).     | PATCH       | `/notes/{id}`                        |   ⚪   |
| **REQ-NOTE-06** | TC-NOTE-10   | Notes     | Verify successful deletion of a single note entry by its ID (`200`).                  | DELETE      | `/notes/{id}`                        |   ⚪   |
