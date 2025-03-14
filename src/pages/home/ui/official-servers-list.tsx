"use client";

import { useQuery } from "@tanstack/react-query";
import { ServerCard } from "./server-card";
import { ClansQueries } from "@/src/entities/clan/clan.queries";

export const OfficialServersList = () => {
  const clansQuery = useQuery(ClansQueries.getClansQuery(0, 15, "official"));

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
        {clansQuery.data && (
          <>
            {clansQuery.data.results
              .filter((clan) => clan.status == "OFFICIAL")
              .map((clan, index) => (
                <ServerCard
                  key={clan.serverId}
                  serverName={clan.serverName}
                  serverLogo={clan.serverIcon}
                  serverBanner={clan.serverBanner}
                  serverInvite={clan.serverInvite}
                  memberTotal={clan.serverTotalMembers}
                  memberOnline={clan.serverOnlineMembers}
                  shortDescription={clan.shortDescription}
                  rank={index + 1}
                  points={clan.points}
                />
              ))}
          </>
        )}
      </div>
    </section>
  );
};
