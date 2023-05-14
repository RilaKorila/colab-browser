import { z } from "zod";

// Help Formに関する zod schema
export const helpFormSchema = z.object({
  username: z.string().nonempty({ message: "名前は必須です" }),
  email: z.string().email("メールアドレスの形が正しくありません"),
  content: z.string().nonempty({ message: "質問内容は必須です" }),
});

export type HelpFormInput = z.infer<typeof helpFormSchema>;

// loginに関するzod schema
export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginInput = z.infer<typeof loginSchema>;
