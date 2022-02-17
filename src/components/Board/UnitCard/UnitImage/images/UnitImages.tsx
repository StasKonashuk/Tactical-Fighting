import { FC } from 'react';
import { SkeletonImage } from './SkeletonImage';
import { BanditImage } from './BanditImage';
import { ArchimageImage } from './ArchimageImage';
import { BishopImage } from './BishopImage';
import { CentaurImage } from './CentaurImage';
import { ElfArcherImage } from './ElfArcherImage';
import { MonkImage } from './MonkImage';
import { SirenaImage } from './SirenaImage';
import { SkeletonMageImage } from './SkeletonMageImage';
import { team } from '../../../../../types/types';

interface UnitImagePropsType {
  isOrder: boolean;
  unitTeam: team;
  gameRound: number | undefined;
}

export const UnitImages: { [key: string]: FC<UnitImagePropsType> } = {
  SkeletonImage,
  BanditImage,
  ArchimageImage,
  BishopImage,
  CentaurImage,
  ElfArcherImage,
  MonkImage,
  SirenaImage,
  SkeletonMageImage,
};
