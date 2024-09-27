'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasTelegram, setHasTelegram] = useState(false);
  const [mainButtonClicked, setMainButtonClicked] = useState(false);

  useEffect(() => {
    const telegram = (window as any).Telegram;
    if (telegram) {
      setHasTelegram(true);
      const app = telegram.WebApp;
      app.MainButton.setText('Main Button');
      // app.MainButton.setParams({ color: "#4CAF50" });
      app.MainButton.show();
      app.MainButton.enable();
      app.MainButton.onClick(function() {
        app.sendData("Button clicked with some custom data.");
      })
    }
  }, []);

  return (
    <div>
      <p>Hello</p>
      <p>{hasTelegram ? 'Has telegram' : 'Telegram undefined'}</p>
      {mainButtonClicked && <p>Main button is clicked</p>}
    </div>
  );
}
