import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from './column-numeric-transformer';

@Entity('stock_history')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 4, transformer: new ColumnNumericTransformer() })
  price: number;

  @Column()
  timestamp: number;
}
