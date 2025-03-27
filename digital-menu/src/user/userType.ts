interface UserType {
    id: number;
    motDePasse: string;
    role: {
      id: number;
      permissions: { titleEng: string }[];
    };
  }
  