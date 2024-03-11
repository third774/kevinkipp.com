import * as jose from "jose";

export async function signJwt(rawSecret: string, payload: any) {
	const secret = new TextEncoder().encode(rawSecret);
	const alg = "HS256";

	return new jose.SignJWT(payload)
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.sign(secret);
}
