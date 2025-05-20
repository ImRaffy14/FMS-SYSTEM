import {  Search, Filter, MoreVertical, Edit, Trash2, Eye, Plus } from "lucide-react"
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

const CoursesAndSubjectManagement = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isViewCourseOpen, setIsViewCourseOpen] = useState(false)
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("courses")

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    description: "",
    department: ""
  })

  const [newSubject, setNewSubject] = useState({
    code: "",
    name: "",
    description: "",
    credits: "",
    prerequisites: []
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Mock data - replace with actual API calls
  const coursesData = [
    {
      id: "1",
      code: "CS",
      name: "Computer Science",
      description: "Bachelor of Science in Computer Science",
      department: "College of Computing",
      subjects: 12
    },
    // More course data...
  ]

  const subjectsData = [
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Programming",
      description: "Fundamentals of programming concepts",
      credits: 3,
      prerequisites: [],
      course: "Computer Science"
    },
    // More subject data...
  ]

  const currentData = activeTab === "courses" ? coursesData : subjectsData
  const { processedItems: currentItems, totalItems, totalPages } = {
    processedItems: currentData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    totalItems: currentData.length,
    totalPages: Math.ceil(currentData.length / itemsPerPage)
  }

  const departments = ["All", "College of Computing", "College of Engineering", "College of Science"]

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Courses and Subject Management</h2>
        <Button className="gap-2" onClick={() => activeTab === "courses" ? setIsAddCourseOpen(true) : setIsAddSubjectOpen(true)}>
          <Plus size={16} />
          Add {activeTab === "courses" ? "Course" : "Subject"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "courses" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
          onClick={() => {
            setActiveTab("courses")
            setCurrentPage(1)
          }}
        >
          Courses
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "subjects" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
          onClick={() => {
            setActiveTab("subjects")
            setCurrentPage(1)
          }}
        >
          Subjects
        </button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Narrow down {activeTab} list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Search ${activeTab}...`}
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {activeTab === "courses" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-start gap-2">
                    <Filter size={16} />
                    Department: {selectedDepartment}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {departments.map((dept) => (
                    <DropdownMenuItem key={dept} onClick={() => setSelectedDepartment(dept)}>
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setSearchTerm("")
                setSelectedDepartment("All")
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Courses/Subjects Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{activeTab === "courses" ? "Courses" : "Subjects"}</CardTitle>
              <CardDescription>{totalItems} {activeTab} found</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                {activeTab === "courses" ? (
                  <>
                    <TableHead>Department</TableHead>
                    <TableHead>Subjects</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Credits</TableHead>
                    <TableHead>Course</TableHead>
                  </>
                )}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  {activeTab === "courses" ? (
                    <>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.subjects}</Badge>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{item.credits}</TableCell>
                      <TableCell>{item.course}</TableCell>
                    </>
                  )}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => {
                          setSelectedItem(item)
                          setIsViewCourseOpen(true)
                        }}>
                          <Eye size={16} />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => {
                          setSelectedItem(item)
                        }}>
                          <Edit size={16} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => {
                          setSelectedItem(item)
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
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} {activeTab}
          </div>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CardFooter>
      </Card>

      {/* Add Course Modal */}
      <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>Fill in the details below to create a new course.</DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault()
            // Handle add course logic
            setIsAddCourseOpen(false)
          }}>
            <div className="grid gap-4 py-4">
              {/* Course Code */}
              <div className="space-y-2">
                <Label htmlFor="courseCode">
                  Course Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="courseCode"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  placeholder="CS"
                  required
                />
              </div>

              {/* Course Name */}
              <div className="space-y-2">
                <Label htmlFor="courseName">
                  Course Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="courseName"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  placeholder="Computer Science"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="courseDescription">Description</Label>
                <Input
                  id="courseDescription"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newCourse.department}
                  onValueChange={(value) => setNewCourse({ ...newCourse, department: value })}
                  required
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.filter(dept => dept !== "All").map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddCourseOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Course
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Subject Modal */}
      <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>Fill in the details below to create a new subject.</DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault()
            // Handle add subject logic
            setIsAddSubjectOpen(false)
          }}>
            <div className="grid gap-4 py-4">
              {/* Subject Code */}
              <div className="space-y-2">
                <Label htmlFor="subjectCode">
                  Subject Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subjectCode"
                  value={newSubject.code}
                  onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  placeholder="CS101"
                  required
                />
              </div>

              {/* Subject Name */}
              <div className="space-y-2">
                <Label htmlFor="subjectName">
                  Subject Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subjectName"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  placeholder="Introduction to Programming"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="subjectDescription">Description</Label>
                <Input
                  id="subjectDescription"
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                  placeholder="Fundamentals of programming concepts"
                />
              </div>

              {/* Credits */}
              <div className="space-y-2">
                <Label htmlFor="credits">
                  Credits <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  max="5"
                  value={newSubject.credits}
                  onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
                  placeholder="3"
                  required
                />
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
                    {coursesData.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Prerequisites */}
              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Select>
                  <SelectTrigger id="prerequisites">
                    <SelectValue placeholder="Select prerequisites" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsData.map(subject => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddSubjectOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Subject
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Course/Subject Modal */}
      <Dialog open={isViewCourseOpen} onOpenChange={setIsViewCourseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{activeTab === "courses" ? "Course" : "Subject"} Details</DialogTitle>
            <DialogDescription>View detailed information about this {activeTab.slice(0, -1)}.</DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Code</Label>
                    <p>{selectedItem.code}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Name</Label>
                    <p>{selectedItem.name}</p>
                  </div>
                </div>

                {activeTab === "courses" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-500">Department</Label>
                        <p>{selectedItem.department}</p>
                      </div>
                      <div>
                        <Label className="text-gray-500">Subjects</Label>
                        <p>
                          <Badge variant="secondary">{selectedItem.subjects}</Badge>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-500">Description</Label>
                      <p>{selectedItem.description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-500">Credits</Label>
                        <p>{selectedItem.credits}</p>
                      </div>
                      <div>
                        <Label className="text-gray-500">Course</Label>
                        <p>{selectedItem.course}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-500">Description</Label>
                      <p>{selectedItem.description}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Prerequisites</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedItem.prerequisites.length > 0 ? (
                          selectedItem.prerequisites.map((prereq: any, index: any) => (
                            <Badge key={index} variant="secondary">{prereq}</Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">None</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewCourseOpen(false)}>
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
        itemName={selectedItem?.name}
        isLoading={false}
        title={`Delete ${activeTab === "courses" ? "Course" : "Subject"}`}
        description={`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}

export default CoursesAndSubjectManagement