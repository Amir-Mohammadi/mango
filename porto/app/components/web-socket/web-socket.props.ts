export interface WebSocketProps {
  /**
   * webSocket url
   */
  url: string;

  /**
   * reconnect
   */
  reconnect?: boolean;

  /**
   * onOpen function
   */
  onOpen?: (ws: WebSocket) => void;

  /**
   * onMessage function
   */
  onMessage?: (event: any) => void;

  /**
   * onError function
   */
  onError?: (error: any) => void;

  /**
   * onClose function
   */
  onClose?: () => void;
}
