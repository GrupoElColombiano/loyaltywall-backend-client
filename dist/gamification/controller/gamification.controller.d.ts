import { GamificationService } from '../service/gamification.service';
export declare class GamificationController {
    private readonly gamificationService;
    constructor(gamificationService: GamificationService);
    findPointValueBySite(idSite: number, userId: string, page: number, limit: number, type: number): Promise<any>;
    ListPointsToBeAddressed(userId: string): Promise<any[]>;
    getAdvanceCluster(idSite: number, idKeycloak: string): Promise<any>;
    getTotalPoints(userId: string): Promise<{
        result: number;
    }>;
    getPlan(idKeycloak: string): Promise<{
        message: string;
        plan: any;
    }>;
}
