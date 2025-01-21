import { ServerCard } from "./server-card";

export const OfficialServersList = () => {
  return (
    <section className="pt-10 lg:pt-0">
      <h2 className="pb-5 text-3xl font-bold">Official Servers</h2>
      <p className="text-lg text-foreground/50">
        These are the official Empire Clash servers that have Clans bot
        installed.
      </p>
      <p className="text-lg text-foreground/50">
        If you have already added the bot to your server, and it is not listed
        here, please contact a clan staff member.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ServerCard
          serverName="77th Redcliff Republic"
          serverLogo="https://placehold.co/400/png"
          serverBanner="https://placehold.co/1200x400/png"
          serverInvite="https://discord.gg/placeholder"
          memberTotal={420}
          memberOnline={58}
          shortDescription="A clan dedicated for the ingame faction Redcliff Republic."
        />
        <ServerCard
          serverName="Placeholder"
          serverLogo="https://placehold.co/400/png"
          serverBanner="https://placehold.co/1200x400/png"
          serverInvite="https://discord.gg/placeholder"
          memberTotal={420}
          memberOnline={58}
          shortDescription="Placeholder"
        />
        <ServerCard
          serverName="Placeholder"
          serverLogo="https://placehold.co/400/png"
          serverBanner="https://placehold.co/1200x400/png"
          serverInvite="https://discord.gg/placeholder"
          memberTotal={420}
          memberOnline={58}
          shortDescription="Placeholder"
        />
        <ServerCard
          serverName="Placeholder"
          serverLogo="https://placehold.co/400/png"
          serverBanner="https://placehold.co/1200x400/png"
          serverInvite="https://discord.gg/placeholder"
          memberTotal={420}
          memberOnline={58}
          shortDescription="Placeholder"
        />
        <ServerCard
          serverName="Placeholder"
          serverLogo="https://placehold.co/400/png"
          serverBanner="https://placehold.co/1200x400/png"
          serverInvite="https://discord.gg/placeholder"
          memberTotal={420}
          memberOnline={58}
          shortDescription="Placeholder"
        />
        <ServerCard
          serverName="Placeholder"
          serverLogo="https://placehold.co/400/png"
          serverBanner="https://placehold.co/1200x400/png"
          serverInvite="https://discord.gg/placeholder"
          memberTotal={420}
          memberOnline={58}
          shortDescription="Placeholder"
        />
      </div>
    </section>
  );
};
