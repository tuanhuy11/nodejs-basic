import pool from '../congfigs/connectDB';
import multer from 'multer';

// aysync: khai báo cho js biết đây là function bất đồng bộ
// Sử dụng await thì đầu hàm phải có aysync
let getHomePage = async(req, res) => {
    // logic 
    let data = [];
    // connection.query(
    //     'SELECT * FROM `users` ',
    //     function(err, results, fields) {
    //         results.map((row) => { 
    //             data.push({
    //                 id: row.id,
    //                 email: row.email,
    //                 address: row.address,
    //                 firstName: row.firstName,
    //                 lastName: row.lastName
    //             })
    //         });
    //         // return res.render('index.ejs', { dataUser: data, test: 'abc string test' });
    //     }
    // )
        

    const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    return res.render('index.ejs', { dataUser: rows, test: 'abc string test' })
};

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [userId])
    return res.send(JSON.stringify(user))
};

let createNewUser = async (req, res) => {
    console.log(req.body);
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',[firstName, lastName, email, address]);
    // khi thực hiện xong sẽ trở về trang ban đầu luôn và thêm vào màn hình
    return res.redirect('/');
};

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    return res.redirect('/');
};

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('Select * from users where id = ?', [id])
    return res.render('update.ejs', { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
    return res.redirect('/');
};


// Upload file

let getUploadFilePage = async (req, res) => {

    return res.render('uploadFile.ejs');
};

const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    console.log(req.file);
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/img/${req.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });

};


module.exports = { getHomePage, getDetailPage, createNewUser, 
    deleteUser, getEditPage, postUpdateUser, getUploadFilePage,
    handleUploadFile,
};
