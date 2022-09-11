import { Flag } from './models/flag.model';

export type FlagToggleResponse = {
  flag: Flag
}

export type FlagToggleRequest = {
  flagId: number
}