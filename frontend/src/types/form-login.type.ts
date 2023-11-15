export type FormLoginType = {
    tokens: FormTokens,
    user:UserLoginType
}

export type FormTokens = {
    accessToken: string,
    refreshToken: string
}

export type UserLoginType = {
    id: number,
    name: string,
    lastName: string
}
