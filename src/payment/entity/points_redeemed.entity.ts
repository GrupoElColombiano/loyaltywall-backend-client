import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity("points_redeemed")
export class PointsRedeemed {

    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    siteId: string;

    @Column()
    productId: string;

    @Column()
    productName: string;

    @CreateDateColumn()
    createdAt: String;

    @Column()
    pointsRedeemed: string;
}