import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/modules/auth/guards/permissions.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCatDto } from '../dtos/create-cat/create-cat.dto';
import { CatParamsOutput } from '../interfaces/cat-output.interface';
import { AddCatService } from '../services/add-cat/add-cat.service';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly addCatService: AddCatService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({
    name: 'x-role',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add new cat.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'There is already a cat with that name.',
  })
  public async addCat(
    @Body() createCatDto: CreateCatDto,
  ): Promise<CatParamsOutput> {
    return await this.addCatService.addCat(createCatDto);
  }
}
