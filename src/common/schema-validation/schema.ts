import { timeStamp } from "console";

type Filter<T> = {
  filter: (value: T) => boolean;
  error: string;
};

type SchemaType<T> = {
  [K in keyof T]: Schema<T[K]>;
};

type OperationType = "complete" | "partial";

function buildSchema<T = {}>(Schema: SchemaType<Partial<T>>) {
  for (let key in Schema) {
    Schema[key].setKey(key);
  }
  return Schema;
}

class Schema<T> {
  protected filters: Array<Filter<T>> = [];
  protected type: string = "";
  protected key: string = "";
  // protected values: T[] = [];

  setKey(key: string) {
    this.key = key;
  }

  validate(value: T) {
    //type validation
    if (typeof value !== this.type) {
      throw new Error(`${this.key} must be ${this.type}`);
    }

    //constraint validation
    for (let { filter, error } of this.filters) {
      if (!filter(value)) {
        throw new Error(this.key + " " + error);
      }
    }
  }

  // #contains = (name: T) => {
  //   for (let value of this.values) {
  //     if (value === name) return true;
  //   }
  //   return false;
  // };

  // of(values: T[]) {
  //   let s = "";
  //   values.forEach((element, index) => {
  //     if (index === values.length - 1) {
  //       s += element;
  //       return;
  //     }
  //     s += element + " or ";
  //   });

  //   this.values = values;
  //   this.filters.push({
  //     filter: this.#contains,
  //     error: `must be ${s}`,
  //   });
  //   return this;
  // }
}

class StringSchema extends Schema<string> {
  protected maxLength: number = 0;
  protected minLength: number = 0;

  constructor() {
    super();
    this.type = "string";
  }

  #max = (name: string) => name.trimStart().trimEnd().length <= this.maxLength;
  #min = (name: string) => name.trimStart().trimEnd().length >= this.minLength;

  #onlyAlphabets = (name: string) => {
    let newData = name.trimStart().trimEnd();
    let format = /^[A-Za-z]+$/;

    if (!format.test(newData)) return false;

    return true;
  };

  #onlyDigits = (name: string) => {
    let format = /^[0-9]+$/;

    if (!format.test(name)) return false;
    return true;
  };

  #isEmail = (name: string) => {
    let format =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!format.test(name)) return false;
    return true;
  };

  max(length: number) {
    this.maxLength = length;
    this.filters.push({
      filter: this.#max,
      error: `should contain at most ${length} characters,`,
    });
    return this;
  }

  min(length: number) {
    this.minLength = length;
    this.filters.push({
      filter: this.#min,
      error: `should contain at least ${length} characters,`,
    });
    return this;
  }

  onlyAlphabets() {
    this.filters.push({
      filter: this.#onlyAlphabets,
      error: `should contain only alphabets`,
    });
    return this;
  }

  onlyDigits() {
    this.filters.push({
      filter: this.#onlyDigits,
      error: `should contain only numbers`,
    });
    return this;
  }

  email() {
    this.filters.push({
      filter: this.#isEmail,
      error: `must be a valid email`,
    });
    return this;
  }
}

class NumberSchema extends Schema<number> {
  protected maxNumber: number = 0;
  protected minNUmber: number = 0;

  constructor() {
    super();
    this.type = "number";
  }

  #isNotNegative = (value: number) => value >= 0;
  #max = (value: number) => value <= this.maxNumber;
  #min = (value: number) => value >= this.minNUmber;

  max(value: number) {
    this.maxNumber = value;
    this.filters.push({
      filter: this.#max,
      error: `should be less than ${this.maxNumber}`,
    });
    return this;
  }

  min(value: number) {
    this.minNUmber = value;
    this.filters.push({
      filter: this.#min,
      error: `should be greater than ${this.minNUmber}`,
    });
    return this;
  }

  notNegative() {
    this.filters.push({
      filter: this.#isNotNegative,
      error: `must not be negative`,
    });
    return this;
  }
}

function string(): StringSchema {
  return new StringSchema();
}

function number() {
  return new NumberSchema();
}

async function validateSchema<T>(
  schema: {},
  data: {},
  operation: OperationType
): Promise<{}> {
  let newObject = {};

  switch (operation) {
    case "complete":
      //validate all keys
      for (let key in schema) {
        if (!(key in data)) {
          throw new Error(`${key} must be there`);
        }
      }

      for (let key in schema) {
        //each key validation
        schema[key].validate(data[key]);
        newObject[key] = data[key];
      }

      break;

    case "partial":
      for (let key in data) {
        if (key in schema) {
          //each key validation
          schema[key].validate(data[key]);
          newObject[key] = data[key];
        }
      }

      if (Object.keys(newObject).length === 0) {
        throw new Error("invalid object");
      }
      break;
  }
  return newObject;
}

export {
  Schema,
  StringSchema,
  NumberSchema,
  buildSchema,
  validateSchema,
  number,
  string,
};
