import { ZodObject, ZodError } from "zod";
import { APIError } from "./error/api_error";

export async function validateRequest<T>(
  body: any,
  schema: ZodObject<any>,
  fromObject: (obj: any) => T
): Promise<T> {
  try {
    return fromObject(schema.parse(body));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new APIError(error.errors[0].message, 400);
    }
    console.log(error);
    throw new APIError("Fail to parse route schema. Unkown reason.", 400);
  }
}