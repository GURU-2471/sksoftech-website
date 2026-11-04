// In-memory stats & visitor logging store for SK Softech Admin Dashboard

export interface VisitorLog {
  id: number;
  timestamp: Date;
  ip: string;
  page: string;
}

// Seed 7 days of realistic traffic data
const dailyCounts: { [dateStr: string]: number } = {
  "2026-10-18": 142,
  "2026-10-19": 189,
  "2026-10-20": 210,
  "2026-10-21": 245,
  "2026-10-22": 268,
  "2026-10-23": 312,
  "2026-10-24": 348,
};

let visitorLogs: VisitorLog[] = [];

export function recordVisit(page: string = "/", ip: string = "127.0.0.1") {
  const today = new Date().toISOString().split("T")[0];
  dailyCounts[today] = (dailyCounts[today] || 0) + 1;
  visitorLogs.push({
    id: Date.now(),
    timestamp: new Date(),
    ip,
    page,
  });
}

export function getVisitorAnalytics() {
  const dates = Object.keys(dailyCounts).sort();
  const daily = dates.map((d) => ({ date: d, count: dailyCounts[d] }));

  const todayStr = dates[dates.length - 1];
  const todayCount = dailyCounts[todayStr] || 0;

  // 7-day total
  const weeklyTotal = dates.slice(-7).reduce((acc, d) => acc + (dailyCounts[d] || 0), 0);
  // Monthly projected
  const monthlyTotal = weeklyTotal * 4;

  return {
    today: todayCount,
    weeklyTotal,
    monthlyTotal,
    dailyBreakdown: daily.slice(-7),
  };
}
