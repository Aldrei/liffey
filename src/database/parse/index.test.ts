import { IOwner, IProperty } from "@/database/models";
import { parseArrayModel } from "@/database/parse";
import { ownerParsePtToEn, ownerSource } from "@/database/parse/owner";
import { propertyParsePtToEn, propertySource } from "@/database/parse/property";

describe('Database > parse', () => {
  it('Parse Property', () => {
    const propertyParsed = parseArrayModel<IProperty>(propertySource, propertyParsePtToEn)
    expect(Object.values(propertyParsed[0]).toString())
      .toBe(Object.values(propertySource[0]).toString())
  })

  it('Parse Owner', () => {
    const ownerParsed = parseArrayModel<IOwner>(ownerSource, ownerParsePtToEn)
    expect(Object.values(ownerParsed[0]).toString())
      .toBe(Object.values(ownerSource[0]).toString())
  })
})