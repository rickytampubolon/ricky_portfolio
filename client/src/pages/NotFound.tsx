import { Link } from "wouter";
import Layout from "../components/Layout";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <AlertCircle size={56} className="text-mint/50" strokeWidth={1.5} />
          </div>
          <h1 className="font-black text-5xl tracking-[-0.03em] text-foreground mb-3">404</h1>
          <h2 className="text-xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-[0.9rem] text-muted-foreground mb-8 leading-relaxed">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <button className="inline-flex items-center gap-2 border border-mint text-mint text-[0.88rem] px-8 py-3 rounded-full hover:bg-mint/10 transition-colors duration-200 active:scale-[0.97]">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
