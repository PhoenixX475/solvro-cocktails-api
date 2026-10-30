import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty({ message: 'Ingredient name cannot be empty' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean({ message: 'isAlcoholic field must be a boolean' })
  isAlcoholic: boolean;

  @IsUrl({}, { message: 'Image must be a URL path' })
  @IsOptional()
  imageUrl?: string;
}