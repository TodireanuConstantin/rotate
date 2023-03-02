import { describe, expect, it } from "@jest/globals";
import * as fs from "fs";
import { resolve } from "path";
import { validator } from "./validator";

jest.mock("fs");

describe("validator", () => {
  describe("row", () => {
    it.each([1, 4, 16, 81])("should be valid when square matrix %i", (no) => {
      // Arrange
      const input = getRowInput(no);

      // Act
      const { success } = validator.row.safeParse(input);

      // Assert
      expect(success).toBe(true);
    });

    it.each([0, 3, 8, 82])(
      "should be invalid when no square matrix %i",
      (no) => {
        const input = getRowInput(no);

        const { success } = validator.row.safeParse(input);

        expect(success).toBe(false);
      }
    );

    it.each([
      "",
      "null",
      "undefined",
      "{",
      JSON.stringify(["1", "2", "3", "4"]),
      JSON.stringify([{ id: "1" }]),
    ])("should be invalid when input '%s'", (json) => {
      const input = { id: "1", json };

      const { success } = validator.row.safeParse(input);

      expect(success).toBe(false);
    });
  });

  describe("argv", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should be valid", () => {
      const spy = jest.spyOn(fs, "accessSync").mockReturnValue(undefined);

      const input = ["arg0", "arg1", "arg2"];

      const { success } = validator.argv.safeParse(input);

      expect(success).toBe(true);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(resolve(input[2]), fs.constants.R_OK);
    });

    it("should be invalid when no 3 args", () => {
      const spy = jest.spyOn(fs, "accessSync");

      const input = ["arg0", "arg1"];

      const { success } = validator.argv.safeParse(input);

      expect(success).toBe(false);

      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("should be invalid when no access", () => {
      const spy = jest.spyOn(fs, "accessSync").mockImplementation(() => {
        throw new Error();
      });

      const input = ["arg0", "arg1", "arg2"];

      const { success } = validator.argv.safeParse(input);

      expect(success).toBe(false);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(resolve(input[2]), fs.constants.R_OK);
    });
  });
});

// --- internal ---

function getRowInput(no: number) {
  return {
    id: "1",
    json: JSON.stringify(Array.from({ length: no }, (_, idx) => idx + 1)),
  };
}
