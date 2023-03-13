interface Type {
  type: {
    name: string;
  }
}

export interface Pokemon {
  id: number;
  name: string;
  types: Type[];
  height: number;
  weight: number;
  sprites: string[];
}
