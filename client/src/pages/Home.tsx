import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile, bio, headline } from "../data/homeData";

export default function Home() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 md:px-24 lg:px-32 py-20 max-w-5xl mx-auto">

        <p
          className="font-mono text-mint text-sm mb-5"
          style={{ animationDelay: "0ms" }}
        >
          Hi, my name is
        </p>

        <h1
          className="font-black leading-[1.05] tracking-[-0.02em] mb-3"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "var(--white)" }}
        >
          {profile.name}.
        </h1>

        <h2
          className="font-black leading-[1.1] tracking-[-0.02em] mb-8"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)", color: "var(--lightest-slate)" }}
        >
          {headline}
        </h2>

        <p className="text-[0.95rem] leading-relaxed max-w-lg mb-10" style={{ color: "var(--slate)" }}>
          {bio[0]}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/resume">
            <button className="border border-mint text-mint font-mono text-sm px-8 py-4 rounded hover:bg-mint/10 transition-colors duration-200 active:scale-[0.97]">
              View Resume
            </button>
          </Link>
          <Link href="/contact">
            <button className="border border-mint text-mint font-mono text-sm px-8 py-4 rounded hover:bg-mint/10 transition-colors duration-200 active:scale-[0.97]">
              Get In Touch
            </button>
          </Link>
        </div>

      </section>
    </Layout>
  );
}
