import { MessageSquare, Download } from "lucide-react";
import { getInquiries } from "@/lib/storage";

export default function AdminInquiriesPage() {
  const inquiries = getInquiries();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            Inquiries &amp; Leads <MessageSquare className="text-[#1E6FFF]" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review live visitor contact requests, quote submissions, and AI Assistant hot leads.
          </p>
        </div>
        <a
          href="/api/admin/export?type=inquiries"
          className="flex items-center gap-1.5 bg-[#1E6FFF] hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-blue-500/20"
        >
          <Download size={14} /> Download Excel (.csv)
        </a>
      </div>

      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Total Inquiries: {inquiries.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm text-slate-300">
            <thead className="bg-slate-900 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Service Interest</th>
                <th className="py-3 px-4">Message / Context</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No inquiries received yet. Visitors submitting via the Contact form or AI Chatbot appear here instantly.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{inq.name}</td>
                    <td className="py-3 px-4">
                      <div className="text-white">{inq.email}</div>
                      <div className="text-slate-500 text-xs">{inq.phone || "No phone"}</div>
                    </td>
                    <td className="py-3 px-4 text-[#FFC21A] font-medium">{inq.serviceInterest || "General"}</td>
                    <td className="py-3 px-4 text-slate-300 max-w-sm">{inq.message}</td>
                    <td className="py-3 px-4 text-slate-500 text-xs">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
