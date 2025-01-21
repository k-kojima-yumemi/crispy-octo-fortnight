import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { DateTime } from "luxon";
import { z } from "zod";

const dateValidator = zValidator(
    "json",
    z.object({
        month: z.number().min(1).max(12),
        day: z.number().min(1).max(31),
    }),
);

const calculate = new Hono().post("/", dateValidator, async (c) => {
    const { month, day } = c.req.valid("json");
    const today = DateTime.now();
    const currentYear = today.year;

    const birthday = (() => {
        const thisYear = DateTime.local(currentYear, month, day);
        if (thisYear < today) {
            return DateTime.local(currentYear + 1, month, day);
        }
        return thisYear;
    })();

    // 日数の計算
    const daysUntilBirthday = Math.ceil(birthday.diff(today, "days").days);
    const nextBirthday = birthday.toISO() || "";

    return c.json({
        daysUntilBirthday,
        nextBirthday,
    });
});

export type CalculateApi = typeof calculate;
export default calculate;
