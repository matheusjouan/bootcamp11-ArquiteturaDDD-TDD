import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

// Diz que essa classe aceita injecção de dependência
@injectable()
class CreateAppointmentSerivce {
  private appointmentsRepository: IAppointmentsRepository;

  // @inject => injeta a depedência com o nome dado, no arquivo container/index.ts
  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  // Para ter acesso aos métodos do repositório utiliza-se o "this.""

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentDateInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentDateInSameDate) {
      throw new AppError('Já existe um agendamento neste horário');
    }

    // Utilizando o método criado no repositório
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentSerivce;
