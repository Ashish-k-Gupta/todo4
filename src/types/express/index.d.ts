
import { User } from "../../entity/userEntity";

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }
