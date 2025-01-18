import { hc } from 'hono/client';
import type { DaysApi } from '../routes/api/days';
import type { CalculateApi } from '../routes/api/calculate-birthday';

// 日付取得API
export const daysClient = hc<DaysApi>('/api/days');

// 誕生日計算API
export const calculateClient = hc<CalculateApi>('/api/calculate-birthday');
