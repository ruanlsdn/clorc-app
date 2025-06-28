export function generateHtml(body: string) {
  return `
    <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <div style="display: flex; flex-direction: column;" >
            <b style="font-size: 45px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
            ${body}
        </div>
      </body>
    </html>
  `;
}

export function generateMenuHtml(body: string) {
  return `
    <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <div style="display: flex; flex-direction: column;" >
            ${body}
        </div>
      </body>
    </html>
  `;
}
