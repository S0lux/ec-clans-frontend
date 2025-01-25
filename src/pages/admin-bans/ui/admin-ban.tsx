import { AddBanForm } from "@/src/features/bans/add-ban/add-ban.ui";
import { ResponsiveContainer } from "@/src/shared/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/shared/ui/components/shadcn/card";
import { BansTable } from "./bans-table";

export function AdminBansPage() {
  return (
    <ResponsiveContainer>
      <Card className="mt-5 border-none bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-foreground">Add a ban</CardTitle>
          <CardDescription className="text-foreground/50">
            Input a discord ID to ban someone from all official clan servers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddBanForm />
        </CardContent>
      </Card>

      <Card className="mt-5 border-none bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-foreground">Bans list</CardTitle>
          <CardDescription className="text-foreground/50">
            You can view all bans here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BansTable />
        </CardContent>
      </Card>
    </ResponsiveContainer>
  );
}
