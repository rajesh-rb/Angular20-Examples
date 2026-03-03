// Roles supported by the demo app
// Used for authorization checks (later) and UI display
export type UserRole = 'admin' | 'user';

// Login request coming from Login UI (email + password)
export type LoginRequest = {
  email: string;
  password: string;
};

// Minimal authenticated identity stored after login
// - used by guards and navbar
// - does NOT include password or profile fields
export type AuthUser = {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
};

// Response returned after attempting login
// - UI shows message
// - user is returned only on success
export type LoginResponse = {
  isSuccess: boolean;
  message: string;
  user?: AuthUser;
};

// Profile data used by Profile & Edit Profile pages
// Kept separate from AuthUser to show good separation:
// AuthUser = login identity, UserProfile = editable user info
export type UserProfile = {
  userId: number;
  fullName: string;
  phone: string;
  city: string;
  bio: string;
};

// This simulates a single Users table that stores both:
// - login fields (email/password/role)
// - profile fields (fullName/phone/city/bio)
//
// NOTE: Password is stored only for demo login validation.
// Real apps never store or handle plain passwords on frontend.
export type UserRecord = {
  id: number;
  email: string;
  password: string;
  role: UserRole;

  // Profile fields
  fullName: string;
  phone: string;
  city: string;
  bio: string;
};
