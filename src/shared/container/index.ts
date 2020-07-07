import { container } from 'tsyringe';

// importação da injeção do hash
import '@modules/users/providers/index';

// importação da injeção do upload Disk
import '@shared/container/providers/index';

// Importação das Dependências a serem Injetadas
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// Importação do Repositório a ser injetado as Dependências
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

/**
 * 1º parâmetro: id => nome / 2º parâmetro: Repositório
 * registerSingleton()
 * Instancia uma única vez, assim os services que necessitar utilizar o repositório
 * sempre ira utilizar a instância dessa classe, ou seja, mesmo repositório
 */

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
