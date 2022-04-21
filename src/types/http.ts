export interface HTTPError {
  response: {
    data: {
      message?: string;
      errors?: Record<string, Array<string>>;
    };
  };
}

export interface HTTPResponseBody<DataType = unknown> {
  data?: {
    data?: DataType;
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: unknown[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
  };
}

export interface APIResourceMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: unknown[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
