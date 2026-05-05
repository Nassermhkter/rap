# Security Specification for Rap-X

## Data Invariants
1. A Track must have an associated `artistName` and `audioUrl`.
2. A News article must have `title`, `content`, and `image`.
3. Only verified admins (email `nassermokhter50@gmail.com`) can perform write operations.
4. All timestamps must be server-generated.

## The "Dirty Dozen" Payloads (Deny Cases)
1. **Unauthorized Create**: Non-admin user tries to create a Track.
2. **Identity Spoofing**: User tries to set their own UID as an admin manually.
3. **Shadow Field injection**: Admin tries to add a `verified` field to a Track that isn't in the schema.
4. **Invalid Type**: A track with a numeric `title`.
5. **ID Poisoning**: Creating an artist with a 2KB long ID string.
6. **Bypassing Invariant**: Creating a Track without an `audioUrl`.
7. **Timestamp Fraud**: Client providing a `createdAt` date in the past.
8. **PII Leak**: Non-admin user trying to read the `admins` collection.
9. **Relational Orphan**: Creating a Track with an `artistId` that doesn't exist in the `artists` collection.
10. **State Shortcut**: Updating a field that should be immutable (like `createdAt`).
11. **Malicious Query**: Trying to list all users' private info (if we had any).
12. **Denial of Wallet**: Sending a massive array of tags (e.g. 10,000) in a news article.

## Rules Draft Strategy
Using a "Master Gate" pattern. `admins` collection will be the source of truth for write access.
We will bootstrap `nassermokhter50@gmail.com` as an admin via a manual entry or a special rule for the first time.
Actually, I'll use the email check directly in the rules for this specific admin as requested.
