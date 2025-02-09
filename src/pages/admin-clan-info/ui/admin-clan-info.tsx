import { ResponsiveContainer } from "@/src/shared/ui";

export default async function AdminClanInfoPage({
  params,
}: {
  params: Promise<{ clanId: string }>;
}) {
  const { clanId } = await params;
  return <ResponsiveContainer>{clanId}</ResponsiveContainer>;
}
