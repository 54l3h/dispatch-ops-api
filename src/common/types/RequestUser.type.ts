import { Role } from "@prisma/client";

export type RequestUser = {
  id: string;
  role: Role;
  email: string;
  companyId?: string;
};