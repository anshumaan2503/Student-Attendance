'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "lucide-react"

type Student = {
  id: string
  name: string
  email: string
}

type AttendanceRecord = {
  id: string
  studentId: string
  date: string
  status: 'present' | 'absent' | 'late'
}

export default function StudentAttendance() {
  const [students, setStudents] = useState<Student[]>([])
  const [newStudent, setNewStudent] = useState({ name: '', email: '' })
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [view, setView] = useState<'students' | 'attendance'>('students')

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0])
    setStudents([
      { id: '2401226020', name: 'Anshuman Tiwari', email: 'anshumaantiwari2003@gmail.com' },
      { id: '2', name: 'Maria Garcia', email: 'maria@example.com' },
      { id: '3', name: 'James Smith', email: 'james@example.com' },
    ])
  }, [])

  const addStudent = () => {
    const { name, email } = newStudent
    if (!name || !email) return

    setStudents(prev => [
      ...prev,
      { id: Date.now().toString(), name, email }
    ])
    setNewStudent({ name: '', email: '' })
  }

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceRecords(prev => {
      const updated = [...prev]
      const existingIndex = updated.findIndex(
        rec => rec.studentId === studentId && rec.date === selectedDate
      )

      if (existingIndex >= 0) {
        updated[existingIndex].status = status
      } else {
        updated.push({
          id: Date.now().toString(),
          studentId,
          date: selectedDate,
          status,
        })
      }

      return updated
    })
  }

  const getStatus = (studentId: string) =>
    attendanceRecords.find(r => r.studentId === studentId && r.date === selectedDate)?.status

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Student Attendance</CardTitle>
          <CardDescription>Manage students and track their attendance</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Toggle View */}
          <div className="flex gap-4 mb-6">
            {['students', 'attendance'].map(tab => (
              <Button
                key={tab}
                variant={view === tab ? 'default' : 'outline'}
                onClick={() => setView(tab as 'students' | 'attendance')}
              >
                {tab === 'students' ? 'Manage Students' : 'Take Attendance'}
              </Button>
            ))}
          </div>

          {/* Students View */}
          {view === 'students' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Add Student</h3>
              <div className="flex gap-2 mb-6">
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                  />
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    value={newStudent.email}
                    onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addStudent}>Add</Button>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-2">Student List</h3>
              <div className="space-y-2">
                {students.map(s => (
                  <Card key={s.id}>
                    <CardContent className="p-4">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-sm text-gray-500">{s.email}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Attendance View */}
          {view === 'attendance' && (
            <div>
              <div className="mb-6 flex items-center gap-4">
                <Calendar className="h-4 w-4" />
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-40"
                />
              </div>

              <h3 className="text-lg font-medium mb-2">Mark Attendance</h3>
              <div className="space-y-2">
                {students.map(s => {
                  const status = getStatus(s.id)
                  return (
                    <Card key={s.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{s.name}</p>
                          <p className="text-sm text-gray-500">{s.email}</p>
                        </div>
                        <div className="flex gap-2">
                          {['present', 'late', 'absent'].map((type) => (
                            <Button
                              key={type}
                              variant={
                                status === type
                                  ? type === 'absent' ? 'destructive' : 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() => markAttendance(s.id, type as any)}
                            >
                              {type[0].toUpperCase() + type.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
