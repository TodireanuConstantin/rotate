import { describe, expect, it } from "@jest/globals";

import { rotate } from "./rotate";

describe("rotate", () => {
  it("should return correct value with 1x1", () => {
    // Arrange
    const input = [1];

    // Act
    const output = rotate(input);

    // Assert
    expect(output).toStrictEqual([1]);
  });

  it("should return correct value with 2x2", () => {
    const input = [40, 20, 90, 10];

    const output = rotate(input);

    expect(output).toStrictEqual([20, 10, 40, 90]);
  });

  it("should return correct value with 3x3", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const output = rotate(input);

    expect(output).toStrictEqual([2, 3, 6, 1, 5, 9, 4, 7, 8]);
  });

  it("should return correct value with 4x4", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const output = rotate(input);

    expect(output).toStrictEqual([
      2, 3, 4, 8, 1, 7, 11, 12, 5, 6, 10, 16, 9, 13, 14, 15,
    ]);
  });

  it("should return correct value with 5x5", () => {
    const input = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25,
    ];

    const output = rotate(input);

    expect(output).toStrictEqual([
      2, 3, 4, 5, 10, 1, 8, 9, 14, 15, 6, 7, 13, 19, 20, 11, 12, 17, 18, 25, 16,
      21, 22, 23, 24,
    ]);
  });

  it("should return correct value with 6x6", () => {
    const input = [
      100, 101, 102, 103, 104, 105, 119, 1, 2, 3, 4, 106, 118, 5, 6, 7, 8, 107,
      117, 9, 10, 11, 12, 108, 116, 13, 14, 15, 16, 109, 115, 114, 113, 112,
      111, 110,
    ];

    const output = rotate(input);

    expect(output).toStrictEqual([
      101, 102, 103, 104, 105, 106, 100, 2, 3, 4, 8, 107, 119, 1, 7, 11, 12,
      108, 118, 5, 6, 10, 16, 109, 117, 9, 13, 14, 15, 110, 116, 115, 114, 113,
      112, 111,
    ]);
  });
});
