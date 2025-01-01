import { Inject } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/user/core/repository/user.repository';
import { UserNotFoundException } from 'src/user/core/exceptions/user-not-found.exception';
import { IDeleteUserUseCase } from './delete-user.interface';

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new UserNotFoundException('id', id);
    }

    return await this.userRepository.deleteById(id);
  }
}