import { useState } from "hono/jsx";
import type { FC } from "hono/jsx";
import { daysClient } from "../client/apiClient";

export const BirthdayForm: FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [days, setDays] = useState<number[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleMonthChange = async (e: Event) => {
        const month = (e.target as HTMLSelectElement).value;
        setSelectedMonth(month);
        setSelectedDay("");
        setError("");

        if (month) {
            try {
                const response = await daysClient.index.$post({
                    json: { month: Number(month) },
                });
                const data = await response.json();
                if (!response.ok) {
                    setError("日付の取得に失敗しました");
                    setDays([]);
                    return;
                }
                setDays(data.days);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "日付の取得に失敗しました",
                );
                setDays([]);
            }
        } else {
            setDays([]);
        }
    };

    return (
        <form method="post" action="/result" class="space-y-4">
            <div>
                <label
                    for="month"
                    class="block text-sm font-medium text-gray-700"
                >
                    月
                </label>
                <select
                    id="month"
                    name="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">月を選択</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}月
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label
                    for="day"
                    class="block text-sm font-medium text-gray-700"
                >
                    日
                </label>
                <select
                    id="day"
                    name="day"
                    value={selectedDay}
                    onChange={(e) =>
                        setSelectedDay((e.target as HTMLSelectElement).value)
                    }
                    disabled={!selectedMonth}
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">日を選択</option>
                    {days.map((day) => (
                        <option key={day} value={day}>
                            {day}日
                        </option>
                    ))}
                </select>
            </div>

            {error && <div class="text-red-600 text-sm">{error}</div>}

            <button
                type="submit"
                disabled={!selectedMonth || !selectedDay}
                class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                計算する
            </button>
        </form>
    );
};
