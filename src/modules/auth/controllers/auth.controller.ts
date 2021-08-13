import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInputDto } from '@/modules/auth/dtos/user-input/user-input.dto';
import { UserOutputDto } from '@/modules/auth/dtos/user-output/user-output.dto';
import { AuthService } from '@/modules/auth/services/auth.service';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';
import { LoadProfileUserService } from '@/modules/users/services/load-profile-user/load-profile-user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { Request } from 'express';

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
  public async login(
    @Body() userInputDto: UserInputDto,
  ): Promise<UserOutputDto> {
    return await this.authService.validateUser(userInputDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load my user.',
  })
  public async me(@Req() request: Request): Promise<UserReturnType> {
    try {
      return await this.loadProfileUserService.loadProfileUser(
        request.users.id,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
