import { INestApplication } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users/users.service';
import { initialTest } from 'test/index';

describe(`[UNIT] Get user by email`, () => {
  let app: INestApplication;
  let usersService: UsersService;
  beforeEach(async () => {
    app = await initialTest();
    usersService = await app.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should return user by email', async () => {
    const email = 's30.tung@gmail.com';
    console.log(usersService);
    console.log(usersService.getUserByEmail);

    const user = await usersService.getUserByEmail(email);

    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('password');
  });
});
