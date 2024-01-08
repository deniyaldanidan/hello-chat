import { accessPayloadParser, jwtParser, refreshPayloadParser } from '../libs/myParsers';
import { verify } from 'jsonwebtoken';
import { JWT_SECRETS } from '../libs/signJWT';
import { MySocketType } from '../libs/types';

export default function (socket: MySocketType, next: (err?: Error | undefined) => void) {
    const tokenParsed = jwtParser.safeParse(socket.handshake.auth?.token);

    if (!tokenParsed.success) {
        return next(new Error("UnAuthorized"));
    }

    const token = tokenParsed.data;
    // console.log(token);

    verify(token, JWT_SECRETS.ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("UnAuthorized"));
        }

        const parsePayload = accessPayloadParser.safeParse(decoded);

        if (!parsePayload.success) {
            return next(new Error("UnAuthorized"));
        }
        const { username } = parsePayload.data;

        socket.username = username;
        next();
    })
}