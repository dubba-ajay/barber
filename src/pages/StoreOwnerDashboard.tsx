import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

const StoreOwnerDashboard = () => {
  const { role, setRole, ownerStoreId, jobs, bookings, earnings } = useMarketplace();

  const today = new Date().toISOString().slice(0,10);

  const revenueToday = useMemo(() => bookings.filter(b => b.storeId === ownerStoreId && b.date === today).reduce((s,b)=>s+b.price,0), [bookings, ownerStoreId, today]);
  const bookingsCountToday = useMemo(() => bookings.filter(b => b.storeId === ownerStoreId && b.date === today).length, [bookings, ownerStoreId, today]);

  const costToday = useMemo(() => {
    return earnings
      .filter(e => e.date === today)
      .filter(e => {
        const job = jobs.find(j => j.id === e.jobId);
        return job && job.storeId === ownerStoreId;
      })
      .reduce((s,e)=>s+e.amount,0);
  }, [earnings, jobs, ownerStoreId, today]);

  const profitToday = Math.max(0, revenueToday - costToday);

  const last7 = useMemo(() => {
    const days: { date: string; revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const revenue = bookings.filter(b => b.storeId === ownerStoreId && b.date === key).reduce((s, b) => s + b.price, 0);
      days.push({ date: key.slice(5), revenue });
    }
    return days;
  }, [bookings, ownerStoreId]);

  const completedToday = useMemo(() => jobs.filter(j => j.storeId === ownerStoreId && j.date === today && (j.status === "completed" || j.status === "paid")), [jobs, ownerStoreId, today]);

  const workerBreakdown = useMemo(() => {
    const map: Record<string, { completed: number; home: number; insalon: number }> = {};
    for (const j of completedToday) {
      const key = j.freelancerId || "unassigned";
      if (!map[key]) map[key] = { completed: 0, home: 0, insalon: 0 };
      map[key].completed += 1;
      if (j.homeService) map[key].home += 1; else map[key].insalon += 1;
    }
    return map;
  }, [completedToday]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 container mx-auto px-4 lg:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Store Owner Dashboard</h1>
          <div className="text-sm">
            Role: <Badge>{role}</Badge>
            <Button variant="outline" size="sm" className="ml-2" onClick={() => setRole("owner")}>Switch to Owner</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today's Revenue</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">₹{revenueToday.toLocaleString()}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today's Profit</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">₹{profitToday.toLocaleString()}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Bookings Today</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{bookingsCountToday}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Workers Active</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{Object.keys(workerBreakdown).filter(k=>k!=="unassigned").length}</CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Last 7 days revenue</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--primary))" } }} className="h-64 w-full">
                <BarChart data={last7}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Today: In‑salon vs Home</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">In‑salon</div>
                  <div className="text-2xl font-bold">{Object.values(workerBreakdown).reduce((s,x)=>s+x.insalon,0)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Home</div>
                  <div className="text-2xl font-bold">{Object.values(workerBreakdown).reduce((s,x)=>s+x.home,0)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Today's services by worker</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker</TableHead>
                  <TableHead className="text-right">Completed</TableHead>
                  <TableHead className="text-right">In‑salon</TableHead>
                  <TableHead className="text-right">Home</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(workerBreakdown).map(([id, stats]) => (
                  <TableRow key={id}>
                    <TableCell>{id === "unassigned" ? <Badge variant="secondary">Unassigned</Badge> : `Freelancer ${id.slice(-4)}`}</TableCell>
                    <TableCell className="text-right">{stats.completed}</TableCell>
                    <TableCell className="text-right">{stats.insalon}</TableCell>
                    <TableCell className="text-right">{stats.home}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default StoreOwnerDashboard;
