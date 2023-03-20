import io from 'socket.io-client';

class Socket {
  constructor() {
    this.socket = null;
  }

  connect(url) {
    if (!this.socket) {
      this.socket = io(url, {
        transports: ['websocket'],
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  send(message) {
    if (this.socket) {
      this.socket.emit('message', message);
    }
  }

  emit(eventName, payload) {
    if (this.socket) {
      this.socket.emit(eventName, payload);
    }
  }

  on(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, callback);
    }
  }
}

export { Socket };
