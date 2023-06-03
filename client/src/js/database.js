import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

async function getjateStore() {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  return store;
};

export const getDb = async () => {
  const store = await getjateStore();
  const result = await store.getAll();
  return result;
};


export const putDb = async (content) => {
  const store = await getjateStore();
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Data saved to database', result.value);
};



initdb();
