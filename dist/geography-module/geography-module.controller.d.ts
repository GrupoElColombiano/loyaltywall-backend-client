import { GeographyService } from './geography-module.service';
export declare class GeographyController {
    private readonly geographyService;
    constructor(geographyService: GeographyService);
    getAllDepartments(): Promise<any>;
    getCitiesByDepartmentId(id: number): Promise<any>;
}
