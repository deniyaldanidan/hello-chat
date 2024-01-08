import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { accessPayloadParser, refreshPayloadParser } from './myParsers';

const ACCESS_SECRET = process.env?.ACCESS_SECRET;
const REFRESH_SECRET = process.env?.REFRESH_SECRET;

if (typeof ACCESS_SECRET === "undefined" || typeof REFRESH_SECRET === "undefined") {
    console.log(ACCESS_SECRET, REFRESH_SECRET);
    throw new Error("Access secret or Refresh secret is missing in .env");
}

export const JWT_SECRETS = { ACCESS_SECRET, REFRESH_SECRET };

export type AccessPayload = z.infer<typeof accessPayloadParser>;

export type RefreshPayload = z.infer<typeof refreshPayloadParser>

export const accessMaxAgeSeconds = 6 * 60 * 60;
export const refreshMaxAgeSeconds = 12 * 60 * 60;

export const signAccess = (payload: AccessPayload) => jwt.sign(payload, ACCESS_SECRET, { expiresIn: accessMaxAgeSeconds });

export const signRefresh = (payload: RefreshPayload) => jwt.sign(payload, REFRESH_SECRET, { expiresIn: refreshMaxAgeSeconds });