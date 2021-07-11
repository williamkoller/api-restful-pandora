import { User } from '@/infra/typeorm/entities/user/user-entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { FilterUserDto } from '../dtos/filter-user/filter-user.dto';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { LoadAllUsersService } from '../services/load-all-users/load-all-users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserService: AddUserService,
    private readonly loadAllUsersService: LoadAllUsersService,
  ) {}

  @Post('add-user')
  async add(@Body() data: AddUserDto): Promise<User> {
    return await this.addUserService.add(data);
  }

  @Get('load-all-users')
  async loadAll(
    @Query(ValidationPipe) filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<User[]>> {
    return await this.loadAllUsersService.loadAllUsers(filterUserDto);
  }
}
