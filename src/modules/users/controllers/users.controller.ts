import { User } from '@/infra/typeorm/entities/user/user-entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { FilterUserDto } from '@/modules/users/dtos/filter-user/filter-user.dto';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { ValidationParamsPipe } from '@/common/pipes/validation-params.pipe';
import { UserInputDto } from '@/modules/users/dtos/user-input/user-input.dto';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';

@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserService: AddUserService,
    private readonly loadAllUsersService: LoadAllUsersService,
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly loadUserByIdService: LoadUserByIdService,
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

  @Get('load-user-by-email')
  async loadUserByEmail(@Query() userInputDto: UserInputDto): Promise<User> {
    return await this.loadUserByEmailService.loadUserByEmail(
      userInputDto.email,
    );
  }

  @Get('load-user-by-id/:id')
  async loadUserById(
    @Param(ValidationParamsPipe)
    userInputDto: UserInputDto,
  ): Promise<UserReturnType> {
    return await this.loadUserByIdService.loadUserById(userInputDto.id);
  }
}
