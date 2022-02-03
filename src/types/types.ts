import { Unit } from '../units/Unit';
import { UnitGenerator } from '../units/generators/UnitGenerator';
import { Action } from '../units/board/Action';

export type CardLocation = {
  rowIndex: number;
  columnIndex: number;
};

export enum Team {
  topTeam = 'TOP_TEAM',
  bottomTeam = 'BOTTOM_TEAM',
}

export type UnitType = Unit | null;

export enum ActionType {
  attack = 'ATTACK',
  defense = 'DEFFENSE',
}

export type unitGenerator = InstanceType<typeof UnitGenerator>;
export type action = InstanceType<typeof Action>;
