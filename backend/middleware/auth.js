// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers.token;
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Authorization token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.id };
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// export default auth;

















import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export default authUser