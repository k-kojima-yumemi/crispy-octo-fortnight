import { hc } from "hono/client";
import type { CalculateApi } from "../routes/api/calculate-birthday";
import type { DaysApi } from "../routes/api/days";

export const daysClient = hc<DaysApi>("/api/days");

export const calculateClient = hc<CalculateApi>("/api/calculate-birthday");
