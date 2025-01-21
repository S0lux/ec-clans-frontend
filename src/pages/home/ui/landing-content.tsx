import { LandingButtons } from "./landing-buttons";
import Image from "next/image";

export const LandingContent = () => {
  return (
    <section className="flex flex-1 flex-col lg:flex-row">
      {/* Landing text */}
      <article className="w-full flex-1">
        <h1 className="text-5xl font-bold">
          A Discord Bot for managing EC clans
        </h1>
        <p className="mb-5 text-lg text-foreground/50">
          Clans is a Discord bot that helps you manage your Empire Clash clan
          with ease. This bot is required to be in all official Empire Clash
          clan servers.
        </p>
        <p className="mb-5 text-lg text-foreground/50">
          Unofficial servers can also use this bot to check their official clan
          qualification status.
        </p>

        {/* Buttons */}
        <LandingButtons />
      </article>

      {/* Landing image */}
      <aside className="relative hidden h-[600px] w-full flex-1 lg:block">
        <Image
          src={"/landing_banner.png"}
          alt="Clans website landing page banner image"
          className="object-cover object-right"
          fill={true}
        />
      </aside>
    </section>
  );
};
