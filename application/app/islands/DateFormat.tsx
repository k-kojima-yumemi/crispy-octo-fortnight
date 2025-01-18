import type { FC } from "hono/jsx";

type Props = {
    year?: number;
    month: number;
    day: number;
    style: Intl.DateTimeFormatOptions;
};

export const DateFormat: FC<Props> = ({ year, month, day, style }) => {
    const date = new Date(year || new Date().getFullYear(), month - 1, day);
    const options = Intl.DateTimeFormat().resolvedOptions();
    const currentLocale = options.locale;
    const timeZone = options.timeZone;
    return (
        <div class="flex flex-row gap-2 items-center">
            <div class="text-xl font-medium">
                {date.toLocaleDateString(currentLocale, style)}
            </div>
            <div class="text-sm text-gray-500 flex flex-row gap-1 items-center">
                <span class="after:content-[':']">Timezone</span>
                <span>{timeZone}</span>
            </div>
            <div class="text-sm text-gray-500 flex flex-row gap-1 items-center">
                <span class="after:content-[':']">Locale</span>
                <span>{currentLocale}</span>
            </div>
        </div>
    );
};
