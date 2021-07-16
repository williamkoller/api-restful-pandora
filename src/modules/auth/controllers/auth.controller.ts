import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInputDto } from '@/modules/auth/dtos/user-input/user-input.dto';
import { UserOutputDto } from '@/modules/auth/dtos/user-output/user-output.dto';
import { AuthService } from '@/modules/auth/services/auth.service';
import { User } from '@/infra/db/entities/user/user-entity';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';
import { LoadProfileUserService } from '@/modules/users/services/load-profile-user/load-profile-user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly loadProfileUserService: LoadProfileUserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged with successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user.',
  })
  async login(@Body() userInputDto: UserInputDto): Promise<UserOutputDto> {
    return await this.authService.validateUser(userInputDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile-user')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load profile user.',
  })
  async loadProfileUser(@Request() user: User): Promise<UserReturnType> {
    return await this.loadProfileUserService.loadProfileUser(user.id);
  }
}
