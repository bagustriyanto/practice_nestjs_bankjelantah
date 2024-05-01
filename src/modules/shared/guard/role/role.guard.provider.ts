import { RoleGuard } from "./role.guard";

export const roleGuardProvider = [
  {
    provide: "APP_GUARD",
    useClass: RoleGuard,
  },
];
