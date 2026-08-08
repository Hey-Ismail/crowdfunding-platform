import "./globals.css";

export const metadata = {
  title: "FundPulse | Empowering Future Innovations Through Crowdfunding",
  description: "FundPulse connects visionary creators with global backers. Discover innovative campaigns, back with 100% escrow protection, and turn ambitious ideas into reality.",
  keywords: ["crowdfunding", "startup funding", "tech innovation", "backers", "escrow crowdfunding"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
        {children}
      </body>
    </html>
  );
}
