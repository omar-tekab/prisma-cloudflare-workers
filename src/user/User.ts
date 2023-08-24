export class User {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    firstName: string | null;
    lastName: string | null;
    username: string;
    isValid: boolean | null;
    roles: string;
  
    constructor(
      id: string,
      createdAt: Date,
      updatedAt: Date | null,
      deletedAt: Date | null,
      firstName: string | null,
      lastName: string | null,
      username: string,
      isValid: boolean | null,
      roles: string[]
    ) {
      this.id = id;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.isValid = isValid;
      this.roles = roles;
    }
  }