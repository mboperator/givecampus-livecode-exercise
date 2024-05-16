"use client";
import {useLeaderboard} from "@/lib/useLeaderboard";

export default function Home() {
  const { data } = useLeaderboard();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl">GiveCampus Leaderboard</h1>
      <div className="py-12 px-1 flex flex-col flex-wrap w-full">
        {data.map((item, index) => (
          <div key={index} className="m-4">
            <h2 className="text-2xl font-bold">{item.donor}</h2>
            <p>{item.donationAmount}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
