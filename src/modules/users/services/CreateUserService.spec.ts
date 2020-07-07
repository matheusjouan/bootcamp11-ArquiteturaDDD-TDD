import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

// Categoriar o teste
describe('CreateUser', () => {
  it('should be able to create a new appointment', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Matheus',
      email: 'mjouan@hotmail.com',
      password: '111111',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Matheus',
      email: 'mjouan@hotmail.com',
      password: '111111',
    });

    expect(
      createUser.execute({
        name: 'Matheus',
        email: 'mjouan@hotmail.com',
        password: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
