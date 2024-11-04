export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'READER' | 'CREATOR' | null;
  biography?: string;
}
