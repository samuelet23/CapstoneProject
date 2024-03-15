import { AccessTokenRes } from './access-token-res';
import { User } from './user';
import { UserDto } from './user-dto';
export interface AuthData {
  token: AccessTokenRes
  user: UserDto

}
