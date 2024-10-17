import { AxiosInstance } from 'axios';

export class RateLimiter {
  private queue: (() => Promise<any>)[] = [];
  private isProcessing = false;
  private lastRequestTime = 0;
  private requestsInLastSecond = 0;

  constructor(private maxRequestsPerSecond: number) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      if (now - this.lastRequestTime >= 1000) {
        this.requestsInLastSecond = 0;
        this.lastRequestTime = now;
      }

      if (this.requestsInLastSecond < this.maxRequestsPerSecond) {
        const request = this.queue.shift();
        if (request) {
          this.requestsInLastSecond++;
          await request();
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000 - (now - this.lastRequestTime)));
      }
    }

    this.isProcessing = false;
  }
}

export function applyRateLimiter(axiosInstance: AxiosInstance, maxRequestsPerSecond: number) {
  const rateLimiter = new RateLimiter(maxRequestsPerSecond);

  axiosInstance.interceptors.request.use(async (config) => {
    await rateLimiter.execute(async () => {});
    return config;
  });

  return axiosInstance;
}