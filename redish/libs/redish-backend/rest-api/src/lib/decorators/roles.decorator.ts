import { Reflector } from '@nestjs/core';
import { Role } from '@redish-shared/domain';

export const Roles = Reflector.createDecorator<Role[]>();
