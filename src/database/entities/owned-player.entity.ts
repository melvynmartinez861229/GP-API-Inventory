import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { GachaPlayer } from './gacha-player.entity';
import { PlayerKit } from './player-kit.entity';
import { TIMESTAMP_COLUMN_TYPE } from '../database.constants';

@Entity('owned_players')
export class OwnedPlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  playerId: string;

  @Column({ nullable: true })
  sourceOrderId: string;

  @Column({ nullable: true })
  sourceDrawId: string;

  @Column({ type: TIMESTAMP_COLUMN_TYPE as 'timestamptz' | 'datetime' })
  acquiredAt: Date;

  @Column({ default: 1 })
  currentLevel: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  division: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, user => user.ownedPlayers)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => GachaPlayer, player => player.ownedPlayers)
  @JoinColumn({ name: 'playerId' })
  player: GachaPlayer;

  @OneToMany(() => PlayerKit, kit => kit.ownedPlayer)
  kits: PlayerKit[];
}