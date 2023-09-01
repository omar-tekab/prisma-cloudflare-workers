import jwt from '@tsndr/cloudflare-worker-jwt';
import { MiddlewareHandler } from 'hono';
import httpStatus from 'http-status';
import { Environment } from '../../bindings';
import { getConfig } from '../config/config';
import { roleRights, Permission, Role } from '../config/roles';
import { tokenTypes } from '../config/tokens';

const authenticate = async (jwtToken: string, secret: string) => {
  let authorized = false;
  let payload;
  try {
    authorized = await jwt.verify(jwtToken, secret);
    const decoded = jwt.decode(jwtToken);
    payload = decoded.payload;
    authorized = authorized && payload.type === tokenTypes.ACCESS;
  } catch (e) {}
  return { authorized, payload };
};

export const auth = async (c: any) => {
  const credentials = c.req.headers.get('Authorization');
  if (!credentials) {
    throw new Error('Please authenticate');
  }

  const parts = credentials.split(/\s+/);
  if (parts.length !== 2) {
    throw new Error('Please authenticate');
  }

  const jwtToken = parts[1];
  const { authorized, payload } = await authenticate(jwtToken, "omar");

  if (!authorized || !payload) {
    throw new Error('unauthorized');
  } else {
    c.set('payload', payload);
  }
};