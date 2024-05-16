import { ZodObject, ZodError } from "zod";
import { APIError } from "./error/api_error";

export function validateRequest<T>(
  request: Request,
  schema: ZodObject<any>,
  fromObject: (obj: any) => T
): T {
  const body = request.body;
  try {
    return fromObject(schema.parse(body));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new APIError(error.errors[0].message, 400);
    }
    throw new APIError("Fail to parse route schema. Unkown reason.", 400);
  }
}