import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
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
    const currentYear = new Date().getFullYear();
    // 月の最終日を取得
    const lastDay = new Date(currentYear, month, 0).getDate();

    return c.json({ days: [...range(1, lastDay)] });
});

export type DaysApi = typeof days;
export default days;
