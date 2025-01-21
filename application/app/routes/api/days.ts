import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { DateTime } from "luxon";
import { z } from "zod";
import { range } from "../../util";

const daysValidator = zValidator(
    "json",
    z.object({
        month: z.number().min(1).max(12),
    }),
);

const days = new Hono().post("/", daysValidator, async (c) => {
    const { month } = c.req.valid("json");
    const currentYear = DateTime.now().year;
    // 月の最終日を取得
    const lastDay = DateTime.local(currentYear, month).daysInMonth || 31;

    return c.json({ days: [...range(1, lastDay + 1)] });
});

export type DaysApi = typeof days;
export default days;
