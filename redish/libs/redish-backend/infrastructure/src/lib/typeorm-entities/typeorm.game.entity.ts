import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Game as DomainGame } from '@redish-backend/domain';
import { PreviewColor, previewColorValues } from '@redish-shared/domain';

@Entity()
export class Game extends DomainGame {
  @PrimaryColumn()
  override uuid: string;

  @Column({ unique: true })
  override readableId: string;

  @Column({ unique: true })
  override name: string;

  @Column()
  override minNumberOfPlayers: number;

  @Column()
  override maxNumberOfPlayers: number;

  @Column({ type: 'enum', enum: previewColorValues, default: previewColorValues[0] })
  override previewColor: PreviewColor;

  constructor(
    uuid: string,
    readableId: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: PreviewColor
  ) {
    super(uuid, readableId, name, minNumberOfPlayers, maxNumberOfPlayers, previewColor);
    this.uuid = uuid;
    this.readableId = readableId;
    this.name = name;
    this.minNumberOfPlayers = minNumberOfPlayers;
    this.maxNumberOfPlayers = maxNumberOfPlayers;
    this.previewColor = previewColor;
  }
}
