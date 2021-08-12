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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInputEmailDto } from '@/modules/users/dtos/user-input/user-input-email/user-input.email.dto';
import { UserInputIdDto } from '@/modules/users/dtos/user-input/user-input-id/user-input-id.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateUserService } from '@/modules/users/services/update-user/update-user.service';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';
import { DeleteUserService } from '@/modules/users/services/delete-user/delete-user.service';
import { ReturnMessageUserDeleteType } from '@/utils/types/return-message-user-delete/return-message-user-delete.type';
import { ProcessUserService } from '@/modules/users/services/process-users/process-users.service';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';
import { UserPermissions } from '@/modules/users/enum/user-permissions.enum';
import { Permissions } from '@/modules/users/decorators/permissions.decorator';
import { PermissionsGuard } from '@/modules/users/guards/permissions.guard';

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
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add new user.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already in use.',
  })
  public async add(@Body() data: AddUserDto): Promise<User> {
    return await this.addUserService.add(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
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
  public async loadAll(
    @Query(ValidationPipe) filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<User[]>> {
    return await this.loadAllUsersService.findAll(filterUserDto);
  }

  @Get('load-user-by-email')
  @UseGuards(JwtAuthGuard)
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
  public async loadUserByEmail(
    @Query() userInputEmailDto: UserInputEmailDto,
  ): Promise<User> {
    const user = await this.loadUserByEmailService.loadUserByEmail(
      userInputEmailDto.email,
    );

    delete user.password;

    return user;
  }

  @Get('load-user-by-id/:id')
  @UseGuards(JwtAuthGuard)
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
  public async loadUserById(
    @Param(ValidationParamsPipe)
    userInputIdDto: UserInputIdDto,
  ): Promise<UserReturnType> {
    const user = await this.loadUserByIdService.loadUserById(userInputIdDto.id);
    delete user.password;
    return user;
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
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
  public async updateUser(
    @Param('id', ValidationParamsPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.updateUserService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
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
  public async deleteUser(
    @Param(ValidationParamsPipe) userInputIdDto: UserInputIdDto,
  ): Promise<ReturnMessageUserDeleteType> {
    return await this.deleteUserService.deleteUser(userInputIdDto.id);
  }

  @Post('process-user')
  @UseGuards(JwtAuthGuard)
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
  public async processUser(@Body() addUserDto: AddUserDto): Promise<void> {
    await this.processUserService.processUser(addUserDto);
  }
}
