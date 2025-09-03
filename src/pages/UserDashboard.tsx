import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo, useState } from "react";

const sampleBookings = [
  { id: "b1", store: "Elite Men's Grooming", service: "Haircut", date: new Date(), time: "11:30", price: 499, status: "upcoming" as const },
  { id: "b2", store: "Glamour Hair & Beauty", service: "Facial", date: new Date(Date.now()+86400000), time: "15:00", price: 899, status: "upcoming" as const },
  { id: "b3", store: "Nail Couture", service: "Gel Manicure", date: new Date(Date.now()-86400000*2), time: "13:00", price: 699, status: "past" as const },
];

function format(d: Date) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const UserDashboard = () => {
  const { user, role } = useAuth();
  const [tab, setTab] = useState("bookings");

  const today = new Date();
  const todays = useMemo(() => sampleBookings.filter(b => b.date.toDateString() === today.toDateString()), []);
  const upcoming = useMemo(() => sampleBookings.filter(b => b.date >= today), []);
  const past = useMemo(() => sampleBookings.filter(b => b.date < today), []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 container mx-auto px-4 lg:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <div className="flex items-center gap-3">
            <Avatar><AvatarFallback>{(user?.email?.[0] || "U").toUpperCase()}</AvatarFallback></Avatar>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="help">Help Center</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{todays.length}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Upcoming</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{upcoming.length}</CardContent></Card>
              <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Past</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{past.length}</CardContent></Card>
            </div>

            <Card>
              <CardHeader><CardTitle>Your bookings</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleBookings.map(b => (
                      <TableRow key={b.id}>
                        <TableCell>{b.store}</TableCell>
                        <TableCell>{b.service}</TableCell>
                        <TableCell>{format(b.date)}</TableCell>
                        <TableCell>{b.time}</TableCell>
                        <TableCell>₹{b.price}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm" variant="destructive">Cancel</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
              <CardContent className="grid gap-4 md:max-w-lg">
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ""} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Input value={role || "customer"} readOnly />
                </div>
                <div className="text-sm text-muted-foreground">Contact support to edit profile details.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help">
            <Card>
              <CardHeader><CardTitle>Help Center</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <p>Need assistance with bookings, payments, or your account?</p>
                <div className="flex gap-2">
                  <Button asChild><a href="#" target="_blank" rel="noreferrer">View FAQs</a></Button>
                  <Button variant="outline" asChild><a href="#" target="_blank" rel="noreferrer">Contact support</a></Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
