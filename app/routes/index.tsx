import { createRoute } from "honox/factory";

export default createRoute((c) => {
    return c.render(
        <div>
            <h1 class="text-2xl text-cyan-600">Hello!</h1>
        </div>,
        {
            title: "Home",
        },
    );
});
