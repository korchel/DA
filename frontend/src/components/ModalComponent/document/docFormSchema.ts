import { z, ZodType } from "zod";

export interface IDocForm {
  title: string,
  number: number,
  content: string,
  authorId: number,
  type_id: number,
  available_for: number[],
  public_document: boolean,
}

export const docFormSchema: ZodType<IDocForm> = z.object({
  title: z
    .string({
      required_error: "Обязательное поле",
    })
    .min(2, { message: "Не менее 2 символов" })
    .max(50, { message: "Не более 50 символов" }),
  number: z.number({
      required_error: "Обязательное поле",
    }
  ),
  content: z.string({
    required_error: "Обязательное поле",
    invalid_type_error: "Years of Experience is required",
  }),
  authorId: z.number(), //???
  type_id: z.number({
    required_error: "Обязательное поле",
  }),
  available_for: z.array(z.number()),
  public_document: z.boolean(),
});