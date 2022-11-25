class DataBaseConnectionError extends Error {
  private static message: string = "db connection error";
  constructor() {
    super(DataBaseConnectionError.message);
  }
}

class NotFound extends Error {
  private static message: string = "not found";
  constructor(entity: string) {
    super(`${entity} ${NotFound.message}`);
  }
}

class WrongContent extends Error {
  constructor(message: string) {
    super(message);
  }
}

class EmailExists extends Error {
  private static message: string = "email already exists";
  constructor() {
    super(EmailExists.message);
  }
}

class NotRegistered extends Error {
  private static message: string = "email is not registered";
  constructor() {
    super(NotRegistered.message);
  }
}

class Unauthorized extends Error {
  private static message: string = "unauthorized";
  constructor() {
    super();
  }
}

export {
  DataBaseConnectionError,
  NotFound,
  WrongContent,
  EmailExists,
  NotRegistered,
  Unauthorized,
};
