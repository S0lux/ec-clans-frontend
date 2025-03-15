import { cn } from "@/src/shared/lib";

const CLAN_LEVELS = [
  { level: 0, requiredExp: 1 },
  { level: 1, requiredExp: 20 },
  { level: 2, requiredExp: 50 },
  { level: 3, requiredExp: 100 },
  { level: 4, requiredExp: 175 },
  { level: 5, requiredExp: 300 },
  { level: 6, requiredExp: 450 },
  { level: 7, requiredExp: 700 },
  { level: 8, requiredExp: 1000 },
  { level: 9, requiredExp: 1500 },
  { level: 10, requiredExp: 2500 },
];

const MAX_EXP = 10000;

// Function to calculate clan level based on points
export const calculateClanLevel = (points: number) => {
  if (!points || points <= 0) return 0;

  for (let i = CLAN_LEVELS.length - 1; i >= 0; i--) {
    if (points >= CLAN_LEVELS[i].requiredExp) {
      return CLAN_LEVELS[i].level;
    }
  }

  return 0;
};

// Function to get next level required XP
export const getNextLevelExp = (currentLevel: number) => {
  if (currentLevel >= 10) return MAX_EXP;
  const nextLevelIndex =
    CLAN_LEVELS.findIndex((level) => level.level === currentLevel) + 1;
  return nextLevelIndex < CLAN_LEVELS.length
    ? CLAN_LEVELS[nextLevelIndex].requiredExp
    : MAX_EXP;
};

// Function to calculate progress to next level
export const calculateNextLevelProgress = (points: number) => {
  if (!points) return 0;

  if (points >= CLAN_LEVELS[CLAN_LEVELS.length - 1].requiredExp) {
    // Max level reached, calculate progress to max exp
    const maxLevelExp = CLAN_LEVELS[CLAN_LEVELS.length - 1].requiredExp;
    const progress = ((points - maxLevelExp) / (MAX_EXP - maxLevelExp)) * 100;
    return Math.min(Math.max(0, progress), 100);
  }

  const currentLevel = calculateClanLevel(points);
  const nextLevelIndex =
    CLAN_LEVELS.findIndex((level) => level.level === currentLevel) + 1;

  if (nextLevelIndex >= CLAN_LEVELS.length) {
    // Already at max defined level
    return 100;
  }

  const currentLevelExp = CLAN_LEVELS[nextLevelIndex - 1].requiredExp;
  const nextLevelExp = CLAN_LEVELS[nextLevelIndex].requiredExp;
  const expForNextLevel = nextLevelExp - currentLevelExp;
  const progress = ((points - currentLevelExp) / expForNextLevel) * 100;

  return Math.min(Math.max(0, progress), 100);
};

interface LevelDisplayProps {
  points: number;
  className?: string;
  mode?: "bar" | "compact";
  status?: "OFFICIAL" | "UNOFFICIAL";
  showMax?: boolean;
}

export const LevelDisplay: React.FC<LevelDisplayProps> = ({
  points,
  className,
  mode = "compact",
  status = "OFFICIAL",
  showMax = false,
}) => {
  if (status !== "OFFICIAL") {
    return (
      <div className={cn("text-sm text-foreground/50", className)}>
        Level:{" "}
        <span className="font-medium text-foreground/80">UNOFFICIAL</span>
      </div>
    );
  }

  const level = calculateClanLevel(points);
  const progress = calculateNextLevelProgress(points);
  const nextLevelExp = getNextLevelExp(level);

  if (mode === "bar") {
    return (
      <div
        className={cn("flex flex-col text-sm text-foreground/50", className)}
      >
        <span>
          Level: <span className="font-medium text-foreground/80">{level}</span>
          {" - "}
          <span className="font-medium text-foreground/80">
            {points} / {level < 10 ? nextLevelExp : MAX_EXP} EXP{" "}
          </span>
        </span>

        {/* Progress bar to next level */}
        <div className="mt-1 h-1.5 w-full max-w-xs rounded-full bg-neutral-700">
          <div
            className="h-full rounded-full bg-orange-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // Compact mode
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full bg-white/10 px-2 py-1 text-xs",
        className,
      )}
    >
      <span className="font-medium">Lvl {level}</span>
      <span className="text-white/70">•</span>
      <span className="whitespace-nowrap">
        {points.toLocaleString()}
        {" EXP"}
        {showMax && level < 10 ? `/ ${nextLevelExp}` : ""}
      </span>
    </div>
  );
};
