import { IUniqueElement } from "../../src/persistence/db.interfaces";
import newVolatileDB from "../../src/persistence/volatile.db";

describe("VolatileDB", () => {
  interface AnInteface extends IUniqueElement {
    aProperty: string;
  }
  const volatileDB = newVolatileDB<AnInteface>();

  const id = volatileDB.insert({ id: "", aProperty: "a value" });
  describe("when inserting", () => {
    it("should return the new id", () => {
      expect(id).not.toEqual("");
    });
    it("should return an uuid (string)", () => {
      expect(typeof id).toEqual("string");
    });
  });

  describe("when fetching", () => {
    it("should return the element if the given id EXISTS", () => {
      expect(volatileDB.fetch(id)).toMatchObject({ id, aProperty: "a value" });
    });
    it("should return undefined if the element with the given id DOESN'T EXISTS", () => {
      expect(volatileDB.fetch(id + "x")).toBeUndefined();
    });
  });

  describe("when updating", () => {
    it("should update the properties", () => {
      const anotherProperty = "another property";
      const element = volatileDB.fetch(id);
      element!.aProperty = anotherProperty;
      volatileDB.update(element!);
      expect(volatileDB.fetch(id)).toMatchObject({
        id,
        aProperty: anotherProperty,
      });
    });
  });

  describe("when deleting", () => {
    it("should return TRUE and delete de element if EXISTS", () => {
      expect(volatileDB.delete(id)).toBeTruthy();
      expect(volatileDB.fetch(id)).toBeUndefined();
    });

    it("should return FALSE if the element DOESN'T EXISTS", () => {
      expect(volatileDB.delete(id)).toBeFalsy();
    });
  });
});
