import { PlansProductCategory } from './plansproductcategory.entity';
export declare class Plan {
    idPlan?: number;
    idVersionPlan: number;
    description: string;
    name: string;
    userType: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    plansProductsCategory: PlansProductCategory[];
}
