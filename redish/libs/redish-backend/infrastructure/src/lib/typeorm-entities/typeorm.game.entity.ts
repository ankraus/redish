import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Game as DomainGame } from '@redish-backend/domain';

@Entity()
export class Game extends DomainGame {
  @PrimaryColumn()
  override uuid: string;

  @Column({ unique: true })
  override name: string;

  @Column()
  override minNumberOfPlayers: number;

  @Column()
  override maxNumberOfPlayers: number;

  @Column()
  override previewColor: 'green' | 'redish-light';

  constructor(
    uuid: string,
    name: string,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    previewColor: 'green' | 'redish-light'
    ) {
    super(uuid, name, minNumberOfPlayers, maxNumberOfPlayers, previewColor);
    this.uuid = uuid;
    this.name = name;
    this.minNumberOfPlayers = minNumberOfPlayers;
    this.maxNumberOfPlayers = maxNumberOfPlayers;
    this.previewColor = previewColor;
  }
}
