import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  /**
   * Para saber qual tipo de relacionamento
   * Partindo deste model (ATUAL) p/ outro model que esta sendo relacionado
   * (REFLETIRA DE FORMA CONTRÁRIA NO OUTRO MODELO RELACIONADO)
   * "Muitos agendamentos p/ 1 usuário"
   */
  @ManyToOne(() => User)
  // Qual coluna que vai identificar o usuário
  @JoinColumn({ name: 'provider_id' })
  // Consegue ter acesso aos dados de "users" na tabela de "appointments"
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
