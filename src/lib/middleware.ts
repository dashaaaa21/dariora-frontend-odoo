/**
 * Middleware for request/response processing
 */

export type Middleware = (
  req: any,
  next: () => Promise<any>
) => Promise<any>;

export class MiddlewareChain {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(initialData: any): Promise<any> {
    let index = 0;

    const next = async (): Promise<any> => {
      if (index >= this.middlewares.length) {
        return initialData;
      }

      const middleware = this.middlewares[index++];
      return middleware(initialData, next);
    };

    return next();
  }
}

// Common middleware
export const loggingMiddleware: Middleware = async (req, next) => {
  console.log('[API Request]', req);
  const response = await next();
  console.log('[API Response]', response);
  return response;
};

export const authMiddleware: Middleware = async (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers = { ...req.headers, Authorization: `Bearer ${token}` };
  }
  return next();
};

export const cacheMiddleware: Middleware = async (req, next) => {
  const cacheKey = `cache:${req.url}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const response = await next();
  localStorage.setItem(cacheKey, JSON.stringify(response));
  return response;
};
