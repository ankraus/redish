import { ObjectLiteral } from 'typeorm';
import { Uuid } from '@redish-backend/domain';

export interface BaseTypeOrmUuidEntity extends ObjectLiteral, Uuid {}
