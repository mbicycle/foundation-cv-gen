import type { DbUser } from "entities/user/model"

export type CreateUserModel = Pick<DbUser, "email" | "firstName" | "lastName" | "title">
