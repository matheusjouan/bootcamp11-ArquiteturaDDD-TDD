import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    // Salva no vetor
    this.users.push(user);

    return user;
  }

  /**
   * Procurar o usuário na posição que ele ocupa
   * e atualizar os dados "save()"
   */
  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id == user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
