
type authedState = {
    authed: true,
    username: string,
    name: string,
    token: string
}

type unauthedState = {
    authed: false
}

type authLoadingState = {
    authed: "loading"
}

type authState = authedState | unauthedState | authLoadingState;

type emptyFn = () => void;
