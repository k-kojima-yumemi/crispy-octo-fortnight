import { createRoute } from "honox/factory";
import { BirthdayForm } from "../islands/BirthdayForm";

export default createRoute((c) => {
    return c.render(
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-4">誕生日カウントダウン</h1>
            <BirthdayForm />
        </div>,
        { title: "誕生日カウントダウン" },
    );
});
