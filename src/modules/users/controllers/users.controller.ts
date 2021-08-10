import { User } from '@/infra/db/entities/user/user-entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
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
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInputEmailDto } from '@/modules/users/dtos/user-input/user-input-email/user-input.email.dto';
import { UserInputIdDto } from '@/modules/users/dtos/user-input/user-input-id/user-input-id.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateUserService } from '@/modules/users/services/update-user/update-user.service';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';
import { DeleteUserService } from '@/modules/users/services/delete-user/delete-user.service';
import { ReturnMessageUserDeleteType } from '@/utils/types/return-message-user-delete/return-message-user-delete.type';
import { ProcessUserService } from '../services/process-users/process-users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserService: AddUserService,
    private readonly loadAllUsersService: LoadAllUsersService,
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly loadUserByIdService: LoadUserByIdService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly processUserService: ProcessUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add new user.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already in use.',
  })
  async add(@Body() data: AddUserDto): Promise<User> {
    return await this.addUserService.add(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all users.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record found.',
  })
  async loadAll(
    @Query(ValidationPipe) filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<User[]>> {
    return await this.loadAllUsersService.findAll(filterUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('load-user-by-email')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by email.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async loadUserByEmail(
    @Query() userInputEmailDto: UserInputEmailDto,
  ): Promise<User> {
    const user = await this.loadUserByEmailService.loadUserByEmail(
      userInputEmailDto.email,
    );

    delete user.password;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('load-user-by-id/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiBody({ type: UserInputIdDto })
  async loadUserById(
    @Param(ValidationParamsPipe)
    userInputIdDto: UserInputIdDto,
  ): Promise<UserReturnType> {
    const user = await this.loadUserByIdService.loadUserById(userInputIdDto.id);
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user with successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id', ValidationParamsPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.updateUserService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete user with successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiBody({ type: UserInputIdDto })
  async deleteUser(
    @Param(ValidationParamsPipe) userInputIdDto: UserInputIdDto,
  ): Promise<ReturnMessageUserDeleteType> {
    return await this.deleteUserService.deleteUser(userInputIdDto.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('process-user')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Process queue',
  })
  async processUser(@Body() addUserDto: AddUserDto): Promise<void> {
    await this.processUserService.processUser(addUserDto);
  }
}
