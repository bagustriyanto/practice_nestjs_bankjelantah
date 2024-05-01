import { AuthGuard } from "./auth.guard";

export const authGuardProvider = [
  {
    provide: "APP_GUARD",
    useClass: AuthGuard,
  },
];
