import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CocktailIngredientDto } from './cocktail-ingredient.dto.js';

export class CreateCocktailDto {
  @IsString()
  @IsNotEmpty({ message: 'Cocktail name cannot be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Category cannot be empty' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: 'Provide recipe' })
  instructions: string;

  @IsArray({ message: 'Ingredients must be inputted as an array' })
  @ValidateNested({ each: true })
  @Type(() => CocktailIngredientDto)
  @IsNotEmpty({ message: 'Cocktail has to include at least one ingredient' })
  ingredients: CocktailIngredientDto[];
}