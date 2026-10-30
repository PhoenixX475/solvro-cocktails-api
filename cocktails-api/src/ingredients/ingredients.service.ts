import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity.js';
import { CreateIngredientDto } from './dto/create-ingredient.dto.js';
import { UpdateIngredientDto } from './dto/update-ingredient.dto.js';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto.js';

@Injectable()
export class IngredientsService {
  constructor(@InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,
  ) {}

  //Create ingredient
  async create(dto: CreateIngredientDto): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create(dto);
    return await this.ingredientRepository.save(ingredient);
  }

  //List all ingredients
  async findAll(query: PaginationQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const [data, total] = await this.ingredientRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    //return ingredients and additional info
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  //Find specific ingredient
  async findOne(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} does not exist`);
    }
    return ingredient;
  }

  //Update ingredient
  async update(id: string, dto: UpdateIngredientDto): Promise<Ingredient> {
    const ingredient = await this.findOne(id);
    Object.assign(ingredient, dto);
    return await this.ingredientRepository.save(ingredient);
  }

  //Delete ingredient
  async remove(id: string): Promise<void> {
    const ingredient = await this.findOne(id);
    await this.ingredientRepository.remove(ingredient);
  }
}