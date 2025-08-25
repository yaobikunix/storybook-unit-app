/** 各サービスのモックを集約 */
import { userHandler } from '../user/handler';

export const handlers = [...userHandler];
