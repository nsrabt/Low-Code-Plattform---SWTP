import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Timestamp} from "rxjs";

@Entity()
export class user_platform {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userID: number;

    @Column()
    platformID: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    assigned_at: Date;

}