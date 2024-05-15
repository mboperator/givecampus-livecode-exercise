import {load} from "@/lib/csv";

export default async function Home() {
  const data = await load('/data.csv');

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl">GiveCampus</h1>
      <div className="flex flex-col flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="m-4">
            <h2 className="text-2xl font-bold">{item.donor}</h2>
            <p>{item.donation_amount}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
