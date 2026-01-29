import usersData from '@/app/data/users.json';

const users = usersData.users;
export async function GET() {
  return Response.json(users);
}