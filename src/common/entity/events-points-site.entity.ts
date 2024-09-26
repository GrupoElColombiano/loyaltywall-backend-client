// En la entidad PointsValue
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { PointsEvents } from './points-events.entity';

@Entity()
export class EventsPointsSite {
  @PrimaryGeneratedColumn()
  id: number;
  //@ManyToOne(() => Events, (event) => event.pointsValues) // Cambiado a pointsValues
  //@JoinColumn({ name: 'eventIdEvent' })
  //event: Events;
  @ManyToOne(() => PointsEvents, { eager: true })
  @JoinColumn({ name: 'eventIdEvent' })
  pointsEvents: PointsEvents;
  // @Column()
  // eventIdEvent: number;
  @Column() // Cambiado a Column
  siteIdSite: number;
  @Column() // Cambiado a Column
  points: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date: Date;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expiration_date: Date;
}
