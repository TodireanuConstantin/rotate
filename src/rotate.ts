export function rotate(input: number[]): number[] {
  const len = Math.sqrt(input.length);

  const row = { idx: 0, len };
  const column = { idx: 0, len };

  while (row.idx < row.len && column.idx < column.len) {
    if (row.idx + 1 == row.len || column.idx + 1 == column.len) {
      break;
    }

    const first = input[getIndex({ row: row.idx, column: column.idx, len  })];

    for (let iterator = column.idx + 1; iterator < column.len; iterator += 1) {
      const index = getIndex({ row: row.idx, column: iterator, len });

      input[index - 1] = input[index];
    }

    input[getIndex({ row: row.idx, column: column.len - 1, len })] = first;

    row.idx++;

    for (let iterator = row.idx; iterator < row.len; iterator += 1) {
      const index = getIndex({ row: iterator, column: column.len - 1, len });

      input[index - len] = input[index];
    }

    input[getIndex({ row: row.len - 1, column: column.len - 1, len })] = first;

    column.len--;

    for (let iterator = column.len; iterator >= column.idx; iterator -= 1) {
      const index = getIndex({ row: row.len - 1, column: iterator, len });

      input[index] = input[index - 1];
    }

    input[getIndex({ row: row.len - 1, column: column.idx, len })] = first;

    row.len--;

    for (let iterator = row.len; iterator >= row.idx; iterator -= 1) {
      const index = getIndex({ row: iterator, column: column.idx, len });

      input[index] = input[index - len];
    }

    input[getIndex({ row: row.idx, column: column.idx, len })] = first;

    column.idx++;
  }

  return input;
}

// -- internal --

type GetIndexOpts = {
  row: number;
  column: number;
  len: number;
};

function getIndex({ row, column, len }: GetIndexOpts) {
  return row * len + column;
}
