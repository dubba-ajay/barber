import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useMemo, useState } from "react";

const StoreOwnerDashboard = () => {
  const { role, setRole, ownerStoreId, jobs, bookings, todaysRevenue, bookingsToday, postJob } = useMarketplace();
  const myOpen = jobs.filter(j => j.storeId === ownerStoreId && j.status === "open");

  const [title, setTitle] = useState("Hair Stylist");
  const [hours, setHours] = useState(4);
  const [rate, setRate] = useState(300);
  const [startTime, setStartTime] = useState("12:00");
  const [homeService, setHomeService] = useState(false);

  const last7 = useMemo(() => {
    const days: { date: string; revenue: number; bookings: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const revenue = bookings.filter(b => b.date === key).reduce((s, b) => s + b.price, 0);
      const count = bookings.filter(b => b.date === key).length;
      days.push({ date: key.slice(5), revenue, bookings: count });
    }
    return days;
  }, [bookings]);

  const createShift = () => {
    postJob({
      storeId: ownerStoreId,
      storeName: "Elite Men's Grooming",
      title,
      location: "Connaught Place",
      date: new Date().toISOString().slice(0,10),
      startTime,
      hours,
      rate,
      homeService,
      freelancerId: undefined,
    });
    setTitle("Hair Stylist");
    setHours(4);
    setRate(300);
    setStartTime("12:00");
    setHomeService(false);
  };

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
            <CardContent className="text-2xl font-bold">₹{todaysRevenue.toLocaleString()}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Bookings Today</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{bookingsToday}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Open Shifts</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{myOpen.length}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Store</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">Elite Men's Grooming</CardContent>
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
            <CardHeader><CardTitle>Post a shift</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm">Role</Label>
                <Input value={title} onChange={e=>setTitle(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Hours</Label>
                  <Input type="number" min={1} value={hours} onChange={e=>setHours(parseInt(e.target.value||"0"))} />
                </div>
                <div>
                  <Label>Rate (₹/h)</Label>
                  <Input type="number" min={100} value={rate} onChange={e=>setRate(parseInt(e.target.value||"0"))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Start time</Label>
                  <Input value={startTime} onChange={e=>setStartTime(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch checked={homeService} onCheckedChange={setHomeService} />
                  <Label>Home service</Label>
                </div>
              </div>
              <Button className="w-full" onClick={createShift}>Create Shift</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Open shifts</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myOpen.map(j => (
                  <TableRow key={j.id}>
                    <TableCell>{j.title}</TableCell>
                    <TableCell>{j.date} • {j.startTime}</TableCell>
                    <TableCell>{j.hours}h</TableCell>
                    <TableCell>₹{j.rate}/h</TableCell>
                    <TableCell>{j.homeService ? <Badge>Home Service</Badge> : <Badge variant="secondary">In-Store</Badge>}</TableCell>
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
