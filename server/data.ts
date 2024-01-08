export const usersData = {
    users: [
        {
            id: "1",
            username: "sandra12",
            password: "pass123",
            refreshToken: "",
            name: "Sandra Mary"
        },
        {
            id: "2",
            username: "anna23",
            password: "pass123",
            refreshToken: "",
            name: "Anna Poline"
        },
        {
            id: "3",
            username: "david",
            password: "pass123",
            refreshToken: "",
            name: "David Beck"
        },
        {
            id: "4",
            username: "celine",
            password: "pass123",
            refreshToken: "",
            name: "Celine Leone"
        },
        {
            id: "5",
            username: "elena",
            password: "pass123",
            refreshToken: "",
            name: "Elena Torell"
        },
        {
            id: "6",
            username: "abrahm",
            password: "pass123",
            refreshToken: "",
            name: "Abrahm Mathew"
        },
        {
            id: "7",
            username: "allen",
            password: "pass123",
            refreshToken: "",
            name: "Allen Davis"
        },
        {
            id: "8",
            username: "andrew",
            password: "pass123",
            refreshToken: "",
            name: "Andrew Star"
        }
    ],
    setUsers: function (newUsersArray: typeof this.users) {
        this.users = newUsersArray;
    }
}

export const chatsData = {
    chats: [
        {
            chatId: "1",
            participants: ["1", "2"],
            groupChat: false,
            messages: [
                {
                    by: "1",
                    content: "Hello"
                },
                {
                    by: "2",
                    content: "Hi"
                }
            ]
        }
    ],
    setChats: function (newChatsData: typeof this.chats) {
        this.chats = newChatsData;
    }
}