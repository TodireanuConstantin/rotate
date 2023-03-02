import { z } from "zod";
import { accessSync, constants } from "fs";
import { resolve } from "path";

// --- row ---

const row = z.object({
  id: z.string(),
  json: z
    .string()
    .transform((value, context) => {
      try {
        const parsed = JSON.parse(value);

        if (!parsed) {
          context.addIssue({ code: z.ZodIssueCode.custom });

          return z.NEVER;
        }

        const result = z.array(z.number()).safeParse(parsed);

        if (!result.success) {
          context.addIssue({ code: z.ZodIssueCode.custom });

          return z.NEVER;
        }

        return result.data;
      } catch {
        context.addIssue({ code: z.ZodIssueCode.custom });

        return z.NEVER;
      }
    })
    .refine(
      (value) => value.length > 0 && Number.isInteger(Math.sqrt(value.length))
    ),
});

export type Row = z.infer<typeof row>;

// --- cli args --

const argv = z
  .array(z.string())
  .refine((value) => value.length === 3)
  .transform((value, context) => {
    const file = value[2];

    const result = z.string().url().safeParse(file);

    if (result.success) {
      return { path: result.data, isUrl: true };
    }

    try {
      const path = resolve(file);

      accessSync(path, constants.R_OK);

      return { path, isUrl: false };
    } catch {
      context.addIssue({ code: z.ZodIssueCode.custom });

      return z.NEVER;
    }
  });

export type Argv = z.infer<typeof argv>;

// --- export ---

export const validator = {
  row,
  argv,
};
