import { relations } from "drizzle-orm";
import { users, lists, todos } from "./schema";

/* USERS */
export const usersRelations = relations(users, ({ many }) => ({
  lists: many(lists),
  todos: many(todos),
}));

/* LISTS */
export const listsRelations = relations(lists, ({ one, many }) => ({
  user: one(users, {
    fields: [lists.userId],
    references: [users.id],
  }),
  todos: many(todos),
}));

/* TODOS */
export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
  list: one(lists, {
    fields: [todos.listId],
    references: [lists.id],
  }),
}));
