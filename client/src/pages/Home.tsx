import { Link } from "wouter";
import Layout from "../components/Layout";
import { profile, intro } from "../data/homeData";

export default function Home() {
  return (
    <Layout>
      <section className="flex-1 flex flex-col justify-center px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-5xl">
          <h1
            className="font-display reveal text-[clamp(3.5rem,13vw,10rem)] leading-[0.92]"
          >
            Ricky<br />Halomoan
          </h1>

          <div className="mt-10 md:mt-14 max-w-md space-y-6 reveal" style={{ animationDelay: "150ms" }}>
            <p className="text-lg leading-snug">
              {profile.title}, {profile.location}.
            </p>
            <p className="text-muted-foreground leading-relaxed">{intro}</p>
            <p className="flex gap-7 pt-2">
              <Link href="/resume" className="link py-2">Resume</Link>
              <Link href="/contact" className="link py-2">Contact</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
