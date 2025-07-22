const isUserExist = (users, userEmail) => {

    const user = users.find((el) => el.email === userEmail);

    return user;

}


 module.exports = isUserExist;