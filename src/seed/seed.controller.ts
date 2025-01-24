import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiResponse({
    status: 200,
    description:
      'Permissions, Roles and User default with role admin saved in db',
  })
  @ApiResponse({
    status: 500,
    description: 'Some error was detected in the execution of seed',
  })
  @Get()
  seedDB() {
    return this.seedService.executeSeed();
  }
}
