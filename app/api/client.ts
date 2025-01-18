import { hc } from "hono/client";
import type { CalculateApi } from "../routes/api/calculate-birthday";
import type { DaysApi } from "../routes/api/days";

// 日付取得API
export const daysClient = hc<DaysApi>("/api/days");

// 誕生日計算API
export const calculateClient = hc<CalculateApi>("/api/calculate-birthday");
