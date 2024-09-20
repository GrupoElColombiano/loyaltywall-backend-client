import { EventCluster } from './event_cluster.entity';
import { Cluster } from './cluster.entity';
import { Site } from './site.entity';
export declare class Event {
    id_event: number;
    name: string;
    description: string;
    create_at: Date;
    update_at: Date;
    event_cluster: EventCluster[];
    clusters: Cluster[];
    sites: Site[];
}
