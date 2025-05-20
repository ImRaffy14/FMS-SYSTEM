import { Clock, Search, Filter, MoreVertical, Trash2, Eye } from "lucide-react"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import PaginationControls from "@/components/PaginationControls"
import { ConfirmationModal } from "@/components/ConfirmationModal"

const FacultyMonitoring = () => {
  const [isViewFacultyOpen, setIsViewFacultyOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const facultyPerPage = 5

  // Mock data - replace with actual API calls
  const facultyData = [
    {
      id: "1",
      name: "Dr. Smith",
      email: "smith@university.edu",
      department: "Computer Science",
      subjects: ["Data Structures", "Algorithms"],
      status: "Active",
      hours: 18,
      imageUrl: "/placeholder.svg"
    },
    // More faculty data...
  ]

  const { processedItems: currentFaculty, totalItems, totalPages } = {
    processedItems: facultyData.slice((currentPage - 1) * facultyPerPage, currentPage * facultyPerPage),
    totalItems: facultyData.length,
    totalPages: Math.ceil(facultyData.length / facultyPerPage)
  }

  const statuses = ["All", "Active", "On Leave", "Inactive"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Faculty Monitoring</h2>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Narrow down faculty list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search faculty..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start gap-2">
                  <Filter size={16} />
                  Status: {selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {statuses.map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setSearchTerm("")
                setSelectedStatus("All")
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Faculty</CardTitle>
              <CardDescription>{totalItems} faculty members found</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Teaching Hours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFaculty.map((faculty) => (
                <TableRow key={faculty.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={faculty.imageUrl} alt="avatar" />
                        <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{faculty.name}</div>
                        <div className="text-sm text-gray-500">{faculty.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{faculty.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {faculty.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      faculty.status === "Active" ? "default" : 
                      faculty.status === "On Leave" ? "outline" : "destructive"
                    }>
                      {faculty.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span>{faculty.hours} hrs/week</span>
                    </div>
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
                          setSelectedFaculty(faculty)
                          setIsViewFacultyOpen(true)
                        }}>
                          <Eye size={16} />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => {
                          setSelectedFaculty(faculty)
                          setIsConfirmationOpen(true)
                        }}>
                          <Trash2 size={16} />
                          Remove
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
            Showing {Math.min((currentPage - 1) * facultyPerPage + 1, totalItems)} to{" "}
            {Math.min(currentPage * facultyPerPage, totalItems)} of {totalItems} faculty
          </div>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CardFooter>
      </Card>

      {/* View Faculty Modal */}
      <Dialog open={isViewFacultyOpen} onOpenChange={setIsViewFacultyOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Faculty Details</DialogTitle>
            <DialogDescription>View detailed information about this faculty member.</DialogDescription>
          </DialogHeader>

          {selectedFaculty && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedFaculty.imageUrl} alt="avatar" />
                  <AvatarFallback>{selectedFaculty.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{selectedFaculty.name}</h3>
                  <p className="text-sm text-gray-500">{selectedFaculty.email}</p>
                </div>
              </div>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Department</Label>
                    <p>{selectedFaculty.department}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <p>
                      <Badge variant={
                        selectedFaculty.status === "Active" ? "default" : 
                        selectedFaculty.status === "On Leave" ? "outline" : "destructive"
                      }>
                        {selectedFaculty.status}
                      </Badge>
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-500">Teaching Hours</Label>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <span>{selectedFaculty.hours} hrs/week</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-500">Subjects</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFaculty.subjects.map((subject: any, index: any) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-500">Schedule</Label>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">Monday</div>
                      <div className="text-sm text-gray-500">9:00 AM - 11:00 AM | Data Structures | Room 101</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">Wednesday</div>
                      <div className="text-sm text-gray-500">1:00 PM - 3:00 PM | Algorithms | Room 202</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewFacultyOpen(false)}>
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
          // Handle remove faculty logic
          setIsConfirmationOpen(false)
        }}
        itemName={selectedFaculty?.name}
        isLoading={false}
        title="Remove Faculty"
        description="Are you sure you want to remove this faculty member from monitoring?"
        confirmText="Remove"
        cancelText="Cancel"
      />
    </div>
  )
}

export default FacultyMonitoring