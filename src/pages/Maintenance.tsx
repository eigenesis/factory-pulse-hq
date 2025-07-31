import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Settings, Wrench, Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export default function Maintenance() {
  const maintenanceMetrics = {
    plannedMaintenance: 15,
    overdueTasks: 3,
    upcomingTasks: 8,
    mtbf: 147, // Mean Time Between Failures (hours)
    mttr: 2.3  // Mean Time To Repair (hours)
  }

  const maintenanceTasks = [
    { 
      equipment: "CNC Machine #1", 
      task: "Lubrication & Calibration", 
      priority: "High", 
      dueDate: "Today", 
      estimatedTime: "2 hours",
      technician: "Mike R.",
      status: "Overdue"
    },
    { 
      equipment: "Assembly Robot #2", 
      task: "Software Update", 
      priority: "Medium", 
      dueDate: "Tomorrow", 
      estimatedTime: "1 hour",
      technician: "Sarah M.",
      status: "Scheduled"
    },
    { 
      equipment: "Packaging Line #1", 
      task: "Belt Replacement", 
      priority: "Critical", 
      dueDate: "Today", 
      estimatedTime: "4 hours",
      technician: "John D.",
      status: "In Progress"
    },
    { 
      equipment: "Quality Inspection", 
      task: "Sensor Recalibration", 
      priority: "Low", 
      dueDate: "Next Week", 
      estimatedTime: "30 min",
      technician: "Lisa K.",
      status: "Planned"
    }
  ]

  const equipmentHealth = [
    { name: "CNC Machine #1", health: 85, lastMaintenance: "2024-01-15", nextDue: "2024-02-15", alerts: 1 },
    { name: "Assembly Robot #2", health: 92, lastMaintenance: "2024-01-20", nextDue: "2024-02-20", alerts: 0 },
    { name: "Packaging Line #1", health: 45, lastMaintenance: "2023-12-10", nextDue: "Overdue", alerts: 3 },
    { name: "Quality Inspection", health: 98, lastMaintenance: "2024-01-25", nextDue: "2024-02-25", alerts: 0 }
  ]

  const recentWork = [
    { equipment: "Conveyor Belt A", task: "Motor Replacement", technician: "Mike R.", duration: "3.5 hours", date: "Yesterday", cost: "$1,250" },
    { equipment: "Hydraulic Press", task: "Oil Change", technician: "Sarah M.", duration: "1 hour", date: "2 days ago", cost: "$85" },
    { equipment: "Cooling System", task: "Filter Replacement", technician: "John D.", duration: "45 min", date: "3 days ago", cost: "$45" }
  ]

  return (
    <DashboardLayout 
      title="Maintenance Management" 
      subtitle="Preventive maintenance scheduling and equipment health monitoring"
    >
      <div className="space-y-6">
        {/* Maintenance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <MetricCard
            title="Planned Tasks"
            value={maintenanceMetrics.plannedMaintenance}
            status="neutral"
            icon={Calendar}
          />
          <MetricCard
            title="Overdue Tasks"
            value={maintenanceMetrics.overdueTasks}
            status="critical"
            trend={{ value: 1, label: 'vs last week', type: 'negative' }}
            icon={AlertTriangle}
          />
          <MetricCard
            title="Upcoming (7 days)"
            value={maintenanceMetrics.upcomingTasks}
            status="warning"
            icon={Clock}
          />
          <MetricCard
            title="MTBF"
            value={maintenanceMetrics.mtbf}
            unit="hrs"
            status="success"
            trend={{ value: 12, label: 'vs last month', type: 'positive' }}
            icon={CheckCircle}
          />
          <MetricCard
            title="MTTR"
            value={maintenanceMetrics.mttr}
            unit="hrs"
            status="success"
            trend={{ value: -0.3, label: 'vs last month', type: 'positive' }}
            icon={Wrench}
          />
        </div>

        {/* Maintenance Tasks & Equipment Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Maintenance Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Active Maintenance Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceTasks.map((task, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{task.equipment}</h3>
                      <Badge 
                        variant={
                          task.status === 'Overdue' ? 'destructive' :
                          task.status === 'In Progress' ? 'default' :
                          task.status === 'Scheduled' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {task.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-foreground mb-2">{task.task}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                      <div>Due: {task.dueDate}</div>
                      <div>Est. Time: {task.estimatedTime}</div>
                      <div>Priority: 
                        <Badge 
                          variant={task.priority === 'Critical' ? 'destructive' : task.priority === 'High' ? 'outline' : 'secondary'}
                          className="text-xs ml-1"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div>Tech: {task.technician}</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Start Work
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Equipment Health */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipmentHealth.map((equipment, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{equipment.name}</h3>
                      {equipment.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {equipment.alerts} Alert{equipment.alerts > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Health Score</span>
                        <span className="font-medium">{equipment.health}%</span>
                      </div>
                      <Progress 
                        value={equipment.health} 
                        className={`h-2 ${equipment.health < 60 ? 'bg-destructive/20' : equipment.health < 80 ? 'bg-warning/20' : 'bg-success/20'}`}
                      />
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Last Maintenance: {equipment.lastMaintenance}</div>
                        <div className={equipment.nextDue === 'Overdue' ? 'text-destructive font-medium' : ''}>
                          Next Due: {equipment.nextDue}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Maintenance Work */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Maintenance Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWork.map((work, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <div>
                      <p className="font-medium text-sm">{work.equipment}</p>
                      <p className="text-xs text-muted-foreground">{work.task}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{work.technician}</div>
                    <div className="text-xs text-muted-foreground">{work.duration} • {work.date}</div>
                    <div className="text-xs font-medium text-success">{work.cost}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}