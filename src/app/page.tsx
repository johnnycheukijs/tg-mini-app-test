'use client'
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [hasTelegram, setHasTelegram] = useState(false);
  const [mainButtonClicked, setMainButtonClicked] = useState(false);

  const getInvoiceLink = async () => {
    const response = await fetch('http://localhost:3000/invoice', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        title: 'Subscribe AnnaSings',
        description: 'Subscribe AnnaSings',
        currency: 'USD',
        prices: [{ "label": "Subscription Fee", amount: 100000 }]
      })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return data.data.invoiceLink;
      }
      else {
        console.log('Failed to retrieve invoice link.', data.message);
        return '';
      }
    }
    else {
      console.log('Failed to retrieve invoice link.', await response.text());
      return '';
    }
  }

  useEffect(() => {
    const telegram = (window as any).Telegram;
    const app = telegram.WebApp;
    if (telegram) {
      setHasTelegram(true);

      app.MainButton.setText('Main Button');
      // app.MainButton.setParams({ color: "#4CAF50" });
      app.MainButton.show();
      app.MainButton.enable();
      app.MainButton.onClick(async () => {
        const invoiceLink = await getInvoiceLink();
        app.openInvoice(invoiceLink);
      })
      document.querySelector('#btn')?.addEventListener('click', async () => {
        // app.sendData("Button clicked");
        const invoiceLink = await getInvoiceLink();
        app.openInvoice(invoiceLink);
      })
    }
  }, []);


  return (
    <div>
      <p>Hello</p>
      <p>{hasTelegram ? 'Has telegram' : 'Telegram undefined'}</p>
      <button type="button" id="btn">Click me to send data</button>
      {mainButtonClicked && <p>Main button is clicked</p>}
    </div>
  );
}
