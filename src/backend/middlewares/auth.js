import { verifyJwt } from "@/lib/jwt";

const isAuthenticatedUser = async (request) => {
  const accessToken = request.headers.get("authorization");

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

const authorizeRoles = (...roles) => {
  // return (req, res, next) => {
  //   if (!roles.includes(req.user.role)) {
  //     return next(
  //       new ErrorHandler(
  //         `Role (${req.user.role}) is not allowed to access this resource.`
  //       )
  //     );
  //   }
  //   next();
  // };
};

export { isAuthenticatedUser, authorizeRoles };
