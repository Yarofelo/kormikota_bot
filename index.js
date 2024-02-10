const TelegramApi = require('node-telegram-bot-api')

// const token'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}], [{text: '2', callback_data: '2'}], [{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}], [{text: '5', callback_data: '5'}], [{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}], [{text: '8', callback_data: '8'}], [{text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],
        ]
    })
}

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Кнопки'},
])

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
        await bot.sendMessage(chatId, `Добро пожаловать в телеграм бот КОРМИ КОТА`)
    }
    if (text === '/info') {
        await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    }
})

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот КОРМИ КОТА`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text === '/game') {
            await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен на неё нажать!');
            const randomNumber = Math.floor(Math.random()*10)
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, 'Нажимай', gameOptions);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')

    })

}

start()