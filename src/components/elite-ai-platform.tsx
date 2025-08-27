import React, { useState, useEffect } from 'react';
import {
  Play, Pause, Code, Eye, Sparkles, Zap, Brain, Database, TestTube, Cloud,
  ArrowRight, CheckCircle, Circle, MessageSquare, Layers, GitBranch, Rocket,
  Menu, X, Home, FolderOpen, Settings, BarChart3, Users, FileCode2,
  Monitor, Smartphone, Tablet, Download, Share2, Copy, Terminal,
  ChevronRight, Activity, Clock, Target, Plus, Filter, Search,
  MoreHorizontal, Bell, Crown, Star, Compass, Palette, Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Type definitions
type AgentStatus = 'idle' | 'active' | 'completed';

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  tasks: string[];
  progress: number;
  status: AgentStatus;
}

// AI Agent definitions with enhanced details
const AI_AGENTS: Agent[] = [
  {
    id: 'orchestrator',
    name: 'Project Orchestrator',
    icon: Brain,
    color: 'agent-orchestrator',
    description: 'Analyzing requirements and creating project blueprint',
    tasks: ['Parse user requirements', 'Define project architecture', 'Assign tasks to specialized agents'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'ui-designer',
    name: 'UI/UX Designer',
    icon: Palette,
    color: 'agent-ui', 
    description: 'Crafting beautiful, responsive user interfaces',
    tasks: ['Create component library', 'Design responsive layouts', 'Apply modern styling'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'backend',
    name: 'Backend Architect',
    icon: GitBranch,
    color: 'agent-backend',
    description: 'Building robust API endpoints and business logic',
    tasks: ['Design API architecture', 'Implement endpoints', 'Set up middleware'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'database',
    name: 'Database Engineer', 
    icon: Database,
    color: 'agent-database',
    description: 'Designing optimal data structures and relationships',
    tasks: ['Design database schema', 'Set up relationships', 'Create migrations'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'tester',
    name: 'Quality Assurance',
    icon: TestTube,
    color: 'agent-testing',
    description: 'Ensuring code quality and performance optimization',
    tasks: ['Run automated tests', 'Performance optimization', 'Code quality analysis'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'deployment',
    name: 'DevOps Specialist',
    icon: Cloud,
    color: 'agent-deployment',
    description: 'Preparing production-ready deployment',
    tasks: ['Configure deployment', 'Set up environment', 'Prepare production launch'],
    progress: 0,
    status: 'idle',
  },
];

const SAMPLE_PROMPTS = [
  'A task management app with team collaboration and real-time updates',
  'An e-commerce platform for handmade jewelry with inventory management',
  'A social media dashboard for content creators with analytics',
  'A fitness tracker with workout plans and progress visualization',
  'A booking system for restaurants with table management',
  'A cryptocurrency portfolio tracker with real-time price alerts',
  'A recipe sharing platform with meal planning features',
  'A project management tool for creative agencies',
];

const sidebarMenuItems = [
  { id: 'builder', label: 'AI Builder', icon: Sparkles },
  { id: 'projects', label: 'My Projects', icon: FolderOpen },
  { id: 'templates', label: 'Templates', icon: Layers },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const AgentCard = ({ agent, isActive, isCompleted, currentAgent }) => {
  const Icon = agent.icon;

  return (
    <div 
      className={`relative p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer ${
        isActive 
          ? 'border-primary bg-primary/5 shadow-lg scale-105 ring-2 ring-primary/20' 
          : isCompleted 
            ? 'border-success bg-success/5 shadow-md'
            : 'border-border bg-card hover:shadow-md hover:border-border-hover'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`relative p-3 rounded-lg ${agent.color} shadow-sm`}>
          <Icon className="h-5 w-5 text-white" />
          {isActive && (
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-lg opacity-20 animate-pulse"></div>
          )}
          {isCompleted && (
            <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-success bg-background rounded-full shadow-sm" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm">{agent.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 truncate">{agent.description}</p>
          
          {isActive && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  Processing...
                </span>
                <span>{agent.progress}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse rounded-full transition-all duration-300" 
                  style={{ width: `${agent.progress}%` }} 
                />
              </div>
            </div>
          )}
          
          {isCompleted && (
            <div className="mt-2 flex items-center gap-1 text-xs text-success">
              <CheckCircle className="h-3 w-3" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlatformSidebar = ({ collapsed, onToggle, activeTab, onTabChange }) => {
  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}>
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sidebar-foreground">AppGenius</h1>
                <p className="text-xs text-sidebar-foreground/60">Elite AI Builder</p>
              </div>
            </div>
          )}
          <Button
            onClick={onToggle}
            variant="ghost"
            size="icon-sm"
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {sidebarMenuItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                activeTab === item.id
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
              <div className="flex items-center gap-1">
                <Crown className="h-3 w-3 text-warning" />
                <p className="text-xs text-sidebar-foreground/60">Pro Plan</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlatformHeader = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI App Builder</h2>
          <p className="text-sm text-muted-foreground">Create professional apps with AI-powered multi-agent collaboration</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            Documentation
          </Button>
          <Button variant="premium">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </header>
  );
};

const ProjectPreview = ({ code, isGenerating, showPreview, previewMode, prompt }) => {
  const getPreviewContent = () => {
    if (showPreview && code) {
      return (
        <div className="p-4">
          <div className="border-b border-border pb-4 mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {prompt.includes('task') ? 'Task Manager Pro' : 'Generated App'}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="premium" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-ring"
                placeholder="Search..."
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-card-foreground">Design new homepage</h3>
                    <span className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded-full">high</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">Create modern, responsive design</p>
                  <div className="text-xs text-muted-foreground">Assigned to: John Doe • Due: 2025-01-15</div>
                </div>
                <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">in-progress</span>
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-card-foreground">Setup analytics tracking</h3>
                    <span className="px-2 py-1 text-xs bg-warning/10 text-warning rounded-full">medium</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">Implement Google Analytics and custom events</p>
                  <div className="text-xs text-muted-foreground">Assigned to: Jane Smith • Due: 2025-01-20</div>
                </div>
                <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">pending</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-2">You have 2 tasks total</p>
            <Button variant="link" className="text-primary hover:text-primary-hover">
              View all tasks →
            </Button>
          </div>
        </div>
      );
    }

    if (isGenerating) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground mb-2">AI Agents are building your app...</p>
            <p className="text-muted-foreground text-sm">This usually takes 10-15 seconds</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-foreground">Live preview will appear here</p>
          <p className="text-muted-foreground text-sm">Start by describing your app idea above</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-muted rounded-xl p-4 ${
      previewMode === 'mobile' ? 'max-w-sm mx-auto' :
      previewMode === 'tablet' ? 'max-w-2xl mx-auto' : ''
    }`}>
      <div className="bg-background rounded-lg min-h-[500px] border-2 border-border overflow-hidden">
        {getPreviewContent()}
      </div>
    </div>
  );
};

export const EliteAIPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [projectPrompt, setProjectPrompt] = useState('');
  const [agents, setAgents] = useState<Agent[]>(AI_AGENTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Enhanced generation simulation
  const startGeneration = async () => {
    if (!projectPrompt.trim()) return;
    
    setIsGenerating(true);
    setShowPreview(false);
    setGeneratedCode('');
    
    // Reset all agents
    setAgents(prev => prev.map(agent => ({ ...agent, status: 'idle', progress: 0 })));
    
    // Start agent orchestration
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      setCurrentAgent(agent.id);
      
      // Mark current agent as active
      setAgents(prev => prev.map(a => 
        a.id === agent.id 
          ? { ...a, status: 'active', progress: 0 }
          : a.status === 'completed' 
            ? a 
            : { ...a, status: 'idle', progress: 0 }
      ));
      
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setAgents(prev => prev.map(a => 
          a.id === agent.id ? { ...a, progress } : a
        ));
      }
      
      // Mark as completed
      setAgents(prev => prev.map(a => 
        a.id === agent.id ? { ...a, status: 'completed', progress: 100 } : a
      ));
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setCurrentAgent(null);
    setIsGenerating(false);
    
    // Generate final code
    setGeneratedCode(generateSampleCode(projectPrompt));
    setShowPreview(true);
  };

  const generateSampleCode = (prompt: string): string => {
    return `import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';

const ${prompt.includes('task') ? 'TaskManager' : 'App'} = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: '${prompt.includes('task') ? 'Design new homepage' : 'Sample Item'}',
      description: '${prompt.includes('task') ? 'Create modern, responsive design' : 'Sample description'}',
      status: 'in-progress',
      priority: 'high',
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b border-border">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            ${prompt.includes('task') ? 'Task Manager Pro' : 'Generated App'}
          </h1>
          <Button variant="premium" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </header>
      
      <main className="p-6">
        <div className="mb-6 flex gap-4 justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input 
              className="pl-10 pr-4 py-2 border border-input rounded-lg w-80 bg-background"
              placeholder="Search..."
            />
          </div>
        </div>
        
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ${prompt.includes('task') ? 'TaskManager' : 'App'};`;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Elite Sidebar */}
      <PlatformSidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Premium Header */}
        <PlatformHeader />

        {/* Main Content */}
        <div className="flex-1 flex min-h-0">
          {activeTab === 'builder' && (
            <>
              {/* Agent Orchestration Panel */}
              <div className="w-1/2 border-r border-border flex flex-col">
                <div className="p-6 border-b border-border bg-card-secondary">
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm mb-4">
                    <Zap className="h-4 w-4" />
                    Powered by Multi-Agent AI System
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">AI Agent Orchestration</h3>
                  <p className="text-muted-foreground text-sm">
                    Watch specialized AI agents collaborate to build your application
                  </p>
                </div>
                
                <div className="flex-1 p-6 overflow-auto">
                  {!isGenerating && !showPreview && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Describe your app idea
                        </label>
                        <textarea
                          value={projectPrompt}
                          onChange={(e) => setProjectPrompt(e.target.value)}
                          placeholder="Be specific about features, design, and functionality you want..."
                          className="w-full h-32 px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      
                      <Button
                        onClick={startGeneration}
                        disabled={!projectPrompt.trim()}
                        variant="premium"
                        size="lg"
                        className="w-full"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate with AI Agents
                      </Button>

                      <div className="space-y-3">
                        <p className="text-muted-foreground text-sm">Try these examples:</p>
                        <div className="grid gap-2">
                          {SAMPLE_PROMPTS.slice(0, 4).map((example, idx) => (
                            <Button
                              key={idx}
                              onClick={() => setProjectPrompt(example)}
                              variant="ghost"
                              className="justify-start text-left h-auto p-3 whitespace-normal"
                            >
                              <span className="text-sm">{example}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Agents Grid */}
                  {(isGenerating || showPreview) && (
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        {agents.map((agent) => (
                          <AgentCard
                            key={agent.id}
                            agent={agent}
                            isActive={agent.status === 'active'}
                            isCompleted={agent.status === 'completed'}
                            currentAgent={currentAgent}
                          />
                        ))}
                      </div>
                      
                      {showPreview && (
                        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-medium">Generation Complete!</span>
                          </div>
                          <p className="text-success/80 text-sm mt-1">
                            Your application has been successfully generated by our AI agents.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Live Preview Panel */}
              <div className="w-1/2 flex flex-col">
                <div className="p-6 border-b border-border bg-card-secondary">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Live Preview
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex bg-muted rounded-lg p-1">
                        <Button
                          onClick={() => setPreviewMode('desktop')}
                          variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                          size="icon-sm"
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => setPreviewMode('tablet')}
                          variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                          size="icon-sm"
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => setPreviewMode('mobile')}
                          variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                          size="icon-sm"
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button variant="outline" size="icon-sm">
                        <Code className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <ProjectPreview
                    code={generatedCode}
                    isGenerating={isGenerating}
                    showPreview={showPreview}
                    previewMode={previewMode}
                    prompt={projectPrompt}
                  />
                  
                  {showPreview && (
                    <div className="mt-6 flex gap-3">
                      <Button variant="success" size="lg" className="flex-1">
                        <Rocket className="h-4 w-4 mr-2" />
                        Deploy to Production
                      </Button>
                      <Button variant="outline" size="lg">
                        <FileCode2 className="h-4 w-4 mr-2" />
                        View Code
                      </Button>
                      <Button variant="outline" size="icon-lg">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Other Tab Contents */}
          {activeTab !== 'builder' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Compass className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 capitalize">
                  {activeTab} Section
                </h3>
                <p className="text-muted-foreground mb-6">
                  This premium feature is coming soon! We're building something amazing.
                </p>
                <Button variant="premium">
                  <Bell className="h-4 w-4 mr-2" />
                  Notify When Ready
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
