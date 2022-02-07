import { useState, useEffect, ReactElement } from 'react';
import { Board } from './components/Board/Board';
import { Game } from './units/gamePlay/Game';
import { MassTarget } from './units/units-types/damage-count/MassTarget';
import { Unit } from './units/Unit';
import {
  UnitType,
  unitGenerator,
  action,
  ActionType,
  team,
  CardLocation,
} from './types/types';
import { GameOver } from './components/GameOver/GameOver';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ROWS_COUNT, COLUMNS_COUNT } from './helpers/constants';
import style from './App.module.css';

let initialUnits: UnitType[][] | undefined = undefined;

function App(): ReactElement {
  const [units, setUnits] = useState<UnitType[][]>();
  const [unitGenerator, setUnitGenerator] = useState<unitGenerator>();
  const [action, setAction] = useState<action>();
  const [toSelectTarget, setToSelectTarget] = useState<boolean>(false);
  const [currentUnit, setCurrentUnit] = useState<Unit>();
  const [turnsCount, setTurnsCount] = useState<number>(1);
  const [finish, setFinish] =
    useState<{ isFinished: boolean; currentTeam: team }>();
  const [toStartNewGame, setToStartNewGame] = useState<boolean>(false);

  function handleNewGame(): void {
    setToStartNewGame(!toStartNewGame);
    setFinish(Game.finish(currentUnit as Unit));
  }

  function handleSelectTarget(unit: Unit): void {
    if (
      currentUnit &&
      action
        ?.getPossibleTargetsOfUnit(currentUnit)
        .findIndex((u) => u === unit) === -1
    ) {
      return;
    }

    const unitBoardLocation = action?.getBoardLocationOfTarget(unit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const attackAction = action?.doAction(
      ActionType.attack,
      currentUnit as Unit,
      unitBoardLocation as CardLocation
    );
    setToSelectTarget(false);
    setTurnsCount(turnsCount + 1);
  }

  function handleAttack(): void {
    setToSelectTarget(!toSelectTarget);
    if (currentUnit?.getDamageCount() instanceof MassTarget) {
      const attackAction = action?.doAction(
        ActionType.attack,
        currentUnit as Unit
      );
      setToSelectTarget(false);
      setTurnsCount(turnsCount + 1);
    }
  }

  function handleDefense(): void {
    const defendingAction = action?.doAction(
      ActionType.defense,
      currentUnit as Unit
    );
    setTurnsCount(turnsCount + 1);
    setToSelectTarget(false);
  }

  useEffect(() => {
    const initialGameData = Game.start(ROWS_COUNT, COLUMNS_COUNT);
    setUnits(initialGameData.units);
    setUnitGenerator(initialGameData.unitGenerator);
    setAction(initialGameData.action);
    initialUnits = [...initialGameData.units.map((u) => [...u])];
  }, [toStartNewGame]);

  useEffect(() => {
    setCurrentUnit(unitGenerator?.next());
  }, [unitGenerator]);

  useEffect(() => {
    if (currentUnit) {
      setFinish(Game.finish(currentUnit as Unit));
    }
    setCurrentUnit(unitGenerator?.getCurrentUnit());
  }, [turnsCount]);

  if (!units) {
    return <div>Loading</div>;
  }

  return (
    <div className={style.appContainer}>
      {finish?.isFinished ? (
        <GameOver
          currentTeam={finish?.currentTeam}
          handleNewGame={handleNewGame}
        />
      ) : (
        <>
          <Board
            units={units as UnitType[][]}
            initialUnits={initialUnits as UnitType[][]}
            toSelectTarget={toSelectTarget}
            handleSelectTarget={handleSelectTarget}
            currentUnit={currentUnit as Unit}
            action={action as action}
          />
          <Sidebar
            action={action as action}
            unitGenerator={unitGenerator as unitGenerator}
            toSelectTarget={toSelectTarget}
            setToSelectTarget={setToSelectTarget}
            currentUnit={currentUnit as Unit}
            handleDefense={handleDefense}
            handleAttack={handleAttack}
            gameRound={unitGenerator?.getGameRound()}
          />
        </>
      )}
    </div>
  );
}

export default App;
