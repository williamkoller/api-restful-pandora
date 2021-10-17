import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/modules/auth/guards/permissions.guard';
import {
  Body,
  Controller,
  Get,
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
import { CreateCatDto } from '@/modules/cats/dtos/create-cat/create-cat.dto';
import { CatParamsOutput } from '@/modules/cats/interfaces/cat-output.interface';
import { AddCatService } from '@/modules/cats/services/add-cat/add-cat.service';
import { FindCountService } from '@/modules/cats/services/find-count/find-count.service';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(
    private readonly addCatService: AddCatService,
    private readonly findCountService: FindCountService,
  ) {}

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

  @Get('count')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'x-role',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load numbers of cats.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record found.',
  })
  public async findCount(): Promise<number> {
    return await this.findCountService.findCount();
  }
}
