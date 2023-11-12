import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_history')
export class Share {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  timestamp: number;
}
