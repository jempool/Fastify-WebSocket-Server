import {
  WEBSOCKETS_CHAT_EVENT,
  WEBSOCKETS_TYPING_EVENT,
} from "../../src/utils/constants";
import websocketHandler from "../../src/webSockets/webSockets";

jest.mock("../../src/services/db.service", () => ({
  addMessage: jest.fn().mockResolvedValue({}),
}));

describe("WebSocket Handler", () => {
  let mockServer: any;
  let mockSocket: any;

  beforeEach(() => {
    mockSocket = {
      id: "socket-id",
      on: jest.fn(),
      emit: jest.fn(),
      broadcast: {
        emit: jest.fn(),
      },
    };

    mockServer = {
      io: {
        on: jest.fn((event: string, handler: Function) => {
          if (event === "connection") {
            handler(mockSocket);
          }
        }),
        sockets: {
          emit: jest.fn(),
        },
      },
    };

    jest.clearAllMocks();
  });

  it("should set up WebSocket connection and handlers", async () => {
    await websocketHandler(mockServer);

    expect(mockServer.io.on).toHaveBeenCalledWith(
      "connection",
      expect.any(Function)
    );

    expect(mockSocket.on).toHaveBeenCalledWith(
      WEBSOCKETS_CHAT_EVENT,
      expect.any(Function)
    );
    expect(mockSocket.on).toHaveBeenCalledWith(
      WEBSOCKETS_TYPING_EVENT,
      expect.any(Function)
    );
  });
});
