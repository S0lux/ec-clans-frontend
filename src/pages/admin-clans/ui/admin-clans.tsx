"use client";

import { SetupOfficialClanForm } from "@/src/features/clans/setup-official-clan/setup-official-clan.ui";
import { ResponsiveContainer } from "@/src/shared/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/shared/ui/components/shadcn/card";
import { AdminOfficialClanList } from "./admin-official-clans-list";

export const AdminClansPage = () => {
  return (
    <ResponsiveContainer>
      <Card className="mt-5 border-none bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-foreground">
            Setup an official clan
          </CardTitle>
          <CardDescription className="text-foreground/50">
            Fill in the required info to add a new official clan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SetupOfficialClanForm />
        </CardContent>
      </Card>

      <Card className="mt-5 border-none bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-foreground">Official clans</CardTitle>
          <CardDescription className="text-foreground/50">
            A list of all official clans.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminOfficialClanList />
        </CardContent>
      </Card>
    </ResponsiveContainer>
  );
};
