import { createRoute } from "honox/factory";
import { BirthdayResult } from "../islands/BirthdayResult";

export const POST = createRoute(async (c) => {
  const formData = await c.req.formData();
  const month = parseInt(formData.get('month') as string);
  const day = parseInt(formData.get('day') as string);

  if (isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
    return c.redirect('/');
  }

  return c.render(
    <div class="container mx-auto p-4">
      <BirthdayResult month={month} day={day} />
    </div>,
    { title: "誕生日までの日数" }
  );
});
