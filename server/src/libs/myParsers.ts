import validator from "validator";
import { z } from "zod";

export const jwtParser = z.string().trim().refine(val => validator.isJWT(val));
export const bearerJwtParser = z.string().trim().startsWith("Bearer ").transform(val => val.split(" ")[1]).refine(val => validator.isJWT(val));

export const usernameParser = z.string().trim().min(2).max(24).refine(val => validator.isAlphanumeric(val, "en-US", { ignore: "-_" }));

export const nameParser = z.string().trim().min(2).max(30).refine(val => validator.isAlpha(val, "en-US", { ignore: " " }));

export const passwordParser = z.string().trim().min(6).max(30);

export const refreshPayloadParser = z.object({
    username: usernameParser
})

export const accessPayloadParser = z.object({
    username: usernameParser,
    name: nameParser
})