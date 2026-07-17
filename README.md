# Campus Lost & Found Tracker

## Project Concept
The Campus Lost & Found Tracker is a specialized platform designed to streamline the reporting, tracking, and claiming of misplaced items within the school campus. Students can post lost or found items, while security administrators manage and verify ownership claims to ensure items return safely to their rightful owners.

## Defined Core Types & Interfaces
- **Role**: Enum containing authorized access levels (`student`, `security_admin`).
- **ClaimStatus**: Runtime Enum handling the lifecycle verification stage (`Pending`, `Verified`, `Rejected`).
- **User**: Represents application users and profiles.
- **LostFoundItem**: Defines structural parameters for items logged into the tracker.
- **Claim**: Structure tracking formal requests to claim an item.
- **ApiResponse<T>**: A reusable generic wrapper format handling uniform server responses.
- **ItemUpdate & ItemPreview**: Utility types managing specific data fields for update payloads and item galleries.

## Setup and Execution
To set up the project and see the code running, use the following commands in your terminal:

```bash
# Install dependencies
npm install

# Run the TypeScript entry point
npx ts-node src/index.ts