import { FileText, Download } from "lucide-react";
import { getApplications } from "@/lib/storage";

export default function AdminApplicationsPage() {
  const applications = getApplications();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            Applications &amp; Resumes <FileText className="text-amber-400" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review candidate details, AI Screening fit ratings, and download resumes.
          </p>
        </div>
        <a
          href="/api/admin/export?type=applications"
          className="flex items-center gap-1.5 bg-[#FFC21A] hover:bg-amber-400 text-[#0B1F4B] px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-amber-500/20"
        >
          <Download size={14} /> Download Excel (.csv)
        </a>
      </div>

      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Total Candidates: {applications.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm text-slate-300">
            <thead className="bg-slate-900 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Role Applied</th>
                <th className="py-3 px-4">AI Screening Evaluation</th>
                <th className="py-3 px-4">Resume</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No applications received yet. As candidates submit their resumes in the Careers section, they will appear here in real time.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">
                      <div>{app.applicantName}</div>
                      <div className="text-slate-500 text-xs">{app.email} &bull; {app.phone || "No phone"}</div>
                    </td>
                    <td className="py-3 px-4 text-[#1E6FFF] font-semibold">{app.jobTitle}</td>
                    <td className="py-3 px-4 max-w-sm">
                      {app.hrNotes ? (
                        <div className="text-xs text-slate-300 whitespace-pre-line bg-slate-900 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                          {app.hrNotes}
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">Pending Review</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#FFC21A] hover:underline font-semibold"
                        >
                          <Download size={14} /> Download Resume
                        </a>
                      ) : (
                        <span className="text-slate-500 text-xs">No attachment</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {app.status}
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
