import { Role } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        role: Role;
      };
    }
  }
}
