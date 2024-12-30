import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserDb } from './infrastructure/entity/user.entity';
import { UserController } from './interface/user.controller';
import { GetUserByEmailUseCase } from './epplication/use-cases/get-user-by-email/get-user-by-email.use-case';
import { GetUserByIdUseCase } from './epplication/use-cases/get-user-by-id/get-user-by-id.use-case';
import { CreateUserUseCase } from './epplication/use-cases/create-user/create-user.use-case';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserMapper } from './infrastructure/mappers/user.mapper';
import {
  USER_MAPPER,
  USER_REPOSITORY,
} from './core/repository/user.repository';
import { UserMockService } from './core/entity/mocks/user-mock.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDb])],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_MAPPER,
      useClass: UserMapper,
    },
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    UserMapper,
    UserMockService,
  ],
  controllers: [UserController],
  exports: [
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    USER_REPOSITORY,
    USER_MAPPER,
    UserMapper,
  ],
})
export class UserModule {}