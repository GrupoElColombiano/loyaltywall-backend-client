import { Cluster } from './cluster.entity';
import { Event } from './event.entity';
import { EventCluster } from './event_cluster.entity';
export declare class Site {
    idSite: number;
    name: string;
    description: string;
    url: string;
    isActive: boolean;
    createAt: Date;
    updateAt: Date;
    clusters: Cluster[];
    events: Event[];
    event_clusters: EventCluster;
}
