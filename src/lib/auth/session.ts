import { cookies } from 'next/headers';
import { getIronSession, type IronSession, type SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  cookieName: 'epicdreams_admin',
  password: process.env.ADMIN_SESSION_SECRET || 'complex_password_change_me',
  ttl: 60 * 60 * 12,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};

export type AdminSession = {
  adminId?: number;
};

export async function getAdminSession(): Promise<IronSession<AdminSession>> {
  return getIronSession<AdminSession>(cookies(), sessionOptions);
}
