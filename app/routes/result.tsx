import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { z } from "zod";
import { BirthdayResult } from "../islands/BirthdayResult";

const dateValidator = zValidator(
    "form",
    z.object({
        month: z.coerce.number().min(1).max(12),
        day: z.coerce.number().min(1).max(31),
    }),
);

export const POST = createRoute(dateValidator, async (c) => {
    const { month, day } = c.req.valid("form");

    return c.render(
        <div class="container mx-auto p-4">
            <BirthdayResult month={month} day={day} />
        </div>,
        { title: "誕生日までの日数" },
    );
});
