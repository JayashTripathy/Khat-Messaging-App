<<<<<<< HEAD
export const host = "http://localhost:5000"
=======
// export const host = `http://localhost:${process.env.PORT || 5000}`
export const host = `http://localhost:5000`
>>>>>>> 22e0ed9e839672d96cdd78be5d9e2d49e9bb7390
export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const setAvatarRoute = `${host}/api/auth/setAvatar`
export const allUserRoutes = `${host}/api/auth/allUsers`
export const addMessage = `${host}/api/message/addMsg`
export const getAllMessageRoute = `${host}/api/message/getAllMessage`