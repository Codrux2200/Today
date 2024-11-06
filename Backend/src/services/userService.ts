
interface User {
  id: string;
  name: string;
}

const users: User[] = [];

export const getUserById = async (id: string): Promise<User | null> => {
  return users.find(user => user.id === id) || null;
};

export const addUser = async (data: { name: string }): Promise<User> => {
  const newUser = { id: String(users.length + 1), ...data };
  users.push(newUser);
  return newUser;
};
    