import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cocktail } from './entities/cocktail.entity.js';
import { CocktailIngredient } from './entities/cocktail-ingredient.entity.js';
import { CreateCocktailDto } from './dto/create-cocktail.dto.js';
import { UpdateCocktailDto } from './dto/update-cocktail.dto.js';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto.js';

@Injectable()
export class CocktailsService {
  constructor(@InjectRepository(Cocktail) private cocktailRepository: Repository<Cocktail>,
              @InjectRepository(CocktailIngredient) private cocktailIngredientRepository: Repository<CocktailIngredient>,
  ) {}

  //Create cocktail with ingredients
  async create(dto: CreateCocktailDto): Promise<Cocktail> {

    //Create new cocktail
    const cocktail = this.cocktailRepository.create({
      name: dto.name,
      category: dto.category,
      instructions: dto.instructions,
      cocktailIngredients: dto.ingredients.map((item) => ({
        ingredientId: item.ingredientId,
        amount: item.amount,
      })),
    });

    //save it to db
    return await this.cocktailRepository.save(cocktail);
  }

  //List all cocktails
  async findAll(query: PaginationQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const [data, total] = await this.cocktailRepository.findAndCount({
      relations: {
        cocktailIngredients: {
            ingredient: true,
        },
        },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    //return cocktails and additional info
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  //Find specific cocktail
  async findOne(id: string): Promise<Cocktail> {
    const cocktail = await this.cocktailRepository.findOne({
      where: { id },
      relations: {
        cocktailIngredients: {
            ingredient: true,
        },
        }
    });

    if (!cocktail) {
      throw new NotFoundException(`Cocktail with ID ${id} does not exist`);
    }

    return cocktail;
  }

  //Update cocktail
  async update(id: string, dto: UpdateCocktailDto): Promise<Cocktail> {
    const cocktail = await this.findOne(id);

    //update fields
    if (dto.name) cocktail.name = dto.name;
    if (dto.category) cocktail.category = dto.category;
    if (dto.instructions) cocktail.instructions = dto.instructions;
    if (dto.ingredients) //replace old ingredients list with new one 
    {
      await this.cocktailIngredientRepository.delete({ cocktailId: id });
      cocktail.cocktailIngredients = dto.ingredients.map((item) =>
        this.cocktailIngredientRepository.create({
          cocktailId: id,
          ingredientId: item.ingredientId,
          amount: item.amount,
        }),
      );
    }

    
    return await this.cocktailRepository.save(cocktail);
  }

  //Delete cocktail
  async remove(id: string): Promise<void> {
    const cocktail = await this.findOne(id);
    await this.cocktailRepository.remove(cocktail);
  }
}