// En la entidad Events
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { PointsEvents } from './points-events.entity';
import { EventCluster } from './event_cluster.entity';
import { Cluster } from './cluster.entity';
import { Site } from './site.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id_event: number;
  //@OneToMany(() => PointsEvents, (pointsValue) => pointsValue.event)
  //pointsValues: PointsEvents[];
  @Column()
  name: string;
  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  update_at: Date;

  @OneToMany(() => EventCluster, (event_cluster) => event_cluster.events)
  @JoinColumn({ name: 'id_event_cluster' })
  event_cluster: EventCluster[];

  @ManyToMany(() => Cluster, (cluster) => cluster.events)
  clusters: Cluster[];

  @ManyToMany(() => Site, (site) => site.events)
  sites: Site[];
}
