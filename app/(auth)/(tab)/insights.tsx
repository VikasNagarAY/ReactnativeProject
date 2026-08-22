import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { colors } from "@/constants/theme";
import { formatCurrency } from "@/lib/utils";
import ListHeading from "@/components/ListHeading";

type DayBar = {
    day: string;
    amount: number;
};

type Transaction = {
    id: string;
    name: string;
    icon: any;
    date: string;
    price: number;
    currency: string;
    billing: string;
    color: string;
};

const WEEK_DATA: DayBar[] = [
    { day: "Mon", amount: 24 },
    { day: "Tue", amount: 28 },
    { day: "Wed", amount: 20 },
    { day: "Thr", amount: 40 },
    { day: "Fri", amount: 26 },
    { day: "Sat", amount: 18 },
    { day: "Sun", amount: 22 },
];

const HIGHLIGHT_DAY = "Thr";
const CHART_MAX = 45;
const CHART_HEIGHT = 90;

const RECENT_TRANSACTIONS: Transaction[] = [
    {
        id: "claude",
        name: "Claude",
        icon: icons.claude,
        date: "June 25, 12:00",
        price: 9.84,
        currency: "USD",
        billing: "per month",
        color: "#f5c542",
    },
    {
        id: "canva",
        name: "Canva",
        icon: icons.canva,
        date: "June 30, 16:00",
        price: 43.89,
        currency: "USD",
        billing: "per month",
        color: "#b8e8d0",
    },
];

const WeeklyChart = () => {
    return (
        <View className="chart-wrap">
            <View className="chart-axis">
                {[45, 35, 25, 5, 0].map((mark) => (
                    <Text key={mark} className="chart-axis-label">
                        {mark}
                    </Text>
                ))}
            </View>

            <View className="chart-bars">
                {WEEK_DATA.map(({ day, amount }) => {
                    const isHighlight = day === HIGHLIGHT_DAY;
                    const barHeight = Math.max(8, (amount / CHART_MAX) * CHART_HEIGHT);

                    return (
                        <View key={day} className="chart-col">
                            {isHighlight && (
                                <View className="chart-pill">
                                    <Text className="chart-pill-text">${amount}</Text>
                                </View>
                            )}
                            <View
                                className={isHighlight ? "chart-bar chart-bar-active" : "chart-bar"}
                                style={{ height: barHeight }}
                            />
                            <Text className="chart-day">{day}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const ExpensesSummary = () => {
    return (
        <View className="expense-card">
            <View className="expense-head">
                <Text className="expense-label">Expenses</Text>
                <Text className="expense-month">March 2026</Text>
            </View>
            <View className="expense-row">
                <Text className="expense-amount">-$424.63</Text>
                <View className="expense-badge">
                    <Text className="expense-badge-text">+12%</Text>
                </View>
            </View>
        </View>
    );
};

const TransactionRow = ({ tx }: { tx: Transaction }) => {
    return (
        <View className="txn-row" style={{ backgroundColor: tx.color }}>
            <View className="txn-icon-wrap">
                <Image source={tx.icon} className="txn-icon" />
            </View>
            <View className="txn-copy">
                <Text className="txn-name" numberOfLines={1}>
                    {tx.name}
                </Text>
                <Text className="txn-date" numberOfLines={1}>
                    {tx.date}
                </Text>
            </View>
            <View className="txn-price-box">
                <Text className="txn-price">{formatCurrency(tx.price, tx.currency)}</Text>
                <Text className="txn-billing">{tx.billing}</Text>
            </View>
        </View>
    );
};

const insights = () => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="insights-header">
                <Pressable hitSlop={12}>
                    <Image
                        source={icons.back}
                        className="insights-header-icon"
                        style={{ tintColor: colors.foreground }}
                    />
                </Pressable>
                <Text className="insights-title">Monthly Insights</Text>
                <Pressable hitSlop={12}>
                    <Image
                        source={icons.menu}
                        className="insights-header-icon"
                        style={{ tintColor: colors.foreground }}
                    />
                </Pressable>
            </View>

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                <ListHeading title="Upcoming" />
                <WeeklyChart />

                <ExpensesSummary />

                <ListHeading title="History" />
                {RECENT_TRANSACTIONS.map((tx) => (
                    <TransactionRow key={tx.id} tx={tx} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default insights;