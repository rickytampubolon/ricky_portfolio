import { Link } from "wouter";
import Layout from "../components/Layout";

export default function NotFound() {
  return (
    <Layout title="Page not found">
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 pb-24">
        <h1 className="font-display text-[clamp(3.5rem,13vw,9rem)] leading-[0.95]">404</h1>
        <p className="mt-6 text-muted-foreground max-w-sm">
          This page doesn't exist or has moved.
        </p>
        <p className="mt-6">
          <Link href="/" className="link py-2">Back to home</Link>
        </p>
      </div>
    </Layout>
  );
}
