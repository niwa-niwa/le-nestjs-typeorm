import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

// describe("UsersController", () => {
//   let controller: UsersController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//   });

//   it("should be defined", () => {
//     expect(controller).toBeDefined();
//   });
// });

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const users = [
      {
        id: 1,
        screenName: "test11",
        password:
          "6c614c4e12595a345079b78df3f5e702c6e7ecacae2e4a0430880666ccc55bb3", 
      },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: ({
              where: { screenName },
            }: {
              where: { screenName: string };
            }) => users.find((user) => user.screenName === screenName),
            insert: (entity) => users.push(entity),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe("register", () => {
    test("CREATED", async () => {
      expect.assertions(1);

      const registerResult = service.register({
        screenName: "test",
        password: "12345",
      });

      await expect(registerResult).resolves.toBe(undefined);
    });

    test("CONFLICT", async () => {
      expect.assertions(1);

      const registerPromise = service.register({
        screenName: "test11",
        password: "12345",
      });

      await expect(registerPromise).rejects.toThrow("User is already taken.");
    });
  });
});
