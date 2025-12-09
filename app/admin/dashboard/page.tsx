"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockUsers, mockAdminMetrics } from "@/lib/mock-data"
import { Users, Zap, TrendingUp, BarChart3, ToggleLeft as Toggle2, Sparkles, CheckCircle2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function AdminDashboard() {
  const [users, setUsers] = useState(mockUsers)

  const stats = [
    { label: "Total Users", value: mockAdminMetrics.totalUsers, icon: Users },
    { label: "Active Recruiters", value: 8, icon: Zap },
    { label: "Avg Match Score", value: "82%", icon: TrendingUp },
    { label: "Successful Hires", value: mockAdminMetrics.successfulHires, icon: BarChart3 },
  ]

  const toggleUserActive = (id: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)))
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">System Overview</h2>
        <p className="text-muted-foreground mt-2">Platform analytics and system management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platform">Platform Analytics</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Monitoring
          </TabsTrigger>
        </TabsList>

        {/* Platform Analytics Tab */}
        <TabsContent value="platform" className="space-y-6">
          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Users, jobs, and applications over the past 4 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAdminMetrics.platformGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} name="Users" />
                  <Line type="monotone" dataKey="jobs" stroke="#0891b2" strokeWidth={2} name="Jobs" />
                  <Line type="monotone" dataKey="applications" stroke="#16a34a" strokeWidth={2} name="Applications" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Monitor and manage platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Joined</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-foreground">{user.name}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-transparent capitalize">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{user.joined}</td>
                        <td className="py-3 px-4">
                          <Badge variant={user.active ? "default" : "secondary"}>
                            {user.active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleUserActive(user.id)}
                            className="inline-flex items-center justify-center hover:bg-secondary rounded p-2 transition-colors"
                          >
                            <Toggle2 className="h-4 w-4 text-primary" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="configuration" className="space-y-6">
          {/* System Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Platform settings and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="min-match">Minimum Match Score</Label>
                  <Input id="min-match" type="number" defaultValue={60} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Minimum score for candidate recommendations</p>
                </div>
                <div>
                  <Label htmlFor="max-applications">Max Applications Per Job</Label>
                  <Input id="max-applications" type="number" defaultValue={100} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Maximum applications allowed per job posting</p>
                </div>
                <div>
                  <Label htmlFor="retention">Data Retention (days)</Label>
                  <Input id="retention" type="number" defaultValue={365} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">How long to retain user data</p>
                </div>
                <div>
                  <Label htmlFor="max-cv">Max CV File Size (MB)</Label>
                  <Input id="max-cv" type="number" defaultValue={10} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Maximum CV upload size</p>
                </div>
              </div>
              <Button className="w-full">Save Configuration</Button>
            </CardContent>
          </Card>

          {/* AI Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>AI System Configuration</CardTitle>
              <CardDescription>Configure AI matching engine parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="ai-sensitivity">AI Sensitivity Level</Label>
                  <Input id="ai-sensitivity" type="number" min="1" max="10" defaultValue={7} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">How strict the AI matching should be (1-10)</p>
                </div>
                <div>
                  <Label htmlFor="skill-weight">Skill Weight (%)</Label>
                  <Input id="skill-weight" type="number" min="0" max="100" defaultValue={40} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Skill matching weight in overall score</p>
                </div>
                <div>
                  <Label htmlFor="exp-weight">Experience Weight (%)</Label>
                  <Input id="exp-weight" type="number" min="0" max="100" defaultValue={35} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Experience weight in overall score</p>
                </div>
                <div>
                  <Label htmlFor="ed-weight">Education Weight (%)</Label>
                  <Input id="ed-weight" type="number" min="0" max="100" defaultValue={25} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Education weight in overall score</p>
                </div>
              </div>
              <div>
                <Label htmlFor="model-version">Current Model Version</Label>
                <Input id="model-version" type="text" value="AI-v3.2.1" disabled className="mt-2 bg-secondary" />
                <p className="text-xs text-muted-foreground mt-1">Auto-updated daily</p>
              </div>
              <Button className="w-full">Save AI Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Monitoring Tab */}
        <TabsContent value="ai" className="space-y-6">
          {/* AI Performance Overview */}
          <div className="grid md:grid-cols-2 gap-4">
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-900 dark:text-green-300">
                AI systems operational. All models performing within expected parameters.
              </AlertDescription>
            </Alert>
          </div>

          {/* Main Monitoring Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Matching Engine Status
              </CardTitle>
              <CardDescription>Real-time performance metrics and system health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">Accuracy Rate</label>
                      <span className="text-sm font-bold text-green-600">94%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Model accuracy on test set</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">Response Time</label>
                      <span className="text-sm font-bold text-primary">245ms</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Average API response time</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">System Load</label>
                      <span className="text-sm font-bold text-accent">32%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "32%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Current system utilization</p>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="border-t pt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">CV Analysis</p>
                    <p className="text-2xl font-bold text-primary">1,247</p>
                    <p className="text-xs text-muted-foreground">CVs analyzed today</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Job Matches</p>
                    <p className="text-2xl font-bold text-accent">2,847</p>
                    <p className="text-xs text-muted-foreground">Matches generated today</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Model Confidence</p>
                    <p className="text-2xl font-bold text-primary">88%</p>
                    <p className="text-xs text-muted-foreground">Average prediction confidence</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Last Model Update</p>
                    <p className="text-sm font-medium">2025-12-05 14:32 UTC</p>
                    <p className="text-xs text-muted-foreground">Training cycle: 24 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Usage */}
          <Card>
            <CardHeader>
              <CardTitle>AI Feature Usage</CardTitle>
              <CardDescription>Usage statistics for AI-powered features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-foreground">CV Analysis Tool</p>
                  <Badge className="bg-blue-100 text-blue-900">342 uses</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Candidates using ATS scoring and analysis</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-foreground">Job Matching</p>
                  <Badge className="bg-green-100 text-green-900">856 uses</Badge>
                </div>
                <p className="text-xs text-muted-foreground">CV-JD matching analysis performed</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-foreground">Candidate Ranking</p>
                  <Badge className="bg-purple-100 text-purple-900">128 uses</Badge>
                </div>
                <p className="text-xs text-muted-foreground">AI-powered candidate rankings generated</p>
              </div>
            </CardContent>
          </Card>

          {/* System Health Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>AI system status and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p className="text-sm font-medium text-green-900 dark:text-green-300">All APIs Operational</p>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Database Connected</p>
                </div>
                <Badge className="bg-blue-600">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Model Serving</p>
                </div>
                <Badge className="bg-blue-600">Running</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
