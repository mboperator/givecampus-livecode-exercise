import {useEffect, useState} from "react";

export function useLeaderboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return { data }
}
