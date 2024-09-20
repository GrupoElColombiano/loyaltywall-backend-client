import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { UserEntity } from 'src/user/entitys/user.entity';
import { JwtAuthGuard } from 'src/auth/autenticacion/jwt-auth.guard';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  // @ApiOkResponse({ description: 'Retrieved user profile', type: UserEntity })
  // @ApiNotFoundResponse({ description: 'User not found' })
  async getUserProfile(
    @Param('id') id: number,
  ): Promise<UserEntity | undefined> {
    return this.profileService.getUser(id);
  }
}
