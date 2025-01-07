export type Greeting = {
  message: string;
};

export type ErrorResponse = {
  data: string;
};

export type SuccessResponse<T> = {
  data: T;
};

export type Response<T> = ErrorResponse | SuccessResponse<T>;

export type Character = {
  id: number;
  name: string;
  raceID: number;
  race: Race;
  organizationID: number;
  organization: Organization;
  realmID: number;
  realm: Realm;
  skills: Skill[];
};

export type Race = {
  id: number;
  name: string;
  story: string;
  traits: string;
}

export type Organization = {
  id: number;
  name: string;
  purpose: string;
  members: Character[];
}

export type Realm = {
  id: number;
  name: string;
  description: string;
  characters: Character[];
}

export type Skill = {
  id: number;
  name: string;
  description: string;
  characters: Character[];
}
