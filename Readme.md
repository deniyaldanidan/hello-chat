# Project Hello Chat

> Test Password: pass123

## Techs used:
- React +
- Express +
- TailwindCSS, NextUI & Framer-motion +
- Socket.io +
- JWT for Auth
- Postgresql with prisma

## Basic App Functionality
- Private One to One Chat
- Group Chats with Admins to manage the group
- Authed Users

## TODOS
- [x] Setup Basic server & Client. Test socket connection
- [x] Add Tailwindcss
- [x] Add cn() function.
- [x] Design SQL-DB Schema.
- Build User-Auth with JWT
    - [x] Server-side
    - [x] Client-side
- [x] Modify table to add chat info (name & description) to `Chat` table.
- [x] Build basic UI Layout.
- [x] Connect each user to their own websocket room `with their own username as roomId`. Used for updates & notifications.
- Private Chat.
    - [ ] Build search-users functionality.
    - [ ] On clicking the user, create a private chat in the database.
    - [ ] Connect the user to that private socket-room with chatId as room name & send a notification to the other party. 
- Group Chat.

## Data-Model:
User:
    - id
    - name --> string
    - username --> string
    - email --> string
    - password --> string
    - refresh --> string

Chat:
    - id
    - isGroup --> boolean
    - admin --> user_id
    - users --> [] array of user_id

Message:
    - id
    - chat_id
    - msg --> string
    - by --> user_id
    - status --> READ DELIVERED UNDELIVERED