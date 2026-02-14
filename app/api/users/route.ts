import usersData from '@/data/users.json';

const users = usersData.users;
export async function GET() {
  return Response.json(users);
}