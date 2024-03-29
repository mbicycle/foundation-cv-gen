import * as interfaces from './entities/interfaces';
import * as TokenType from './entities/TokenType';
import * as api from './features/api';
import * as auth from './features/auth';
import * as hooks from './hooks';
import * as widgets from './widgets';

export default {
  interfaces, ...widgets.default, ...hooks.default, ...api, ...auth, TokenType,
};
