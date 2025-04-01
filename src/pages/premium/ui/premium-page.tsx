import { Crown, Shield, Zap, Star, Trophy, Clock } from "lucide-react";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import { Badge } from "@/src/shared/ui/components/shadcn/badge";

export default function PremiumClanPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <div className="flex w-full flex-1 flex-col items-center justify-center space-y-6">
            <Badge className="rounded-full bg-amber-500/20 px-3 py-1 text-sm text-amber-500 hover:bg-amber-500/20">
              NEW! APRIL 1ST EXCLUSIVE
            </Badge>

            <span className="text-5xl font-extrabold">
              Introducing <span className="text-amber-500">PREMIUM</span> Clans
            </span>

            <p className="text-lg text-zinc-400">
              Dominate your competition with exclusive advantages that give your
              clan the ultimate edge. Why play fair when you can play{" "}
              <span className="font-semibold text-amber-500">premium</span>?
            </p>

            <div className="flex flex-col items-center justify-center pt-5">
              <Button className="h-auto bg-amber-500 px-8 py-4 text-lg text-black hover:bg-amber-600">
                Upgrade Now for $9.99/month
              </Button>
              <p className="mt-2 text-xs text-zinc-500">
                *All payments are non-refundable. Premium status cannot be
                transferred.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            A Premium Experience, Just For You
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-amber-500/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Shield className="text-amber-500" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Strike Immunity</h3>
              <p className="text-zinc-400">
                Your clan members can never receive strikes, no matter what
                rules they break!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-amber-500/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Zap className="text-amber-500" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">2x XP Multiplier</h3>
              <p className="text-zinc-400">
                All clan members receive double XP for every action. Level up
                twice as fast!
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-amber-500/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Crown className="text-amber-500" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Priority Auto-balance</h3>
              <p className="text-zinc-400">
                Always get put into factions that are already winning!
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-amber-500/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Star className="text-amber-500" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Exclusive Clan Badge</h3>
              <p className="text-zinc-400">
                Show off your premium status with a special golden badge that
                makes everyone jealous.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-amber-500/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Trophy className="text-amber-500" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">Auto-Win Button</h3>
              <p className="text-zinc-400">
                Struggling in a clan war? Just press the button and claim an
                instant victory! (10min cooldown)
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-amber-500/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Clock className="text-amber-500" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">
                Shortened Domination Timer
              </h3>
              <p className="text-zinc-400">
                Upon claiming enough territory, your opponents now only have 30
                seconds to fight back!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What Premium Clan Leaders Are Saying
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 font-bold text-black">
                JD
              </div>
              <div>
                <h4 className="font-bold">RealClanLeader1</h4>
                <p className="text-sm text-zinc-400">Premium Clan Leader</p>
              </div>
            </div>
            <p className="text-zinc-300">
              &#34;Since upgrading to Premium, we haven&#39;t lost a single war!
              The auto-win button is a game-changer, literally!&#34;
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 font-bold text-black">
                EC
              </div>
              <div>
                <h4 className="font-bold">RealClanLeader2</h4>
                <p className="text-sm text-zinc-400">Premium Clan Leader</p>
              </div>
            </div>
            <p className="text-zinc-300">
              &#34;The 2x XP multiplier has our clan leveling up so fast! Other
              clans are accusing us of cheating, but we&#39;re just
              premium!&#34;
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">
            Ready to Win at Any Cost?
          </h2>
          <p className="mb-8 text-xl text-black/80">
            Join the elite group of clan leaders who understand that winning
            isn&#39;t about skill—it&#39;s about how much you&#39;re willing to
            pay!
          </p>
          <Button className="h-auto bg-black px-8 py-6 text-lg text-white hover:bg-zinc-800">
            Upgrade to Premium Now
          </Button>
          <p className="mt-4 text-sm text-black/70">
            *April Fool&#39;s! This is just a joke. We believe in fair play and
            would never implement such features.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-bold">Clans</span>
          </div>
          <p className="text-sm text-zinc-500">
            © 2025 Clans Bot. This Premium offer is an April Fool&#39;s joke
            and not a real product.
          </p>
        </div>
      </footer>
    </div>
  );
}
