import { Calendar, Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import PaginationControls from "@/components/PaginationControls"
import { ConfirmationModal } from "@/components/ConfirmationModal"

const FacultyLoadingSchedule = () => {
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false)
  const [isViewScheduleOpen, setIsViewScheduleOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDay, setSelectedDay] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const schedulesPerPage = 5

  // Mock data - replace with actual API calls
  const schedulesData = [
    {
      id: "1",
      facultyName: "Dr. Smith",
      courseName: "Computer Science",
      subjectName: "Data Structures",
      roomName: "Room 101",
      day: "Monday",
      time: "9:00 AM - 11:00 AM",
      semester: "1st",
      academicYear: "2023-2024"
    },
    // More schedule data...
  ]

  const { processedItems: currentSchedules, totalItems, totalPages } = {
    processedItems: schedulesData.slice((currentPage - 1) * schedulesPerPage, currentPage * schedulesPerPage),
    totalItems: schedulesData.length,
    totalPages: Math.ceil(schedulesData.length / schedulesPerPage)
  }

  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="space-y-6">
      {/* Header and Add Schedule Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Faculty Loading Schedule</h2>
        <Button className="gap-2" onClick={() => setIsAddScheduleOpen(true)}>
          <Calendar size={16} />
          Add Schedule
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Narrow down schedule list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search schedules..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start gap-2">
                  <Filter size={16} />
                  Day: {selectedDay}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {days.map((day) => (
                  <DropdownMenuItem key={day} onClick={() => setSelectedDay(day)}>
                    {day}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setSearchTerm("")
                setSelectedDay("All")
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedules Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Schedules</CardTitle>
              <CardDescription>{totalItems} schedules found</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Day & Time</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.facultyName}</TableCell>
                  <TableCell>{schedule.courseName}</TableCell>
                  <TableCell>{schedule.subjectName}</TableCell>
                  <TableCell>{schedule.roomName}</TableCell>
                  <TableCell>
                    <div className="font-medium">{schedule.day}</div>
                    <div className="text-sm text-gray-500">{schedule.time}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{schedule.semester}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => {
                          setSelectedSchedule(schedule)
                          setIsViewScheduleOpen(true)
                        }}>
                          <Eye size={16} />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => {
                          setSelectedSchedule(schedule)
                        }}>
                          <Edit size={16} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => {
                          setSelectedSchedule(schedule)
                          setIsConfirmationOpen(true)
                        }}>
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * schedulesPerPage + 1, totalItems)} to{" "}
            {Math.min(currentPage * schedulesPerPage, totalItems)} of {totalItems} schedules
          </div>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CardFooter>
      </Card>

      {/* Add Schedule Modal */}
      <Dialog open={isAddScheduleOpen} onOpenChange={setIsAddScheduleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Schedule</DialogTitle>
            <DialogDescription>Fill in the details below to create a new faculty schedule.</DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault()
            // Handle add schedule logic
            setIsAddScheduleOpen(false)
          }}>
            <div className="grid gap-4 py-4">
              {/* Faculty */}
              <div className="space-y-2">
                <Label htmlFor="faculty">
                  Faculty <span className="text-red-500">*</span>
                </Label>
                <Select required>
                  <SelectTrigger id="faculty">
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dr. Smith</SelectItem>
                    <SelectItem value="2">Prof. Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Course */}
              <div className="space-y-2">
                <Label htmlFor="course">
                  Course <span className="text-red-500">*</span>
                </Label>
                <Select required>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Computer Science</SelectItem>
                    <SelectItem value="2">Information Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Select required>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Data Structures</SelectItem>
                    <SelectItem value="2">Algorithms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Room */}
              <div className="space-y-2">
                <Label htmlFor="room">
                  Room <span className="text-red-500">*</span>
                </Label>
                <Select required>
                  <SelectTrigger id="room">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Room 101</SelectItem>
                    <SelectItem value="2">Room 202</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Day */}
              <div className="space-y-2">
                <Label htmlFor="day">
                  Day <span className="text-red-500">*</span>
                </Label>
                <Select required>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.filter(day => day !== "All").map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">
                    Start Time <span className="text-red-500">*</span>
                  </Label>
                  <Input id="startTime" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">
                    End Time <span className="text-red-500">*</span>
                  </Label>
                  <Input id="endTime" type="time" required />
                </div>
              </div>

              {/* Semester */}
              <div className="space-y-2">
                <Label htmlFor="semester">
                  Semester <span className="text-red-500">*</span>
                </Label>
                <Select required>
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Semester</SelectItem>
                    <SelectItem value="2nd">2nd Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Academic Year */}
              <div className="space-y-2">
                <Label htmlFor="academicYear">
                  Academic Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="academicYear"
                  placeholder="2023-2024"
                  required
                  pattern="\d{4}-\d{4}"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddScheduleOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Schedule
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Schedule Modal */}
      <Dialog open={isViewScheduleOpen} onOpenChange={setIsViewScheduleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Details</DialogTitle>
            <DialogDescription>View detailed information about this schedule.</DialogDescription>
          </DialogHeader>

          {selectedSchedule && (
            <div className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Faculty</Label>
                    <p>{selectedSchedule.facultyName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Course</Label>
                    <p>{selectedSchedule.courseName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Subject</Label>
                    <p>{selectedSchedule.subjectName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Room</Label>
                    <p>{selectedSchedule.roomName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Day</Label>
                    <p>{selectedSchedule.day}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Time</Label>
                    <p>{selectedSchedule.time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Semester</Label>
                    <p>{selectedSchedule.semester}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Academic Year</Label>
                    <p>{selectedSchedule.academicYear}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewScheduleOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => {
          // Handle delete logic
          setIsConfirmationOpen(false)
        }}
        itemName={selectedSchedule?.facultyName}
        isLoading={false}
        title="Delete Schedule"
        description="Are you sure you want to delete this schedule?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}

export default FacultyLoadingSchedule