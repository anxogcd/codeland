// src/authentication/domain/User.js

class User {
  constructor(
    private readonly username: string,
    private readonly password: string
  ) {}
}

export default User;
