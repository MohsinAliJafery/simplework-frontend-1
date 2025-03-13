import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const UserManagement = () => {
      // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", lastLogin: "1 day ago" },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "5 days ago",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Editor",
      status: "Active",
      lastLogin: "3 hours ago",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Viewer",
      status: "Active",
      lastLogin: "2 days ago",
    },
    { id: 6, name: "Emma Davis", email: "emma@example.com", role: "Admin", status: "Active", lastLogin: "Just now" },
    {
      id: 7,
      name: "Michael Wilson",
      email: "michael@example.com",
      role: "Editor",
      status: "Inactive",
      lastLogin: "1 week ago",
    },
    {
      id: 8,
      name: "Olivia Martinez",
      email: "olivia@example.com",
      role: "Viewer",
      status: "Active",
      lastLogin: "4 hours ago",
    },
    {
      id: 9,
      name: "James Taylor",
      email: "james@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "Yesterday",
    },
    {
      id: 10,
      name: "Sophia Anderson",
      email: "sophia@example.com",
      role: "Editor",
      status: "Active",
      lastLogin: "5 hours ago",
    },
    {
      id: 11,
      name: "William Thomas",
      email: "william@example.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "2 weeks ago",
    },
    {
      id: 12,
      name: "Ava Jackson",
      email: "ava@example.com",
      role: "Editor",
      status: "Active",
      lastLogin: "6 hours ago",
    },
    {
      id: 13,
      name: "Ethan White",
      email: "ethan@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "3 days ago",
    },
    {
      id: 14,
      name: "Isabella Harris",
      email: "isabella@example.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "10 days ago",
    },
    {
      id: 15,
      name: "Mason Martin",
      email: "mason@example.com",
      role: "Editor",
      status: "Active",
      lastLogin: "7 hours ago",
    },
    {
      id: 16,
      name: "Charlotte Thompson",
      email: "charlotte@example.com",
      role: "Viewer",
      status: "Active",
      lastLogin: "4 days ago",
    },
    {
      id: 17,
      name: "Alexander Garcia",
      email: "alexander@example.com",
      role: "Admin",
      status: "Inactive",
      lastLogin: "3 weeks ago",
    },
    {
      id: 18,
      name: "Amelia Robinson",
      email: "amelia@example.com",
      role: "Editor",
      status: "Active",
      lastLogin: "8 hours ago",
    },
    {
      id: 19,
      name: "Benjamin Clark",
      email: "benjamin@example.com",
      role: "Viewer",
      status: "Active",
      lastLogin: "5 days ago",
    },
    {
      id: 20,
      name: "Mia Rodriguez",
      email: "mia@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "9 hours ago",
    },
  ])

  const [userToDelete, setUserToDelete] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  // Add pagination to the user table by adding this state after the searchTerm state
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  const handleDeleteUser = () => {
    if (userToDelete !== null) {
      setUsers(users.filter((user) => user.id !== userToDelete))
      setUserToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  return (
    <div className="dark">
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>User Management</CardTitle>
          <CardDescription className="pt-2">
            Manage your users and their permissions
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className=" rounded-[6px] border border-gray-800 p-3 pt-1">
          <Table>
            <TableHeader>
              <TableRow className="border-b-gray-800">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <TableRow key={user.id} className="hover:border-y-gray-800 border-none">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 pb-1 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-800 text-green-100"
                            : "bg-gray-600 text-gray-100"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={isDeleteDialogOpen && userToDelete === user.id}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (!open) setUserToDelete(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button className="rounded-[0.4rem]"
                            variant="destructive"
                            size="sm"
                            onClick={() => setUserToDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete User</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete {user.name}? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button className="rounded-[0.4rem]"
                              variant="outline"
                              onClick={() => setIsDeleteDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button className="rounded-[0.4rem]"
                              variant="destructive"
                              onClick={handleDeleteUser}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstUser + 1} to{" "}
              {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </div>
            <div className="flex items-center space-x-2">
              <Button className="rounded-[0.4rem]"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages || 1}
              </div>
              <Button className="rounded-[0.4rem]"
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  )
};

export default UserManagement;
