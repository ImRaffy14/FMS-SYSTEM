import { Users, BookOpen, Clock, Calendar, Building, FileText, ArrowUp, ArrowDown, MoreVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const Dashboard = () => {
  // Mock data - replace with actual API calls
  const stats = [
    { title: "Total Faculty", value: "48", change: "+12%", icon: Users, trend: "up" },
    { title: "Active Courses", value: "24", change: "+3%", icon: BookOpen, trend: "up" },
    { title: "Subjects Offered", value: "156", change: "-2%", icon: BookOpen, trend: "down" },
    { title: "Classrooms", value: "32", change: "0%", icon: Building, trend: "neutral" },
    { title: "Scheduled Classes", value: "128", change: "+8%", icon: Calendar, trend: "up" },
    { title: "Documents", value: "245", change: "+15%", icon: FileText, trend: "up" }
  ]

  const recentActivities = [
    { id: 1, faculty: "Dr. Smith", action: "Uploaded syllabus", module: "Documents", time: "10 min ago" },
    { id: 2, faculty: "Prof. Johnson", action: "Updated schedule", module: "Faculty Loading", time: "25 min ago" },
    { id: 3, faculty: "Admin", action: "Added new course", module: "Courses", time: "1 hour ago" },
    { id: 4, faculty: "Dr. Lee", action: "Requested room change", module: "Room Management", time: "2 hours ago" },
    { id: 5, faculty: "System", action: "Automated backup", module: "System", time: "3 hours ago" }
  ]

  const upcomingSchedules = [
    { id: 1, faculty: "Dr. Smith", course: "CS101", subject: "Data Structures", room: "Room 101", time: "Mon, 9:00 AM" },
    { id: 2, faculty: "Prof. Johnson", course: "CS102", subject: "Algorithms", room: "Room 202", time: "Mon, 1:00 PM" },
    { id: 3, faculty: "Dr. Lee", course: "CS201", subject: "Database Systems", room: "Room 105", time: "Tue, 10:00 AM" },
    { id: 4, faculty: "Dr. Garcia", course: "CS301", subject: "AI Fundamentals", room: "Lab 3", time: "Wed, 9:00 AM" },
    { id: 5, faculty: "Prof. Wilson", course: "CS401", subject: "Cloud Computing", room: "Room 203", time: "Thu, 2:00 PM" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Faculty Management Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>Generate Analytics</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                {stat.change}
                {stat.trend === 'up' ? (
                  <ArrowUp className="h-3 w-3 ml-1" />
                ) : stat.trend === 'down' ? (
                  <ArrowDown className="h-3 w-3 ml-1" />
                ) : null}
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <Users className="h-6 w-6" />
              <span>Add Faculty</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <BookOpen className="h-6 w-6" />
              <span>Create Course</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Class</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <Building className="h-6 w-6" />
              <span>Manage Rooms</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <FileText className="h-6 w-6" />
              <span>Upload Document</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <Clock className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities and Upcoming Schedules */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activities</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View All</DropdownMenuItem>
                  <DropdownMenuItem>Filter Activities</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="font-medium">{activity.faculty}</div>
                      <div className="text-sm text-gray-500">{activity.action}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{activity.module}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-gray-500">
                      {activity.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Schedules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Classes</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Full Schedule</DropdownMenuItem>
                  <DropdownMenuItem>Filter Classes</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {upcomingSchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      <div className="font-medium">{schedule.faculty}</div>
                      <div className="text-sm text-gray-500">{schedule.course}</div>
                    </TableCell>
                    <TableCell>
                      <div>{schedule.subject}</div>
                      <div className="text-sm text-gray-500">{schedule.room}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{schedule.time}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Workload Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Faculty Workload Overview</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View All Faculty</DropdownMenuItem>
                <DropdownMenuItem>Generate Report</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Teaching Hours</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Dr. Smith</TableCell>
                  <TableCell>Computer Science</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>18 hrs/week</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default">Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Prof. Johnson</TableCell>
                  <TableCell>Information Technology</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>15 hrs/week</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default">Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dr. Lee</TableCell>
                  <TableCell>Computer Science</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell>20 hrs/week</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">On Leave</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dr. Garcia</TableCell>
                  <TableCell>Data Science</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>18 hrs/week</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default">Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Prof. Wilson</TableCell>
                  <TableCell>Computer Engineering</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>12 hrs/week</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="destructive">Overloaded</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard