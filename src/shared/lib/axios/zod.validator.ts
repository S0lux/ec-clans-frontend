import { AxiosResponse } from "axios";
import { ZodType } from "zod";

export const zodValidate = <T>(schema: ZodType<T>) => {
  return (response: AxiosResponse): AxiosResponse<T> => {
    const parsed = schema.parse(response.data);
    return { ...response, data: parsed };
  };
};
