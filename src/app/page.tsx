'use client'
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [hasTelegram, setHasTelegram] = useState(false);
  const [mainButtonClicked, setMainButtonClicked] = useState(false);

  useEffect(() => {
    const telegram = (window as any).Telegram;
    const app = telegram.WebApp;
    if (telegram) {
      setHasTelegram(true);

      app.MainButton.setText('Main Button');
      // app.MainButton.setParams({ color: "#4CAF50" });
      app.MainButton.show();
      app.MainButton.enable();
      app.MainButton.onClick(() => {
        app.sendData("Button clicked");
      })
      document.querySelector('#btn')?.addEventListener('click', () => {
        app.sendData("Button clicked");
      })
    }
  }, []);


  return (
    <div>
      <p>Hello</p>
      <p>{hasTelegram ? 'Has telegram' : 'Telegram undefined'}</p>
      <button type="button" id="btn"></button>
      {mainButtonClicked && <p>Main button is clicked</p>}
    </div>
  );
}
