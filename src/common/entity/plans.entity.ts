import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { UserPlan } from './user_plan.entity';
import { PlansProductCategory } from './plansproductcategory.entity';
// import { SitesPlan } from '../../common/entity/sites-plan.entity';
// import { Site } from '../../sites/entities/site.entity';
// import { Rate } from '../../common/entity/rate.entity';
// import { PlansProductCategory } from '../../common/entity/plans-products-categories.entity';
// import { Category } from '../../category/entity/category.entity';
// import { Product } from '../../product/entity/product.entity';
// import { PlanVersion } from './plan-versions.entity';
// import { UserPlan } from '../../common/entity/user-plan.entity';
// import { PlanTemplate } from '../../plans/entity/plan-template.entity';

@Entity({ name: 'plans' })
export class Plan {
  @PrimaryGeneratedColumn({ name: 'idPlan' })
  idPlan?: number;

  @Column({ name: 'idVersionPlan', default: 1, type: 'int'})
  idVersionPlan = 1;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  userType: string;

  @Column({ nullable: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    () => PlansProductCategory,
    (plansProductsCategory) => plansProductsCategory.plan,
  )
  plansProductsCategory: PlansProductCategory[];

  // @OneToMany(() => PlansProductCategory, plansProductsCategory => plansProductsCategory.plan)
  // plansProductsCategory: PlansProductCategory[];

  // @OneToMany(() => SitesPlan, sitesPlan => sitesPlan.plan)
  // sitesPlan: SitesPlan[];

  // @ManyToOne(() => Site, site => site.plan)
  // @JoinColumn({ name: 'idSite' })
  // site: Site;

  // @OneToMany(() => Rate, rate => rate.plan)
  // rates: Rate[];

  // @OneToMany(() => Product, product => product.plan)
  // products: Product;

  // @OneToMany(() => PlanVersion, planVersion => planVersion.plan)
  // planVersions: PlanVersion[];

  // @OneToMany(() => UserPlan, (userPlan) => userPlan.plan) // Indica que un Plan puede tener muchos UserPlans
  // userPlans: UserPlan[];

  // @OneToMany(() => PlanTemplate, planTemplate => planTemplate.plan)
  // planTemplates: PlanTemplate[];
}
