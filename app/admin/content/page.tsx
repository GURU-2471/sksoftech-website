"use client";

import { useEffect, useState } from "react";
import {
  Sliders,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Phone,
  BarChart,
  Briefcase,
  Monitor,
  Palette,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import type { SiteContent, ServiceItem, ProjectItem } from "@/lib/siteContentStore";
import { THEME_PRESETS, ADMIN_THEME_PRESETS } from "@/lib/themePresets";
import { applyThemeVariables } from "@/components/ClientThemeSync";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<"theme" | "hero" | "stats" | "services" | "projects" | "contact">("theme");
  const [saving, setSaving] = useState(false);

  const handleSelectVisitorTheme = async (presetId: string, presetName: string) => {
    if (!content) return;
    const updatedContent = {
      ...content,
      theme: {
        ...content.theme,
        activePaletteId: presetId,
      },
    };
    setContent(updatedContent);
    localStorage.setItem("sk_active_theme", presetId);
    applyThemeVariables(presetId);
    toast.success(`Theme switched to "${presetName}" & applied live!`);

    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent),
      });
    } catch {}
  };

  // New service state
  const [newService, setNewService] = useState({
    title: "",
    desc: "",
    color: "#1E6FFF",
    iconName: "Monitor",
  });

  // New project state
  const [newProject, setNewProject] = useState({
    title: "",
    client: "",
    category: "Web",
    desc: "",
    color: "#1E6FFF",
  });

  const loadContent = async () => {
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.content) {
        setContent(data.content);
      }
    } catch {
      toast.error("Failed to load site content");
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Site content saved! Changes are now live on the citizen website.");
      } else {
        toast.error("Failed to save changes.");
      }
    } catch {
      toast.error("Error connecting to server.");
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return (
      <div className="py-20 text-center text-slate-400">
        <Sparkles size={24} className="animate-spin text-[#1E6FFF] mx-auto mb-2" />
        Loading Site Content Studio...
      </div>
    );
  }

  // --- Service Handlers ---
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title.trim() || !newService.desc.trim()) return;
    const item: ServiceItem = {
      id: Date.now(),
      title: newService.title,
      desc: newService.desc,
      color: newService.color,
      iconName: newService.iconName,
      isActive: true,
    };
    setContent({ ...content, services: [item, ...content.services] });
    setNewService({ title: "", desc: "", color: "#1E6FFF", iconName: "Monitor" });
    toast.success("Service added to list. Click 'Save All Changes' to publish!");
  };

  const handleToggleService = (id: number) => {
    const updated = content.services.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s));
    setContent({ ...content, services: updated });
  };

  const handleDeleteService = (id: number) => {
    const updated = content.services.filter((s) => s.id !== id);
    setContent({ ...content, services: updated });
  };

  // --- Project Handlers ---
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const item: ProjectItem = {
      id: Date.now(),
      title: newProject.title,
      client: newProject.client || "Client",
      category: newProject.category,
      desc: newProject.desc,
      color: newProject.color,
      isActive: true,
    };
    setContent({ ...content, projects: [item, ...content.projects] });
    setNewProject({ title: "", client: "", category: "Web", desc: "", color: "#1E6FFF" });
    toast.success("Project added to list. Click 'Save All Changes' to publish!");
  };

  const handleToggleProject = (id: number) => {
    const updated = content.projects.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
    setContent({ ...content, projects: updated });
  };

  const handleDeleteProject = (id: number) => {
    const updated = content.projects.filter((p) => p.id !== id);
    setContent({ ...content, projects: updated });
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            Visual Site Content Studio <Layers className="text-[#1E6FFF]" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Edit headlines, numbers, services &amp; projects. Any change saved here reflects on the citizen website immediately.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-yellow text-xs px-5 py-2.5 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
        >
          <Save size={15} />
          {saving ? "Publishing Live..." : "Save All Changes (Live)"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { key: "theme", label: "Website Theme Palette", icon: Palette },
          { key: "hero", label: "Hero Banner", icon: Monitor },
          { key: "stats", label: "Counters & Stats", icon: BarChart },
          { key: "services", label: "Services (11+)", icon: Layers },
          { key: "projects", label: "Portfolio Projects", icon: Briefcase },
          { key: "contact", label: "Contact Info & Phone", icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-[#1E6FFF] text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 0: THEME PALETTE */}
      {activeTab === "theme" && (
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Palette className="text-[#FFC21A]" size={18} /> Visitor Website Theme Palette
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select a visual mood for your public website. Accents, glow glows, neon borders, and buttons dynamically transform instantly.
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              Active: <span className="text-amber-400 font-bold">{content.theme?.activePaletteId || "classic"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEME_PRESETS.map((preset) => {
              const isSelected = (content.theme?.activePaletteId || "classic") === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleSelectVisitorTheme(preset.id, preset.name)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? "border-blue-500 bg-slate-900/90 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/50"
                      : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
                >
                  {/* Top Color preview bar */}
                  <div
                    className="h-2.5 rounded-full mb-4 w-full shadow-inner"
                    style={{ background: preset.gradient }}
                  />

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                        {preset.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {preset.subtitle}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                        <Check size={14} />
                      </span>
                    )}
                  </div>

                  {/* Swatches */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Colors:</span>
                    <span
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: preset.primary }}
                      title={`Primary: ${preset.primary}`}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: preset.accent }}
                      title={`Accent: ${preset.accent}`}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: preset.navy }}
                      title={`Navy: ${preset.navy}`}
                    />

                    <span className="ml-auto text-[11px] font-medium text-slate-400 group-hover:text-white">
                      {isSelected ? "Active" : "Click to select"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECTION 2: ADMIN DASHBOARD THEME */}
          <div className="pt-6 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="text-[#1E6FFF]" size={16} /> Admin Dashboard Color Scheme
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Customize the appearance of this Admin portal for different mood settings (Obsidian, Royal Navy, or Emerald).
                </p>
              </div>
              <div className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                Admin Mood: <span className="text-blue-400 font-bold">{content.theme?.adminPaletteId || "obsidian"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ADMIN_THEME_PRESETS.map((adminPreset) => {
                const isSelected = (content.theme?.adminPaletteId || "obsidian") === adminPreset.id;
                return (
                  <div
                    key={adminPreset.id}
                    onClick={() => {
                      setContent({
                        ...content,
                        theme: {
                          ...content.theme,
                          activePaletteId: content.theme?.activePaletteId || "classic",
                          adminPaletteId: adminPreset.id,
                        },
                      });
                      toast.success(`Admin theme set to "${adminPreset.name}"!`);
                    }}
                    className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 ${
                      isSelected
                        ? "border-amber-400 bg-slate-900/90 shadow-lg ring-1 ring-amber-400/50"
                        : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{adminPreset.name}</span>
                      {isSelected && <Check size={14} className="text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mb-3">
                      {adminPreset.subtitle}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: adminPreset.bg }}
                        title="Background"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: adminPreset.cardBg }}
                        title="Card Surface"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: adminPreset.accent }}
                        title="Accent Color"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span>Tip: Switch themes anytime to test festive offers, modern rebrands, or high-tech client presentations.</span>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-yellow text-xs px-4 py-2 font-bold flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <Save size={13} />
              {saving ? "Saving..." : "Apply Palette Live"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: HERO */}
      {activeTab === "hero" && (
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Hero Section Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Badge Text (Top pill)</label>
              <input
                value={content.hero.badge}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Floating Badge Number &amp; Label</label>
              <div className="flex gap-2">
                <input
                  value={content.hero.statNumber}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, statNumber: e.target.value } })}
                  placeholder="150+"
                  className="w-1/3 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                />
                <input
                  value={content.hero.statLabel}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, statLabel: e.target.value } })}
                  placeholder="Projects Delivered"
                  className="w-2/3 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Headline Line 1 (White)</label>
              <input
                value={content.hero.headline1}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline1: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Headline Line 2 (Yellow)</label>
              <input
                value={content.hero.headline2}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline2: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-[#FFC21A] font-bold focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Headline Line 3 (White)</label>
              <input
                value={content.hero.headline3}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline3: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Hero Sub-Description</label>
            <textarea
              rows={3}
              value={content.hero.description}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#1E6FFF] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Primary CTA Button</label>
              <input
                value={content.hero.ctaPrimaryText}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaPrimaryText: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Secondary CTA Button</label>
              <input
                value={content.hero.ctaSecondaryText}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaSecondaryText: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATS */}
      {activeTab === "stats" && (
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Animated Counters (About Section)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Projects Completed (+)</label>
              <input
                type="number"
                value={content.stats.projectsCompleted}
                onChange={(e) =>
                  setContent({ ...content, stats: { ...content.stats, projectsCompleted: Number(e.target.value) } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Happy Clients (+)</label>
              <input
                type="number"
                value={content.stats.happyClients}
                onChange={(e) =>
                  setContent({ ...content, stats: { ...content.stats, happyClients: Number(e.target.value) } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Years Experience (+)</label>
              <input
                type="number"
                value={content.stats.yearsExperience}
                onChange={(e) =>
                  setContent({ ...content, stats: { ...content.stats, yearsExperience: Number(e.target.value) } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Services Offered (+)</label>
              <input
                type="number"
                value={content.stats.servicesOffered}
                onChange={(e) =>
                  setContent({ ...content, stats: { ...content.stats, servicesOffered: Number(e.target.value) } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES */}
      {activeTab === "services" && (
        <div className="space-y-6">
          {/* Add Service Box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Plus size={16} className="text-[#FFC21A]" /> Add New Service Offering
            </h3>
            <form onSubmit={handleAddService} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Service Title *</label>
                <input
                  required
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="e.g. AI Workflow Automation"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Description *</label>
                <input
                  required
                  value={newService.desc}
                  onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                  placeholder="Brief description for visitors..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                />
              </div>
              <button type="submit" className="btn-yellow text-xs py-2 justify-center">
                Add Service to List
              </button>
            </form>
          </div>

          {/* Existing Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.services.map((service) => (
              <div
                key={service.id}
                className={`p-4 rounded-2xl border transition-all ${
                  service.isActive
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-950/30 border-slate-900 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: service.color }}
                  >
                    {service.isActive ? "LIVE" : "HIDDEN"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleService(service.id)}
                      className="p-1 text-slate-400 hover:text-white"
                      title={service.isActive ? "Hide from visitors" : "Show to visitors"}
                    >
                      {service.isActive ? <Eye size={16} className="text-emerald-400" /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-1 text-slate-400 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{service.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PROJECTS */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          {/* Add Project Form */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Plus size={16} className="text-[#FFC21A]" /> Add Portfolio Case Study
            </h3>
            <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Project Name *</label>
                <input
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. Healthcare Appointment Portal"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Client Name</label>
                <input
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  placeholder="e.g. MedCare Clinic"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Category</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                >
                  <option value="Web">Web</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <button type="submit" className="btn-yellow text-xs py-2 justify-center">
                Add Project to List
              </button>
            </form>
          </div>

          {/* Existing Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.projects.map((project) => (
              <div
                key={project.id}
                className={`p-4 rounded-2xl border transition-all ${
                  project.isActive
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-950/30 border-slate-900 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1E6FFF]/20 text-[#1E6FFF]">
                    {project.category} &bull; {project.client}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleProject(project.id)}
                      className="p-1 text-slate-400 hover:text-white"
                      title={project.isActive ? "Hide project" : "Show project"}
                    >
                      {project.isActive ? <Eye size={16} className="text-emerald-400" /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1 text-slate-400 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{project.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CONTACT */}
      {activeTab === "contact" && (
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Company Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Direct Phone Number</label>
              <input
                value={content.contact.phone}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Company Email</label>
              <input
                value={content.contact.email}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">Physical Location Address</label>
              <input
                value={content.contact.location}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, location: e.target.value } })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">WhatsApp Target Number (With country code)</label>
              <input
                value={content.contact.whatsappNumber}
                onChange={(e) =>
                  setContent({ ...content, contact: { ...content.contact, whatsappNumber: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
