import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { getEnv } from "./env";

const secret = () => new TextEncoder().encode(getEnv().JWT_SECRET);

/** expiresIn: durasi ('15m') atau epoch detik absolut (number). */
export async function signToken(payload: JWTPayload, expiresIn: string | number = "15m") {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret());
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
  return payload;
}
