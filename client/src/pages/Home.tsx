import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile, bio, headline } from "../data/homeData";

export default function Home() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 md:py-20 px-6 md:pl-28 lg:pl-40 md:pr-12">

        <p className="font-mono text-mint text-sm mb-4 tracking-wide">
          Hi there, I'm
        </p>

        <h1
          className="font-black leading-[1.02] tracking-[-0.02em] mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--white)" }}
        >
          {profile.name}.
        </h1>

        <p
          className="text-base leading-[1.7] mb-12 max-w-[480px]"
          style={{ color: "var(--slate)" }}
        >
          {bio[0]}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/resume">
            <button className="border border-mint text-mint font-mono text-[0.85rem] px-7 py-5 rounded hover:bg-mint/10 transition-colors duration-200 active:scale-[0.97]">
              View Resume
            </button>
          </Link>
          <Link href="/contact">
            <button className="border border-mint text-mint font-mono text-[0.85rem] px-7 py-5 rounded hover:bg-mint/10 transition-colors duration-200 active:scale-[0.97]">
              Get In Touch
            </button>
          </Link>
        </div>

      </section>
    </Layout>
  );
}
