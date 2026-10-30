import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import type { Cocktail } from './cocktail.entity.js';
import type { Ingredient } from '../../ingredients/entities/ingredient.entity.js';

@Entity('cocktail_ingredients')
export class CocktailIngredient {
  @PrimaryColumn({ type: 'bigint' })
  cocktailId: string;

  @PrimaryColumn({ type: 'bigint' })
  ingredientId: string;

  @Column({ type: 'varchar', length: 50 })
  amount: string;

  //FK to Cocktail table, if Cocktail deleted cascade to list of its ingredients
  @ManyToOne('Cocktail', 'cocktailIngredients', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cocktailId' })
  cocktail: Cocktail;

  //FK to Ingredient table, restrict ingredient deletion if used
  @ManyToOne('Ingredient', 'cocktailIngredients', {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ingredientId' })
  ingredient: Ingredient;
}