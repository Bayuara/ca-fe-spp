export default class AuthorizationError extends Error {
  name: string;

  constructor() {
    super("Unauthorized");
    this.name = "Authorization Error";
  }
}
