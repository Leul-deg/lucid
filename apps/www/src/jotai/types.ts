import { Team, TeamMember, User } from "@lucid/types/models";

export type TeamWithUsers = Team & {
    TeamUser: (TeamMember & {
        User: User;
    })[];
};