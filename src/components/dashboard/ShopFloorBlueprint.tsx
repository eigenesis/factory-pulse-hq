import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EquipmentPosition {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  status: 'running' | 'idle' | 'down' | 'maintenance'
  rotation?: number
}

const equipmentData: EquipmentPosition[] = [
  { id: 'cnc1', name: 'CNC #1', x: 50, y: 100, width: 80, height: 40, status: 'running' },
  { id: 'cnc2', name: 'CNC #2', x: 200, y: 100, width: 80, height: 40, status: 'running' },
  { id: 'assembly1', name: 'Assembly #1', x: 350, y: 80, width: 60, height: 80, status: 'running' },
  { id: 'assembly2', name: 'Assembly #2', x: 450, y: 80, width: 60, height: 80, status: 'idle' },
  { id: 'qc1', name: 'QC Station', x: 580, y: 100, width: 70, height: 40, status: 'idle' },
  { id: 'packaging', name: 'Packaging', x: 400, y: 250, width: 120, height: 60, status: 'down' },
  { id: 'robot1', name: 'Robot Arm', x: 150, y: 220, width: 50, height: 50, status: 'maintenance' },
  { id: 'conveyor1', name: 'Conveyor A', x: 100, y: 180, width: 400, height: 20, status: 'running' },
  { id: 'warehouse', name: 'Raw Materials', x: 50, y: 300, width: 150, height: 80, status: 'running' },
]

const statusColors = {
  running: '#22c55e',
  idle: '#eab308', 
  down: '#ef4444',
  maintenance: '#8b5cf6'
}

const statusLabels = {
  running: 'Running',
  idle: 'Idle',
  down: 'Down', 
  maintenance: 'Maintenance'
}

export function ShopFloorBlueprint() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Production Floor Layout</h3>
          <div className="flex gap-4 text-sm">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: color }}
                />
                <span className="capitalize">{statusLabels[status as keyof typeof statusLabels]}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative w-full h-96 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
          {/* Grid Background */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'grid\' width=\'20\' height=\'20\' patternUnits=\'userSpaceOnUse\'%3e%3cpath d=\'M 20 0 L 0 0 0 20\' fill=\'none\' stroke=\'%23e5e7eb\' stroke-width=\'1\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\' /%3e%3c/svg%3e")' }}
          >
            {/* Equipment Items */}
            {equipmentData.map((equipment) => (
              <g key={equipment.id}>
                {/* Equipment Rectangle */}
                <rect
                  x={equipment.x}
                  y={equipment.y}
                  width={equipment.width}
                  height={equipment.height}
                  fill={statusColors[equipment.status]}
                  fillOpacity="0.7"
                  stroke={statusColors[equipment.status]}
                  strokeWidth="2"
                  rx="4"
                  className="cursor-pointer hover:fill-opacity-90 transition-all"
                />
                
                {/* Equipment Label */}
                <text
                  x={equipment.x + equipment.width / 2}
                  y={equipment.y + equipment.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-white"
                  style={{ fontSize: '10px' }}
                >
                  {equipment.name}
                </text>
                
                {/* Status Indicator */}
                <circle
                  cx={equipment.x + equipment.width - 8}
                  cy={equipment.y + 8}
                  r="4"
                  fill={statusColors[equipment.status]}
                  className={equipment.status === 'running' || equipment.status === 'down' ? 'animate-pulse' : ''}
                />
              </g>
            ))}
            
            {/* Flow Arrows */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
              </marker>
            </defs>
            
            {/* Material Flow Lines */}
            <path
              d="M 200 120 Q 275 120 350 120"
              stroke="#6b7280"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
            <path
              d="M 510 120 Q 545 120 580 120"
              stroke="#6b7280"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
            <path
              d="M 460 200 Q 460 225 460 250"
              stroke="#6b7280"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
            />
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
            <div className="text-xs font-medium mb-2">Equipment Status</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded animate-pulse" />
                <span>Active/Running</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded" />
                <span>Idle/Standby</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded animate-pulse" />
                <span>Down/Error</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-equipment-maintenance rounded" />
                <span>Maintenance</span>
              </div>
            </div>
          </div>
          
          {/* Live Updates Indicator */}
          <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg border">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="font-medium">Live Updates</span>
            </div>
          </div>
        </div>
        
        {/* Equipment Summary */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(statusLabels).map(([status, label]) => {
            const count = equipmentData.filter(eq => eq.status === status).length
            return (
              <div key={status} className="text-center">
                <Badge 
                  variant="outline" 
                  className="w-full justify-center"
                  style={{ borderColor: statusColors[status as keyof typeof statusColors] }}
                >
                  {count} {label}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}