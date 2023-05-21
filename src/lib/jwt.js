import jwt from "jsonwebtoken";

export function signJwtAccessToken(payload) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(
    {
      data: payload,
    },
    secret_key,
    { expiresIn: "90000000000000000000000000000000000000000000d" }
  );

  return token;
}

export function verifyJwt(token) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
