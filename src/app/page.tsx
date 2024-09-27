'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasTelegram, setHasTelegram] = useState(false);

  useEffect(() => {
    const telegram = (window as any).Telegram;
    if (telegram) {
      setHasTelegram(true);
      const app = telegram.WebApp;
      app.MainButton?.setText('Main Button');
    }
  }, []);

  return (
    <div>
      <p>Hello</p>
      <p>{hasTelegram ? 'Has telegram' : 'Telegram undefined'}</p>
    </div>
  );
}
