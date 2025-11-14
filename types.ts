
export type UserRole = 'owner' | 'member';

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  location: string;
  fitnessGoal: string;
}

export interface User {
  uid: string;
  email: string;
  role: UserRole | null;
  profile?: UserProfile;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  description: string;
}

export interface Gym {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  contact: string;
  description: string;
  facilities: string[];
  membershipPlans: MembershipPlan[];
  photos: string[];
}

export type RequestStatus = 'pending' | 'approved' | 'declined';

export interface MembershipRequest {
  id: string;
  gymId: string;
  gymName: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: MembershipPlan;
  status: RequestStatus;
  requestDate: string;
}

export type MembershipStatus = 'active' | 'expired';

export interface Membership {
  id: string;
  gymId: string;
  gymName: string;
  userId: string;
  userName: string;
  plan: MembershipPlan;
  startDate: string;
  endDate: string;
  status: MembershipStatus;
}

export type AuthView = 'login' | 'signup';
