import { IsNotEmpty, IsString } from 'class-validator';

export class CocktailIngredientDto {
  @IsString()
  @IsNotEmpty({ message: 'Ingredient id is needed' })
  ingredientId: string;

  @IsString()
  @IsNotEmpty({ message: 'Amount of ingredient is needed' })
  amount: string;
}