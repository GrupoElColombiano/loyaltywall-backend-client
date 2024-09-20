import { EventCluster } from './event_cluster.entity';
import { Event } from './event.entity';
import { Site } from './site.entity';
export declare class Cluster {
    id_cluster: number;
    name: string;
    create_at: Date;
    update_at: Date;
    events: Event[];
    sites: Site[];
    eventCluster: EventCluster[];
}
