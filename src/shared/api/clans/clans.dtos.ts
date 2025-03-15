import { AVAIABLE_FACTIONS } from "@/src/features/clans/setup-official-clan/setup-official-clan.schema";
import { z } from "zod";
import { baseDiscordUserDtoSchema } from "../users/users.dtos";
import { clanGuildDtoSchema } from "../guilds/guilds.dtos";

export const officializeClanDtoSchema = z.object({
  serverId: z.string().nonempty(),
  groupId: z.number(),
  mainFaction: z.enum(AVAIABLE_FACTIONS),
});

const unofficialClanDtoSchema = z.object({
  status: z.literal("UNOFFICIAL"),
});

const officialClanDtoSchema = z.object({
  status: z.literal("OFFICIAL"),
  mainFaction: z.union([
    z.literal("redcliff"),
    z.literal("korblox"),
    z.literal("overseer"),
    z.literal("empyrean"),
  ]),
  groupId: z.string(),
  longDescription: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  points: z.coerce.number(),
  overseers: z.array(baseDiscordUserDtoSchema),
});

export const clanDtoSchema = clanGuildDtoSchema.and(
  z.union([officialClanDtoSchema, unofficialClanDtoSchema]),
);

export const clansListDtoSchema = z.object({
  totalPages: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  results: clanDtoSchema.array(),
});

export const updateClanDescriptionsDtoSchema = z.object({
  shortDescription: z.string().max(256),
  longDescription: z.string().max(2560),
});

export const clanPermissionsDtoSchema = z.object({
  CreateInstantInvite: z.boolean().optional(),
  KickMembers: z.boolean().optional(),
  BanMembers: z.boolean().optional(),
  Administrator: z.boolean().optional(),
  ManageChannels: z.boolean().optional(),
  ManageGuild: z.boolean().optional(),
  AddReactions: z.boolean().optional(),
  ViewAuditLog: z.boolean().optional(),
  PrioritySpeaker: z.boolean().optional(),
  Stream: z.boolean().optional(),
  ViewChannel: z.boolean().optional(),
  SendMessages: z.boolean().optional(),
  SendTTSMessages: z.boolean().optional(),
  ManageMessages: z.boolean().optional(),
  EmbedLinks: z.boolean().optional(),
  AttachFiles: z.boolean().optional(),
  ReadMessageHistory: z.boolean().optional(),
  MentionEveryone: z.boolean().optional(),
  UseExternalEmojis: z.boolean().optional(),
  ViewGuildInsights: z.boolean().optional(),
  Connect: z.boolean().optional(),
  Speak: z.boolean().optional(),
  MuteMembers: z.boolean().optional(),
  DeafenMembers: z.boolean().optional(),
  MoveMembers: z.boolean().optional(),
  UseVAD: z.boolean().optional(),
  ChangeNickname: z.boolean().optional(),
  ManageNicknames: z.boolean().optional(),
  ManageRoles: z.boolean().optional(),
  ManageWebhooks: z.boolean().optional(),
  ManageEmojisAndStickers: z.boolean().optional(),
  ManageGuildExpressions: z.boolean().optional(),
  UseApplicationCommands: z.boolean().optional(),
  RequestToSpeak: z.boolean().optional(),
  ManageEvents: z.boolean().optional(),
  ManageThreads: z.boolean().optional(),
  CreatePublicThreads: z.boolean().optional(),
  CreatePrivateThreads: z.boolean().optional(),
  UseExternalStickers: z.boolean().optional(),
  SendMessagesInThreads: z.boolean().optional(),
  UseEmbeddedActivities: z.boolean().optional(),
  ModerateMembers: z.boolean().optional(),
  ViewCreatorMonetizationAnalytics: z.boolean().optional(),
  UseSoundboard: z.boolean().optional(),
  CreateGuildExpressions: z.boolean().optional(),
  CreateEvents: z.boolean().optional(),
  UseExternalSounds: z.boolean().optional(),
  SendVoiceMessages: z.boolean().optional(),
  SendPolls: z.boolean().optional(),
  UseExternalApps: z.boolean().optional(),
});

export const clanBansResultDtoSchema = z.object({
  bannedUsers: z.string().array(),
  failedUsers: z.string().array(),
});

export const clanPointsHistoryDtoSchema = z.object({
  staffUser: baseDiscordUserDtoSchema,
  reason: z.string(),
  points: z.coerce.number(),
  issueDate: z.coerce.date(),
});

export const updateClanPointsSchema = z.object({
  action: z.enum(["add", "subtract"]),
  reason: z.string().nonempty(),
  points: z.number().default(0),
});

export const clanPointsHistoryListDtoSchema = z.object({
  totalPages: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  results: clanPointsHistoryDtoSchema.array(),
});
