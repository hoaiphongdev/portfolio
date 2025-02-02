export interface ContactType {
  id: number;
  name: string;
  email: string;
  content: string;
  phone: string;

  createdAt: Date;
  updatedAt: Date;
}

export type ContactBodyType = Pick<
  ContactType,
  'name' | 'email' | 'content' | 'phone'
>;
