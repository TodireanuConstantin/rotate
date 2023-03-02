### Rotate

```sh
    node cli.js [path_to_csv_file]
```

Usage:

```sh
npm i

npm run build

# Example path 
node ./dist/cli.js ./input/input.csv > ./input/output.csv

#Example url
node ./dist/cli.js https://raw.githubusercontent.com/TodireanuConstantin/rotate/main/input/input.csv  > ./input/output.csv
```

Run tests:

```sh
npm run test

#  PASS  src/rotate.test.ts
#   rotate
#       ✓ should return correct value with 4x4
#       ✓ should return correct value with 5x5
#    ...
#  PASS  src/validator.test.ts
#    validator
#       row
#           ✓ should be invalid when input 'null' 
#           ✓  should be invalid when no square matrix 82
#     ...
#
```

Documentation:

- [fast-csv](https://www.c2fo.io/fast-csv/docs/introduction/getting-started) - CSV Parser and Formatter
- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference

