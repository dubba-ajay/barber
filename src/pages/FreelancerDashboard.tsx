import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

const FreelancerDashboard = () => {
  const {
    role, setRole,
    openJobs, myJobs, earnings,
    todaysEarnings,
    applyToJob, startJob, completeJob, requestPayout,
  } = useMarketplace();

  const pendingAmount = useMemo(() => earnings.filter(e => e.status === "pending").reduce((s, e) => s + e.amount, 0), [earnings]);

  const last7 = useMemo(() => {
    const days: { date: string; amount: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0,10);
      const amt = earnings.filter(e => e.date === key).reduce((s, e) => s + e.amount, 0);
      days.push({ date: key.slice(5), amount: amt });
    }
    return days;
  }, [earnings]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 container mx-auto px-4 lg:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
          <div className="text-sm">
            Role: <Badge>{role}</Badge>
            <Button variant="outline" size="sm" className="ml-2" onClick={() => setRole("freelancer")}>Switch to Freelancer</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today Earnings</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">₹{todaysEarnings.toLocaleString()}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Open Shifts</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{openJobs.length}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">My Active Jobs</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">{myJobs.filter(j=>j.status!=="paid").length}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pending Payout</CardTitle></CardHeader>
            <CardContent className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs">
          <TabsList>
            <TabsTrigger value="jobs">Available Shifts</TabsTrigger>
            <TabsTrigger value="my">My Jobs</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card>
              <CardHeader><CardTitle>Stores needing workers</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>When</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openJobs.map(j => (
                      <TableRow key={j.id}>
                        <TableCell>{j.storeName}</TableCell>
                        <TableCell>{j.title}</TableCell>
                        <TableCell>{j.date} • {j.startTime}</TableCell>
                        <TableCell>{j.hours}h</TableCell>
                        <TableCell>₹{j.rate}/h</TableCell>
                        <TableCell>{j.homeService ? <Badge>Home Service</Badge> : <Badge variant="secondary">In-Store</Badge>}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => applyToJob(j.id)}>Apply</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my">
            <Card>
              <CardHeader><CardTitle>My jobs</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pay</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myJobs.map(j => (
                      <TableRow key={j.id}>
                        <TableCell>{j.storeName}</TableCell>
                        <TableCell>{j.title}</TableCell>
                        <TableCell><Badge>{j.status.replace("_"," ")}</Badge></TableCell>
                        <TableCell>₹{(j.rate*j.hours).toLocaleString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                          {j.status === "assigned" && (
                            <Button size="sm" onClick={() => startJob(j.id)}>Start</Button>
                          )}
                          {j.status === "in_progress" && (
                            <Button size="sm" onClick={() => completeJob(j.id)}>Complete</Button>
                          )}
                          {j.status === "completed" && (
                            <Button size="sm" onClick={() => requestPayout(j.id)}>Request Payout</Button>
                          )}
                          {j.status === "paid" && (
                            <Badge variant="secondary">Paid</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader><CardTitle>Last 7 days earnings</CardTitle></CardHeader>
              <CardContent>
                <ChartContainer config={{ amount: { label: "Earnings", color: "hsl(var(--primary))" } }} className="h-64 w-full">
                  <AreaChart data={last7}>
                    <defs>
                      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Area dataKey="amount" type="monotone" stroke="hsl(var(--primary))" fill="url(#fill)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default FreelancerDashboard;
