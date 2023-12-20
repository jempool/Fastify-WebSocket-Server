import messagesService from "../../src/services/messages.service";
import messagesController from "../../src/controllers/messages.controller";

jest.mock("../../src/services/messages.service", () => ({
  getAllHistory: jest.fn(),
}));

describe("Messages Controller", () => {
  const mockMessages = [
    {
      message: "Hello",
      handle: "test",
    },
    {
      message: "Bye",
      handle: "bot",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("history should return an array of messages", async () => {
    (messagesService.getAllHistory as jest.Mock).mockResolvedValue(
      mockMessages
    );

    const fakeThisContext = {
      authorize: jest.fn().mockResolvedValue(true),
    };

    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await messagesController.history.bind(fakeThisContext)(
      {} as any,
      reply as any
    );

    expect(fakeThisContext.authorize).toBeCalledTimes(1);
    expect(messagesService.getAllHistory).toBeCalledTimes(1);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockMessages);
  });

  it("history should handle errors by sending an error message", async () => {
    const errorMessage = "Failed to fetch messages";
    (messagesService.getAllHistory as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const fakeThisContext = {
      authorize: jest.fn().mockResolvedValue(true),
    };

    const reply = {
      send: jest.fn(),
      code: jest.fn().mockReturnThis(),
    };

    await messagesController.history.bind(fakeThisContext)(
      {} as any,
      reply as any
    );

    expect(fakeThisContext.authorize).toHaveBeenCalled();
    expect(reply.send).toHaveBeenCalledWith(expect.any(Error));
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: errorMessage,
      })
    );
  });
});
