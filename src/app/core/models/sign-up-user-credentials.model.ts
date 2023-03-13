import { Team } from './user.model';

export interface SignUpUserCredentials {
  name: string,
  nickname: string,
  password: string,
  team: Team;
}
