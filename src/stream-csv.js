import { parse } from 'csv-parse'
import fs from 'node:fs'

const results = [];

const csvPath = new URL('../tasks.csv', import.meta.url);

fs.createReadStream(csvPath)
  .pipe(parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2 // skip the header line
  }))
  .on('data', (row) => {
    const [title, description] = row;

    fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  })
  .on('end', () => {
    console.log('Leitura do arquivo CSV finalizada.');
  });
