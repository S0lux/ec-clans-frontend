import { ResponsiveContainer } from "@/src/shared/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/components/shadcn/card";
import ServerList from "./servers-list";

export default function ManageServersPage() {
  return (
    <ResponsiveContainer>
      <Card className="mt-5 border-none bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-foreground">Servers</CardTitle>
          <CardDescription className="text-foreground/50">
            Select a server to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServerList />
        </CardContent>
      </Card>
    </ResponsiveContainer>
  );
}
