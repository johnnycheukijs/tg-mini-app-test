'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [hasTelegram, setHasTelegram] = useState(false);
  const [mainButtonClicked, setMainButtonClicked] = useState(false);
  
  const telegram = (window as any).Telegram;
  const app = telegram.WebApp;

  const handleClick = () => {
    setMainButtonClicked(true);
    app.sendData("Button clicked");
  }

  useEffect(() => {
    if (telegram) {
      setHasTelegram(true);
      
      app.MainButton.setText('Main Button');
      // app.MainButton.setParams({ color: "#4CAF50" });
      app.MainButton.show();
      app.MainButton.enable();
      app.MainButton.onClick(handleClick)
    }
  }, []);


  return (
    <div>
      <p>Hello</p>
      <p>{hasTelegram ? 'Has telegram' : 'Telegram undefined'}</p>
      <button type="button" onClick={handleClick}></button>
      {mainButtonClicked && <p>Main button is clicked</p>}
    </div>
  );
}
