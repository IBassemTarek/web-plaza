import { verifyJwt } from "@/lib/jwt";

const isAuthenticatedUser = (accessToken) => {
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  } else {
    if (verifyJwt(accessToken)) {
      return verifyJwt(accessToken);
    }
  }
};

export { isAuthenticatedUser };
