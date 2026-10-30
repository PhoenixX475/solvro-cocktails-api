import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity.js';
import { IngredientsController } from './ingredients.controller.js';
import { IngredientsService } from './ingredients.service.js';

@Module({
    controllers: [IngredientsController],
    imports: [TypeOrmModule.forFeature([Ingredient])],
    exports: [TypeOrmModule],
    providers: [IngredientsService],
})
export class IngredientsModule {}