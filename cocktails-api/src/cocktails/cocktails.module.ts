import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocktail } from './entities/cocktail.entity.js';
import { CocktailIngredient } from './entities/cocktail-ingredient.entity.js';
import { CocktailsController } from './cocktails.controller.js';
import { CocktailsService } from './cocktails.service.js';

@Module({
    controllers: [CocktailsController],
    imports: [TypeOrmModule.forFeature([Cocktail, CocktailIngredient])],
    providers: [CocktailsService],
})
export class CocktailsModule {}