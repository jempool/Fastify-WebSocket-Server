import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbService from "../../src/services/db.service";
import { BadRequestError } from "../../src/utils/errors";
import authService from "../../src/services/auth.service";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  compareSync: jest.fn(),
  genSaltSync: jest.fn(),
  hashSync: jest.fn(),
}));

jest.mock("../../src/services/db.service", () => ({
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
}));

describe("Auth Service", () => {
  const userData = {
    email: "test@example.com",
    name: "TestUser",
    password: "hashedpassword",
  };

  const userObject = {
    toObject: jest.fn(() => userData),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should throw a BadRequestError if email not found or password mismatch", async () => {
      (dbService.getUserByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

      const fakeRequest = {
        body: {
          email: userData.email,
          password: userData.password,
        },
      };

      const fakeReply = {
        locals: {},
      };

      await expect(
        authService.login(fakeRequest as any, fakeReply as any)
      ).rejects.toThrow(BadRequestError);
    });
  });

  describe("signup", () => {
    it("should throw a BadRequestError if email is already registered", async () => {
      (dbService.getUserByEmail as jest.Mock).mockResolvedValue(userObject);
      const fakeRequest = {
        body: {
          email: userData.email,
          name: userData.name,
          password: "newpassword",
        },
      };
      const fakeReply = {
        locals: {},
      };

      await expect(
        authService.signup(fakeRequest as any, fakeReply as any)
      ).rejects.toThrow(BadRequestError);
    });
  });

  describe("refreshToken", () => {
    it("should throw an UnauthorizedError if the token is invalid", async () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      const fakeRequest = {
        body: {
          email: userData.email,
          refreshToken: "invalidtoken",
        },
      };
      const fakeReply = {
        locals: {},
      };

      await expect(
        authService.refreshToken(fakeRequest as any, fakeReply as any)
      ).rejects.toThrow("Invalid token");
    });
  });
});
