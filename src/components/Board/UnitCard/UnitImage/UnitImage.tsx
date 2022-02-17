import React, { ReactElement } from 'react';
import { team } from '../../../../types/types';
import { UnitImages } from './images/UnitImages';
import style from './UnitImage.module.css';

interface UnitImagePropsType {
  name: string;
  isDead?: boolean;
  isDefending?: boolean;
  isParalyzing?: boolean;
  isOrder: boolean;
  unitTeam: team;
  gameRound: number | undefined;
}

interface UnitImageComponentPropsType {
  isOrder: boolean;
  unitTeam: team;
  gameRound: number | undefined;
}

export const UnitImage = ({
  isParalyzing,
  name,
  isDead,
  isDefending,
  isOrder,
  unitTeam,
  gameRound,
}: UnitImagePropsType): ReactElement => {
  const formattedUnitName: string = name.split(' ').join('');
  const UnitImageComponent: React.FC<UnitImageComponentPropsType> =
    UnitImages[`${formattedUnitName}Image`];

  return (
    <div className="unit-image-container">
      <UnitImageComponent
        gameRound={gameRound}
        unitTeam={unitTeam}
        isOrder={isOrder}
      />
      {isDefending && !isDead && (
        <div className={style.statusContainer}>
          <img
            alt="defending"
            src="https://cdn-icons-png.flaticon.com/512/81/81137.png"
            className={style.unitStatus}
          />
        </div>
      )}
      {isParalyzing && !isDead && (
        <div className={style.statusContainer}>
          <img
            alt="paralyzing"
            src="https://img.icons8.com/external-justicon-lineal-justicon/100/26e07f/external-storm-weather-justicon-lineal-justicon.png"
            className={style.unitStatus}
          />
        </div>
      )}
      {isDead && (
        <div>
          <img
            alt="dead"
            src="https://cdn4.iconfinder.com/data/icons/game-general-icon-set-1/512/skull-512.png"
            className={style.unitStatus}
          />
        </div>
      )}
    </div>
  );
};
