// app/me/page.js
import { cookies } from "next/headers";
import axios from "axios";
import Profile from "@/components/auth/Profile";

// Server component - fetches data
const getAddresses = async () => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  if (!nextAuthSessionToken?.value) {
    return { addresses: [] };
  }

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/address`,
      {
        headers: {
          Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        },
      }
    );

    return { addresses: data };
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return { addresses: [] };
  }
};

// Server component that passes data to client component
export default async function ProfilePage() {
  const data = await getAddresses();

  // Pass the pre-fetched data to the client component
  return <Profile serverAddresses={data} />;
}
