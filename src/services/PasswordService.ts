import bcrypt from "bcrypt";

export class PasswordService {
  async encode(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);    
  }

  async compare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}