import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CocktailsService } from './cocktails.service.js';
import { CreateCocktailDto } from './dto/create-cocktail.dto.js';
import { UpdateCocktailDto } from './dto/update-cocktail.dto.js';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto.js';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  // POST /cocktails
  @Post()
  create(@Body() createCocktailDto: CreateCocktailDto) {
    return this.cocktailsService.create(createCocktailDto);
  }

  // GET /cocktails?page=1&limit=10
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.cocktailsService.findAll(paginationQuery);
  }

  // GET /cocktails/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cocktailsService.findOne(id);
  }

  // PATCH /cocktails/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCocktailDto: UpdateCocktailDto,
  ) {
    return this.cocktailsService.update(id, updateCocktailDto);
  }

  // DELETE /cocktails/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.cocktailsService.remove(id);
  }
}