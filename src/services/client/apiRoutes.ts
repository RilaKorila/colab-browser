import { Failed, Succeed, Result } from "../../../types";

export async function handleFetchResolve<T>(res: Response): Promise<Result<T>> {
  const { data, err }: Result<T> = await res.json();
  if (err) {
    return { data, err: { message: err.message } } as Failed;
  }
  return { data, err: null } as Succeed<T>;
}

export function handleFetchReject(err: unknown) {
  if (err instanceof Error) {
    return { data: null, err: { message: err.message } };
  }

  throw err;
}
