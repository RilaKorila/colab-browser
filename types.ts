export type Succeed<T> = {
  data: T;
  err: null;
};
export type Failed = {
  data: null;
  err: { message: string };
};
export type Result<T> = Succeed<T> | Failed;
