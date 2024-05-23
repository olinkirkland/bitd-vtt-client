export type Game = {
  _id: string;
  name: string;
  coverImage: string;
  createdAt: Date;
  ownerId: string;
  playerIds: string[];
  connectedPlayerIds: string[];
};
