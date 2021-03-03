type Channel = 'snackbar';

type Listener = (...args: any[]) => any;

interface Subscribers {
  [key: string]: Array<Listener>;
}

class Bus {
  private subscribers: Subscribers;

  constructor() {
    this.subscribers = {};
  }

  private checkListeners(channel: Channel): never | void {
    if (!this.subscribers[channel]) {
      throw new Error(`There is no listeners for channel: ${channel}`);
    }
  }

  subscribe(channel: Channel, listener: Listener) {
    if (!this.subscribers[channel]) {
      this.subscribers[channel] = [];
    }

    this.subscribers[channel].push(listener);
  }

  unsibscribe(channel: Channel, listener: Listener) {
    this.checkListeners(channel);

    this.subscribers[channel] = this.subscribers[channel]
      .filter((fn) => (fn !== listener
        ? fn
        : false
      ));
  }

  notify(channel: Channel, ...args: any[]) {
    this.checkListeners(channel);

    this.subscribers[channel].forEach((fn) => fn(...args));
  }
}

export const EventBus = new Bus();
