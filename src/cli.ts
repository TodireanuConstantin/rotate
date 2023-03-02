import { createReadStream } from "fs";
import { parse, format } from "fast-csv";

import { validator } from "./validator";
import { rotate } from "./rotate";

type Input = {
  id: string;
  json: string;
};

type Output = {
  id: string;
  json: string;
  is_valid: boolean;
};

function main() {
  const result = validator.argv.safeParse(process.argv);

  if (!result.success) {
    process.exit(1);
  }

  createReadStream(result.data)
    .pipe(parse({ headers: true }))
    .on("error", () => process.exit(1))
    .pipe(format<Input, Output>({ headers: true }))
    .transform((row, next): void => {
      const result = validator.row.safeParse(row);

      if (!result.success) {
        return next(null, {
          id: row.id,
          json: '[]',
          is_valid: false,
        });
      }

      const { id, json } = result.data;

      const output = rotate(json);

      return next(null, {
        id,
        json: `[${output}]`,
        is_valid: true,
      });
    })
    .pipe(process.stdout)
    .on("end", () => process.exit());
}

main();
