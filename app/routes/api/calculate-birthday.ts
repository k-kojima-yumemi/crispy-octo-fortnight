import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
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

    const today = new Date();
    const currentYear = today.getFullYear();

    // 今年の誕生日
    let birthday = new Date(currentYear, month - 1, day);

    // 今年の誕生日が過ぎている場合は来年の誕生日を設定
    if (today > birthday) {
        birthday = new Date(currentYear + 1, month - 1, day);
    }

    // 日数の計算（ミリ秒を日数に変換）
    const diffTime = birthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return c.json({ daysUntilBirthday: diffDays });
});

export type CalculateApi = typeof calculate;
export default calculate;
