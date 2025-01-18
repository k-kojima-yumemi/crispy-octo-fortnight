import { useEffect, useState } from "hono/jsx";
import type { FC } from "hono/jsx";
import { calculateClient } from "../api/client";

type Props = {
    month: number;
    day: number;
};

export const BirthdayResult: FC<Props> = ({ month, day }) => {
    const [result, setResult] = useState<string>("");
    const [nextBirthday, setNextBirthday] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const calculateBirthday = async () => {
            try {
                const response = await calculateClient.index.$post({
                    json: { month, day },
                });
                if (!response.ok) {
                    setResult("計算中にエラーが発生しました。");
                    return;
                }
                const data = await response.json();
                setResult(
                    `次の誕生日まであと${data.daysUntilBirthday}日です！`,
                );
                const nextBirthday = new Date(data.nextBirthday);
                setNextBirthday(
                    `${nextBirthday.toLocaleDateString(undefined, {
                        dateStyle: "long",
                    })} (${nextBirthday.toLocaleString(undefined, { weekday: "short" })})`,
                );
            } catch (error) {
                setResult(
                    error instanceof Error
                        ? error.message
                        : "計算中にエラーが発生しました。",
                );
            } finally {
                setIsLoading(false);
            }
        };

        calculateBirthday();
    }, [month, day]);

    return (
        <div class="grid-row gap-4">
            {isLoading ? (
                <div class="text-gray-600">計算中...</div>
            ) : (
                <>
                    <div class="text-xl font-medium">{nextBirthday}</div>
                    <div
                        class={`text-2xl font-bold ${result.includes("エラー") ? "text-red-600" : "text-indigo-600"}`}
                    >
                        {result}
                    </div>
                </>
            )}
            <a href="/" class=" text-indigo-600 hover:text-indigo-500">
                ← 戻る
            </a>
        </div>
    );
};
