export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class PostException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PostException";
  }
}

export class UserException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserException";
  }
}