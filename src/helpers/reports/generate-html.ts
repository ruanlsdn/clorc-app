import moment from 'moment';

export function generateHtml(body: string) {
  return `
    <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <div style="display: flex; flex-direction: column;" >
            <b style="font-size: 45px">===========================================</b>
            ${body}
            <b style="font-size: 45px">===========================================</b>
        </div>
      </body>
    </html>
  `;
}

function defaultHeader() {
  return `        
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
        <b style="font-size: 45px">===========================================</b>
        <b style="font-size: 60px">${'RC CHURRASCO'}</b>
    </div>
    `;
}

function defaultFooter() {
  const date = moment();
  return `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 50px">
        <b style="font-size: 60px">***ESTE NÃO É UM TICKET FISCAL***</b>
        <b style="font-size: 45px; text-align: center; margin-top: 50px">Ticket gerado em  ${date.toDate().toLocaleString('pt-br')}.</b>
    </div>
    `;
}
