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

    // 今年の誕生日
    let birthday = DateTime.local(currentYear, month, day);

    // 誕生日が過ぎている場合は来年の誕生日を設定
    if (birthday < today) {
        birthday = DateTime.local(currentYear + 1, month, day);
    }

    // 日数の計算
    const diffDays = Math.ceil(birthday.diff(today, 'days').days);

    return c.json({
        daysUntilBirthday: diffDays,
        nextBirthday: birthday.toISO(),
    });
});

export type CalculateApi = typeof calculate;
export default calculate;
