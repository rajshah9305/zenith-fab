import React, { useState, useEffect } from 'react';
import {
  Sparkles, Zap, Brain, Database, TestTube, Cloud, Eye, Rocket,
  Menu, X, Home, FolderOpen, Settings, BarChart3, Users, FileCode2,
  Monitor, Smartphone, Tablet, Download, Share2, Code, Bell,
  Plus, Filter, Search, MoreHorizontal, CheckCircle, Activity,
  Compass, Palette, GitBranch, Target, Crown, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Type definitions
type AgentStatus = 'idle' | 'active' | 'completed';
type PreviewMode = 'desktop' | 'tablet' | 'mobile';

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

// AI Agent definitions
const AI_AGENTS: Agent[] = [
  {
    id: 'orchestrator',
    name: 'Project Orchestrator',
    icon: Brain,
    color: 'from-purple-500 to-indigo-500',
    description: 'Analyzing requirements and creating project blueprint',
    tasks: ['Parse user requirements', 'Define project architecture', 'Assign tasks to specialized agents'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'ui-designer',
    name: 'UI/UX Designer',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
    description: 'Crafting beautiful, responsive user interfaces',
    tasks: ['Create component library', 'Design responsive layouts', 'Apply modern styling'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'backend',
    name: 'Backend Architect',
    icon: GitBranch,
    color: 'from-green-500 to-emerald-500',
    description: 'Building robust API endpoints and business logic',
    tasks: ['Design API architecture', 'Implement endpoints', 'Set up middleware'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'database',
    name: 'Database Engineer',
    icon: Database,
    color: 'from-orange-500 to-red-500',
    description: 'Designing optimal data structures and relationships',
    tasks: ['Design database schema', 'Set up relationships', 'Create migrations'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'tester',
    name: 'Quality Assurance',
    icon: TestTube,
    color: 'from-indigo-500 to-purple-500',
    description: 'Ensuring code quality and performance optimization',
    tasks: ['Run automated tests', 'Performance optimization', 'Code quality analysis'],
    progress: 0,
    status: 'idle',
  },
  {
    id: 'deployment',
    name: 'DevOps Specialist',
    icon: Cloud,
    color: 'from-teal-500 to-blue-500',
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
];

const SIDEBAR_ITEMS = [
  { id: 'builder', label: 'AI Builder', icon: Sparkles },
  { id: 'projects', label: 'My Projects', icon: FolderOpen },
  { id: 'templates', label: 'Templates', icon: Star },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Mobile-First Agent Card Component
interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  isCompleted: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive, isCompleted }) => {
  const Icon = agent.icon;

  return (
    <div 
      className={`relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-500 ${
        isActive 
          ? 'border-primary bg-primary/5 shadow-lg scale-102 sm:scale-105 ring-2 ring-primary/20' 
          : isCompleted 
            ? 'border-success bg-success/5 shadow-md'
            : 'border-border bg-card hover:shadow-md hover:border-border-hover'
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`relative p-2 sm:p-3 rounded-lg bg-gradient-to-r ${agent.color} shadow-sm flex-shrink-0`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          {isActive && (
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-primary/20 rounded-lg opacity-75 animate-pulse"></div>
          )}
          {isCompleted && (
            <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 text-success bg-background rounded-full shadow-sm" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-xs sm:text-sm truncate">{agent.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 truncate">{agent.description}</p>
          
          {isActive && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span className="hidden sm:inline">Processing...</span>
                  <span className="sm:hidden">Working...</span>
                </span>
                <span>{agent.progress}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary-hover transition-all duration-300 rounded-full" 
                  style={{ width: `${agent.progress}%` }} 
                />
              </div>
            </div>
          )}
          
          {isCompleted && (
            <div className="mt-2 flex items-center gap-1 text-xs text-success">
              <CheckCircle className="h-3 w-3" />
              <span className="hidden sm:inline">Completed</span>
              <span className="sm:hidden">Done</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Responsive Project Preview Component
interface ProjectPreviewProps {
  code: string;
  isGenerating: boolean;
  showPreview: boolean;
  previewMode: PreviewMode;
  prompt: string;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ 
  code, 
  isGenerating, 
  showPreview, 
  previewMode, 
  prompt 
}) => {
  const getPreviewContainerClass = () => {
    const baseClass = "bg-muted rounded-lg sm:rounded-xl p-2 sm:p-4 mx-auto transition-all duration-300";
    switch (previewMode) {
      case 'mobile': return `${baseClass} max-w-sm`;
      case 'tablet': return `${baseClass} max-w-2xl`;
      default: return `${baseClass} w-full`;
    }
  };

  const getPreviewHeight = () => {
    switch (previewMode) {
      case 'mobile': return 'min-h-[500px] max-h-[600px] sm:min-h-[600px] sm:max-h-[700px]';
      case 'tablet': return 'min-h-[400px] max-h-[500px] sm:min-h-[500px] sm:max-h-[600px]';
      default: return 'min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]';
    }
  };

  return (
    <div className={getPreviewContainerClass()}>
      <div className={`bg-background rounded-lg border-2 border-border overflow-hidden ${getPreviewHeight()}`}>
        {showPreview && code ? (
          <div className="p-3 sm:p-4 h-full overflow-y-auto">
            <div className="border-b border-border pb-3 sm:pb-4 mb-4 sm:mb-6 flex items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                {prompt.includes('task') ? 'Task Manager Pro' : 'Generated App'}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Button variant="ghost" size="icon-sm" className="hidden sm:inline-flex">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="premium" size="sm">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">Add New</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  className="w-full pl-10 pr-4 py-2 text-sm border border-input rounded-lg bg-background focus:ring-2 focus:ring-ring transition-all"
                  placeholder="Search..."
                />
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-card p-3 sm:p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-sm sm:text-base truncate">Sample Generated Item</h3>
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full flex-shrink-0">high</span>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-2 line-clamp-2">This is a sample item generated by AI</p>
                    <div className="text-xs text-muted-foreground">Created by AI Agents • Just now</div>
                  </div>
                  <Button variant="ghost" size="icon-sm" className="flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-card p-3 sm:p-4 rounded-lg border border-border shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-sm sm:text-base truncate">Another AI-Generated Task</h3>
                      <span className="px-2 py-1 text-xs bg-warning/10 text-warning rounded-full flex-shrink-0">medium</span>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-2 line-clamp-2">Advanced functionality created by our AI agents</p>
                    <div className="text-xs text-muted-foreground">Created by AI Agents • 2 min ago</div>
                  </div>
                  <Button variant="ghost" size="icon-sm" className="flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">Generated with AI agents</p>
              <Button variant="link" className="text-primary text-sm">View all items →</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center max-w-xs">
              {isGenerating ? (
                <>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-foreground text-sm sm:text-base mb-2">AI Agents are building your app...</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">This usually takes 10-15 seconds</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                  <p className="text-foreground text-sm sm:text-base mb-1">Live preview will appear here</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">Start by describing your app idea</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Mobile-First Platform Sidebar Component
interface PlatformSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile?: boolean;
}

const PlatformSidebar: React.FC<PlatformSidebarProps> = ({ 
  collapsed, 
  onToggle, 
  activeTab, 
  onTabChange,
  isMobile = false
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isMobile 
          ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${collapsed ? '-translate-x-full' : 'translate-x-0'} w-64`
          : `${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`
        }
        bg-card border-r border-border flex flex-col
      `}>
        <div className="p-3 sm:p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {(!collapsed || isMobile) && (
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 bg-gradient-premium rounded-lg">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-foreground text-sm sm:text-base">AppGenius</h1>
                  <p className="text-xs text-muted-foreground">Elite AI Builder</p>
                </div>
              </div>
            )}
            <Button
              onClick={onToggle}
              variant="ghost"
              size="icon-sm"
            >
              {(collapsed && !isMobile) ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <div className="space-y-1 sm:space-y-2">
            {SIDEBAR_ITEMS.map((item) => (
              <Button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  if (isMobile) onToggle(); // Close mobile sidebar after selection
                }}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start ${collapsed && !isMobile ? 'px-2' : 'px-3'} h-9 sm:h-10`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {(!collapsed || isMobile) && <span className="ml-2 text-sm font-medium">{item.label}</span>}
              </Button>
            ))}
          </div>
        </nav>

        <div className="p-3 sm:p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">JD</span>
            </div>
            {(!collapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Responsive Platform Header Component  
interface PlatformHeaderProps {
  onMobileMenuToggle?: () => void;
  isMobile?: boolean;
}

const PlatformHeader: React.FC<PlatformHeaderProps> = ({ onMobileMenuToggle, isMobile }) => {
  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              onClick={onMobileMenuToggle}
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground truncate">AI App Builder</h2>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              Create professional apps with AI-powered multi-agent collaboration
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Documentation
          </Button>
          <Button variant="premium" size="sm">
            <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

// Main Elite AI Platform Component - Fully Responsive
export const EliteAIPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Start collapsed on mobile
  const [projectPrompt, setProjectPrompt] = useState('');
  const [agents, setAgents] = useState<Agent[]>(AI_AGENTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true); // Auto-collapse on mobile
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        await new Promise(resolve => setTimeout(resolve, 150));
        setAgents(prev => prev.map(a => 
          a.id === agent.id ? { ...a, progress } : a
        ));
      }
      
      // Mark as completed
      setAgents(prev => prev.map(a => 
        a.id === agent.id ? { ...a, status: 'completed', progress: 100 } : a
      ));
      
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setIsGenerating(false);
    setGeneratedCode('// Generated code would appear here');
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Elite Sidebar */}
      <div className={`${isMobile ? '' : (sidebarCollapsed ? 'w-16' : 'w-64')}`}>
        <PlatformSidebar 
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isMobile={isMobile}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Premium Header */}
        <PlatformHeader 
          onMobileMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0">
          {activeTab === 'builder' && (
            <>
              {/* Agent Orchestration Panel */}
              <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border flex flex-col order-2 lg:order-1">
                <div className="p-4 sm:p-6 border-b border-border bg-card-secondary">
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs sm:text-sm mb-4">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Powered by Multi-Agent AI System</span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">AI Agent Orchestration</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Watch specialized AI agents collaborate to build your application
                  </p>
                </div>
                
                <div className="flex-1 p-4 sm:p-6 overflow-auto">
                  {!isGenerating && !showPreview && (
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Describe your app idea
                        </label>
                        <textarea
                          value={projectPrompt}
                          onChange={(e) => setProjectPrompt(e.target.value)}
                          placeholder="Be specific about features, design, and functionality you want..."
                          className="w-full h-24 sm:h-32 px-3 sm:px-4 py-2 sm:py-3 text-sm border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        />
                      </div>
                      
                      <Button
                        onClick={startGeneration}
                        disabled={!projectPrompt.trim()}
                        variant="premium"
                        size={isMobile ? "default" : "lg"}
                        className="w-full"
                      >
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Generate with AI Agents
                      </Button>

                      <div className="space-y-3">
                        <p className="text-muted-foreground text-xs sm:text-sm">Try these examples:</p>
                        <div className="grid gap-2">
                          {SAMPLE_PROMPTS.slice(0, isMobile ? 3 : 4).map((example, idx) => (
                            <Button
                              key={idx}
                              onClick={() => setProjectPrompt(example)}
                              variant="ghost"
                              className="justify-start text-left h-auto p-2 sm:p-3 whitespace-normal"
                            >
                              <span className="text-xs sm:text-sm">{example}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Agents Grid */}
                  {(isGenerating || showPreview) && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid gap-3 sm:gap-4">
                        {agents.map((agent) => (
                          <AgentCard
                            key={agent.id}
                            agent={agent}
                            isActive={agent.status === 'active'}
                            isCompleted={agent.status === 'completed'}
                          />
                        ))}
                      </div>
                      
                      {showPreview && (
                        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-success/10 border border-success/20 rounded-lg">
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">Generation Complete!</span>
                          </div>
                          <p className="text-success/80 text-xs sm:text-sm mt-1">
                            Your application has been successfully generated by our AI agents.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Live Preview Panel */}
              <div className="w-full lg:w-1/2 flex flex-col order-1 lg:order-2">
                <div className="p-4 sm:p-6 border-b border-border bg-card-secondary">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Live Preview</span>
                      <span className="sm:hidden">Preview</span>
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex bg-muted rounded-lg p-1">
                        <Button
                          onClick={() => setPreviewMode('desktop')}
                          variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                          size="icon-sm"
                          className="hidden sm:inline-flex"
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
                      
                      <Button variant="outline" size="icon-sm" className="hidden sm:inline-flex">
                        <Code className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-4 sm:p-6">
                  <ProjectPreview
                    code={generatedCode}
                    isGenerating={isGenerating}
                    showPreview={showPreview}
                    previewMode={previewMode}
                    prompt={projectPrompt}
                  />
                  
                  {showPreview && (
                    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button variant="success" size={isMobile ? "default" : "lg"} className="flex-1">
                        <Rocket className="h-4 w-4 mr-2" />
                        Deploy to Production
                      </Button>
                      <Button variant="outline" size={isMobile ? "default" : "lg"} className="flex-1 sm:flex-initial">
                        <FileCode2 className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">View Code</span>
                        <span className="sm:hidden">Code</span>
                      </Button>
                      <Button variant="outline" size={isMobile ? "icon" : "icon-lg"}>
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
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Compass className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 capitalize">
                  {activeTab} Section
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                  This premium feature is coming soon! We're building something amazing.
                </p>
                <Button variant="premium" size={isMobile ? "default" : "lg"}>
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
