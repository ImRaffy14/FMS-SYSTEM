import type React from "react"
import { Building, DoorOpen, Search, Filter, MoreVertical, Edit, Trash2, Eye, X, Loader2, Plus } from "lucide-react"
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

const RoomManagement = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false)
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false)
  const [isViewRoomOpen, setIsViewRoomOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)

  const [newRoom, setNewRoom] = useState({
    name: "",
    building: "",
    capacity: "",
    type: "Classroom",
    equipment: []
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBuilding, setSelectedBuilding] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const roomsPerPage = 5

  // Mock data - replace with actual API calls
  const roomsData = [
    {
      id: "1",
      name: "Room 101",
      building: "Main Building",
      capacity: 30,
      type: "Classroom",
      equipment: ["Projector", "Whiteboard"],
      status: "Available"
    },
    // More room data...
  ]

  const { processedItems: currentRooms, totalItems, totalPages } = {
    processedItems: roomsData.slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage),
    totalItems: roomsData.length,
    totalPages: Math.ceil(roomsData.length / roomsPerPage)
  }

  const buildings = ["All", "Main Building", "Science Building", "Engineering Building"]
  const roomTypes = ["Classroom", "Laboratory", "Conference Room", "Auditorium"]

  return (
    <div className="space-y-6">
      {/* Header and Add Room Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Room Management</h2>
        <Button className="gap-2" onClick={() => setIsAddRoomOpen(true)}>
          <Plus size={16} />
          Add Room
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Narrow down room list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search rooms..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start gap-2">
                  <Filter size={16} />
                  Building: {selectedBuilding}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {buildings.map((building) => (
                  <DropdownMenuItem key={building} onClick={() => setSelectedBuilding(building)}>
                    {building}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setSearchTerm("")
                setSelectedBuilding("All")
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Rooms</CardTitle>
              <CardDescription>{totalItems} rooms found</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Building</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.name}</TableCell>
                  <TableCell>{room.building}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{room.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={room.status === "Available" ? "default" : "destructive"}>
                      {room.status}
                    </Badge>
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
                          setSelectedRoom(room)
                          setIsViewRoomOpen(true)
                        }}>
                          <Eye size={16} />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => {
                          setSelectedRoom(room)
                          setIsEditRoomOpen(true)
                        }}>
                          <Edit size={16} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => {
                          setSelectedRoom(room)
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
            Showing {Math.min((currentPage - 1) * roomsPerPage + 1, totalItems)} to{" "}
            {Math.min(currentPage * roomsPerPage, totalItems)} of {totalItems} rooms
          </div>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CardFooter>
      </Card>

      {/* Add Room Modal */}
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>Fill in the details below to create a new room.</DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault()
            // Handle add room logic
            setIsAddRoomOpen(false)
          }}>
            <div className="grid gap-4 py-4">
              {/* Room Name */}
              <div className="space-y-2">
                <Label htmlFor="roomName">
                  Room Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="roomName"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  placeholder="Room 101"
                  required
                />
              </div>

              {/* Building */}
              <div className="space-y-2">
                <Label htmlFor="building">
                  Building <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newRoom.building}
                  onValueChange={(value) => setNewRoom({ ...newRoom, building: value })}
                  required
                >
                  <SelectTrigger id="building">
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.filter(b => b !== "All").map(building => (
                      <SelectItem key={building} value={building}>{building}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label htmlFor="capacity">
                  Capacity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                  placeholder="30"
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">
                  Room Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newRoom.type}
                  onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Equipment */}
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment</Label>
                <Select>
                  <SelectTrigger id="equipment">
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="projector">Projector</SelectItem>
                    <SelectItem value="whiteboard">Whiteboard</SelectItem>
                    <SelectItem value="computers">Computers</SelectItem>
                    <SelectItem value="sound-system">Sound System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddRoomOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Room
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Room Modal */}
      <Dialog open={isViewRoomOpen} onOpenChange={setIsViewRoomOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Room Details</DialogTitle>
            <DialogDescription>View detailed information about this room.</DialogDescription>
          </DialogHeader>

          {selectedRoom && (
            <div className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Room Name</Label>
                    <p>{selectedRoom.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Building</Label>
                    <p>{selectedRoom.building}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Capacity</Label>
                    <p>{selectedRoom.capacity}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Type</Label>
                    <p>
                      <Badge variant="secondary">{selectedRoom.type}</Badge>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <p>
                      <Badge variant={selectedRoom.status === "Available" ? "default" : "destructive"}>
                        {selectedRoom.status}
                      </Badge>
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-500">Equipment</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedRoom.equipment.map((item: any, index: any) => (
                      <Badge key={index} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-500">Schedule</Label>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">Monday</div>
                      <div className="text-sm text-gray-500">9:00 AM - 11:00 AM | Data Structures | Dr. Smith</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">Wednesday</div>
                      <div className="text-sm text-gray-500">1:00 PM - 3:00 PM | Algorithms | Prof. Johnson</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewRoomOpen(false)}>
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
        itemName={selectedRoom?.name}
        isLoading={false}
        title="Delete Room"
        description="Are you sure you want to delete this room?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}

export default RoomManagement