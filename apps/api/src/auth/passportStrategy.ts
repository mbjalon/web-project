import { Strategy as LocalStrategy } from "passport-local";
import argon2 from "argon2";
import authRepository from "./repository";

export const passportStrategy = () =>
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await authRepository.getByEmail(email);

      if (user.isErr) {
        return done(user.error);
      }

      if (!user.value) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      const isPasswordCorrect = await argon2.verify(
        user.value.password,
        password,
      );

      if (!isPasswordCorrect) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      return done(null, user.value);
    },
  );
