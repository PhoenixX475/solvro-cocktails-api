import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CocktailIngredient } from '../../cocktails/entities/cocktail-ingredient.entity.js';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string; 

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  isAlcoholic: boolean;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @OneToMany(
    () => CocktailIngredient,
    (cocktailIngredient) => cocktailIngredient.ingredient,
  )
  cocktailIngredients: CocktailIngredient[];
}