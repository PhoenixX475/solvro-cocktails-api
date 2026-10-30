import { PartialType } from '@nestjs/mapped-types';
import { CreateCocktailDto } from './create-cocktail.dto.js';

export class UpdateCocktailDto extends PartialType(CreateCocktailDto) {}