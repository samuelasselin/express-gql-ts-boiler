import { User } from "./../entities/User";
import { MyContext } from "./../types";
import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  InputType,
  Field,
  Query,
  ObjectType,
} from "type-graphql";
import argon2 from "argon2";

// Define a inputType for our register mutation
@InputType()
class UserNamePasswordEmail {
  @Field()
  userName: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

// Define a inputType for our sigin query
@InputType()
class UserNamePassword {
  @Field()
  userName: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

// To handle response we create a UserResponse ObjectType will return an error or a User
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  // Specify that mutation will return a User in type graphql
  @Mutation(() => User)
  async register(
    // Arg is the params received from our app
    @Arg("options") options: UserNamePasswordEmail,
    // Ctx is the graphql main context defined in index.ts - Access our ORM
    @Ctx() { em, req }: MyContext
  ): // Our register mutation will return a promise with our freshly created user
  Promise<User> {
    const { userName, password, email } = options;
    const hashedPassword = await argon2.hash(password);
    // Create our new user object
    const user = em.create(User, {
      userName,
      email,
      password: hashedPassword,
    });
    // Persist user to our db
    await em.persistAndFlush(user);

    //Auto login on register
    req.session.userId = user.id;

    return user;
  }

  // Query will return a user or error
  @Query(() => UserResponse)
  async login(
    @Arg("options") options: UserNamePassword,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const { userName, password } = options;
    const user = await em.findOne(User, {
      userName,
    });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Username dont exist",
          },
        ],
      };
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "password dont match",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  // Exemple how to use de userId store in session cookie
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    return await em.findOne(User, { id: req.session.userId });
  }
}
