const https = require('https');

https.get('https://vercbd.org/', (res) => {
  console.log('Status:', res.statusCode);
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('HTML Length:', html.length);
    const lines = html.split('\n');
    const cssLines = lines.filter(l => l.includes('.css'));
    console.log('CSS lines count:', cssLines.length);
    cssLines.forEach(l => console.log('Line:', l.trim()));

    // Let's test diag
    https.get('https://vercbd.org/diag', (dRes) => {
      console.log('Diag Status:', dRes.statusCode);
      let diagData = '';
      dRes.on('data', c => diagData += c);
      dRes.on('end', () => {
        console.log('Diag Data:', diagData.slice(0, 500));
      });
    });

    // Test CSS directly
    const cssUrl = 'https://vercbd.org/_next/static/css/92c747ddcc6056fd.css';
    https.get(cssUrl, (cRes) => {
      console.log('Direct CSS Status:', cRes.statusCode);
      console.log('Direct CSS Content-Type:', cRes.headers['content-type']);
      let d = '';
      cRes.on('data', x => d += x);
      cRes.on('end', () => {
        console.log('Direct CSS Length:', d.length);
        console.log('Direct CSS snippet:', d.slice(0, 200));
      });
    });
  });
}).on('error', e => console.error('Error:', e.message));
