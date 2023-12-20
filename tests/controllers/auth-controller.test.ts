import jwt from "jsonwebtoken";
import authController from "../../src/controllers/auth.controller";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../../src/utils/constants";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("Auth Controller", () => {
  const user = { id: 1, name: "TestUser" };
  process.env.JWT_SECRET = "testsecret";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("login should generate access and refresh tokens and return them with user data", async () => {
    const reply = {
      send: jest.fn().mockReturnThis(),
      locals: { user },
    };

    (jwt.sign as jest.Mock).mockImplementation(
      (payload, secret, options) => `token-${options.expiresIn}`
    );

    await authController.login({} as any, reply as any);

    expect(jwt.sign).toHaveBeenCalledWith({ user }, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    expect(jwt.sign).toHaveBeenCalledWith({ user }, process.env.JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    expect(reply.send).toHaveBeenCalledWith({
      user,
      accessToken: `token-${ACCESS_TOKEN_EXPIRES_IN}`,
      refreshToken: `token-${REFRESH_TOKEN_EXPIRES_IN}`,
    });
  });

  it("refreshToken should generate a new access token and return it with user data", async () => {
    const reply = {
      send: jest.fn().mockReturnThis(),
      locals: { user },
    };

    (jwt.sign as jest.Mock).mockImplementation(
      (payload, secret, options) => `token-${options.expiresIn}`
    );

    await authController.refreshToken({} as any, reply as any);

    expect(jwt.sign).toHaveBeenCalledWith({ user }, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    expect(reply.send).toHaveBeenCalledWith({
      user,
      accessToken: `token-${ACCESS_TOKEN_EXPIRES_IN}`,
    });
  });
});
