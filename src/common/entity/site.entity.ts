import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { Cluster } from './cluster.entity';
import { Event } from './event.entity';
import { EventCluster } from './event_cluster.entity';

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  idSite: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  url: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToMany(() => Cluster, (cluster) => cluster.sites)
  clusters: Cluster[];

  @ManyToMany(() => Event, (event) => event.sites, { nullable: true })
  events: Event[];

  @OneToMany(() => EventCluster, (eventCluster) => eventCluster.site)
  @JoinColumn({ name: 'id_event_cluster' })
  event_clusters: EventCluster;
}
