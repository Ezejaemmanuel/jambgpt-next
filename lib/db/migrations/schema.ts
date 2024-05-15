import { pgTable, uniqueIndex, pgEnum, text, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const Gender = pgEnum("Gender", ['Male', 'Female', 'Other'])
export const UserRole = pgEnum("UserRole", ['ADMIN', 'USER'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const User = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	role: UserRole("role").notNull(),
	firstName: text("firstName"),
	username: text("username"),
	fullName: text("fullName"),
	imageUrl: text("imageUrl"),
	email: text("email").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		email_key: uniqueIndex("User_email_key").on(table.email),
	}
});