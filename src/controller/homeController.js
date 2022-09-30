import pool from '../congfigs/connectDB';

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
}

module.exports = { getHomePage, getDetailPage, createNewUser };
