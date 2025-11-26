import { TrendingUp, Users, Clock, BarChart3, MessageCircle, Workflow, Zap, Shield, Globe, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export const STATS = [
  { label: "Pipeline Velocity", value: "3.4x faster", icon: TrendingUp },
  { label: "Customer Retention", value: "92%", icon: Users },
  { label: "Support Resolution", value: "14 hrs", icon: Clock },
] as const;

export const FEATURES = [
  {
    icon: BarChart3,
    title: "Unified Growth Dashboard",
    description:
      "See revenue, pipeline, customer health, and support pulse in a single real-time control center. Track KPIs, forecast revenue, and identify opportunities at a glance.",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Workflow,
    title: "Automated Playbooks",
    description:
      "Trigger next-best actions with AI-assisted follow-ups, smart routing, and ready-to-launch workflows. Automate repetitive tasks and focus on what matters.",
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-400",
  },
  {
    icon: MessageCircle,
    title: "Human Moments at Scale",
    description:
      "Capture every conversation, feedback loop, and multi-channel touchpoint in one timeline. Never lose context and always know where you stand.",
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description:
      "Built for speed with real-time sync across all devices. Experience instant updates and seamless collaboration with your team.",
    color: "from-yellow-500/20 to-yellow-600/10",
    iconColor: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption, SOC2 compliance, and granular access controls. Your data is protected with industry-leading security standards.",
    color: "from-red-500/20 to-red-600/10",
    iconColor: "text-red-400",
  },
  {
    icon: Globe,
    title: "Global Integration",
    description:
      "Connect with 100+ tools including Slack, Salesforce, HubSpot, and more. Seamlessly integrate with your existing tech stack.",
    color: "from-cyan-500/20 to-cyan-600/10",
    iconColor: "text-cyan-400",
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    title: "Convert",
    description:
      "Capture inbound leads, score them instantly, and personalize introductions across channels. Turn prospects into customers with intelligent automation.",
    icon: Sparkles,
  },
  {
    title: "Collaborate",
    description:
      "Hand-off seamlessly between sales, success, and support with shared visibility into context and intent. Keep everyone aligned and informed.",
    icon: CheckCircle2,
  },
  {
    title: "Care",
    description:
      "Reduce churn with proactive playbooks, health alerts, and AI-powered service desk routing. Deliver exceptional experiences at every touchpoint.",
    icon: ShieldCheck,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Relatia gave us back visibility. Our team closes loops faster, responds smarter, and actually sees how relationships grow over time. It's transformed how we work.",
    author: "Amelia Carter",
    role: "VP of Customer Experience",
    company: "StratusIQ",
    rating: 5,
    image: "AC",
  },
  {
    quote:
      "We replaced three disconnected tools with Relatia. Pipelines feel lighter, customers feel heard, and forecasting is no longer guesswork. Best decision we made.",
    author: "Marcus Lee",
    role: "Revenue Operations Lead",
    company: "Northwind Labs",
    rating: 5,
    image: "ML",
  },
  {
    quote:
      "The automation features are incredible. We've cut our admin time in half and our customer satisfaction scores have never been higher. Relatia is a game-changer.",
    author: "Sarah Johnson",
    role: "Head of Sales",
    company: "TechFlow Solutions",
    rating: 5,
    image: "SJ",
  },
  {
    quote:
      "The unified dashboard is exactly what we needed. Everything in one place, real-time updates, and the insights are incredibly valuable. Our team productivity has increased significantly.",
    author: "David Chen",
    role: "Chief Revenue Officer",
    company: "CloudScale Inc",
    rating: 5,
    image: "DC",
  },
  {
    quote:
      "Relatia's integration capabilities are outstanding. We connected all our tools seamlessly and the automation has saved us countless hours. Highly recommend!",
    author: "Emily Rodriguez",
    role: "Director of Customer Success",
    company: "DataFlow Systems",
    rating: 5,
    image: "ER",
  },
  {
    quote:
      "The customer health scoring and proactive alerts have been game-changing. We catch issues before they become problems. Our retention rate improved dramatically.",
    author: "James Wilson",
    role: "VP of Sales",
    company: "TechVenture Group",
    rating: 5,
    image: "JW",
  },
] as const;

export const NAV_LINKS = [
  { name: 'Features', href: '#features' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Testimonials', href: '#testimonials' },
] as const;

export const FOOTER_LINKS = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Testimonials', href: '#testimonials' },
  ],
  company: [
    { name: 'About', href: '/dashboard' },
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
  ],
} as const;

