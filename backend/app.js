// サーバー機能を実現する express を使う準備
const express = require('express');
const app = express();

// このサーバーは http://localhost:3000 でアクセスできるようにする
const protocol = 'http';
const host = 'localhost';
const port = 3000;
const message = 'Backend listening on '
    + `${protocol}://${host}:${port}`;

// frontendのページにこのサーバーとのデータ共有を許可する
const cors = require('cors');
app.use(cors({
    origin: ['http://127.0.0.1:5173','http://localhost:5173','http://localhost:4173'],
    optionsSuccessStatus: 200
}));

// このサーバーは json でやりとりできるようにする
app.use(express.json());

// サーバーを起動してターミナルにメッセージを出力する
app.listen(port, host, () => { console.log(message); });

// データベースの代わりにファイルを使う
const fs = require('fs').promises;
const datafile = './data.json';

/**
 * データベース代わりのファイルにデータを json 化して書き込む
 * @param data 書き込むデータオブジェクト
 */
const writeData = async (data) => {
    try {
        const datatext = JSON.stringify(data, null, 4);
        await fs.writeFile(datafile, datatext);
    } catch (error) {
        console.error(error);
    }
};

/**
 * データベース代わりのファイルを読み込みオブジェクト化して返す
 * @returns 読み込んだデータオブジェクト
 */
const readData = async () => {
    let datatext = '{}';
    try {
        datatext = await fs.readFile(datafile);
    } catch (error) {
        console.error(error);
    }
    return JSON.parse(datatext);
};

/**
 * URL          http://localhost:3000
 * Method       GET
 * Summary      動作確認用文字列を返す
 * Response     動作確認用文字列
 */
app.get('/', (req, res) => { res.send(message); });

/**
 * URL          http://localhost:3000/task
 * Method       GET
 * Summary      task を全件取得する
 * Response     taskList の json
 *              taskList が無ければ空の配列の json
 */
app.get('/task', async (req, res) => {
    const data = await readData();
    if (data.taskList && data.taskList.length > 0) {
        res.json(data.taskList);
    } else {
        res.json([]);
    }
});

/**
 * URL          http://localhost:3000/task
 * Method       POST
 * Summary      task を追加する
 * Request      id を除く task データの全項目
 * Response     id を含む新しく追加した task データの json
 */
app.post('/task', async (req, res) => {
    const data = await readData();
    const { title, limit, done } = req.body;
    let task = undefined;
    if (data.taskList && data.taskList.length > 0) {
        const id = data.taskList
            .map(t => Number(t.id))
            .reduce((a, b) => a > b ? a : b) + 1;
        task = { id, title, limit, done };
        data.taskList = [...data.taskList, task];
    } else {
        task = { id: 0, title, limit, done };
        data.taskList = [task];
    }
    await writeData(data);
    res.json(task);
});

/**
 * URL          http://localhost:3000/task/:id
 * Method       GET
 * Summary      id が一致する task を取得する
 * Response     id が一致する task の json
 *              id が一致する task　が無ければ
 *              HTTPステータスコード 404
 */
app.get('/task/:id', async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params?.id);
    let task = undefined;
    if (data.taskList && data.taskList.length > 0) {
        task = data.taskList.find(t => t.id === id);
    }
    if (task !== undefined) {
        res.json(task);
    } else {
        res.sendStatus(404);
    }
});

/**
 * URL          http://localhost:3000/task/:id
 * Method       PUT
 * Summary      id が一致する task を更新する
 * Response     更新後の task の json
 *              id が一致する task　が無ければ
 *              HTTPステータスコード 404
 */
app.put('/task/:id', async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params?.id);
    const { title, limit, done } = req.body;
    let task = undefined;
    if (data.taskList && data.taskList.length > 0) {
        const taskIndex = data.taskList
            .findIndex(t => t.id === id);
        if (taskIndex > -1) {
            task = {
                ...data.taskList[taskIndex],
                title, limit, done
            };
            data.taskList[taskIndex] = task;
        }
    }
    await writeData(data);
    if (task !== undefined) {
        res.json(task);
    } else {
        res.sendStatus(404);
    }
});

/**
 * URL          http://localhost:3000/task/:id
 * Method       DELETE
 * Summary      id が一致する task を削除する
 * Response     削除した task の json
 *              id が一致する task　が無ければ
 *              HTTPステータスコード 404
 */
app.delete('/task/:id', async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params?.id);
    let task = undefined;
    if (data.taskList && data.taskList.length > 0) {
        const taskIndex = data.taskList
            .findIndex(t => t.id === id);
        if (taskIndex > -1) {
            task = data.taskList[taskIndex];
            data.taskList.splice(taskIndex, 1);
        }
    }
    await writeData(data);
    if (task !== undefined) {
        res.json(task);
    } else {
        res.sendStatus(404);
    }
});
